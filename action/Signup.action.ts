"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { signupSchema } from "@/lib/schemas";
import { z } from "zod";

export type ActionResponse = {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
};

export async function createUserWithReferral(
  data: z.infer<typeof signupSchema>
): Promise<ActionResponse> {
  // 1. Validate Input
  const validatedFields = signupSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors.name?.[0] || "Invalid input",
    };
  }

  const { name, username, email, password, referralCode } = validatedFields.data;
  const MAX_DEPTH = 10;

  try {
    // --- STEP 1: Perform Reads OUTSIDE the transaction (Optimizes speed) ---
    
    // Check for existing user
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
      select: { email: true, username: true },
    });

    if (existingUser) {
      if (existingUser.email === email) return { success: false, error: "EMAIL_EXISTS" };
      if (existingUser.username === username) return { success: false, error: "USERNAME_EXISTS" };
    }

    // Find referrer
    let referrerId: string | null = null;
    if (referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode: referralCode },
        select: { id: true },
      });
      if (!referrer) return { success: false, error: "INVALID_REFERRAL_CODE" };
      referrerId = referrer.id;
    } else if (process.env.DEFAULT_REFERRER_ID) {
      referrerId = process.env.DEFAULT_REFERRER_ID;
    }

    // --- STEP 2: Start Transaction with Increased Timeout ---
    return await prisma.$transaction(async (tx) => {
      // Create User (Better Auth)
      // Note: If auth.api doesn't support passing 'tx', this runs independently.
      // If it fails, the transaction aborts automatically.
      const user = await auth.api.createUser({
        body: {
          name,
          email,
          password, // Better Auth hashes this automatically
          role: "user",
          data: {
            referredById: referrerId,
            username: username || "",
          },
        },
      });

      if (!user?.user?.id) {
        throw new Error("Failed to create user record");
      }

      const userId = user.user.id;

      // Create Closure - Self Link
      await tx.userClosure.create({
        data: {
          ancestorId: userId,
          descendantId: userId,
          depth: 0,
        },
      });

      // Create Closure - Inherit Ancestors
      if (referrerId) {
        // We can use 'tx' here safely
        const ancestors = await tx.userClosure.findMany({
          where: { descendantId: referrerId },
        });

        if (ancestors.length > 0) {
          const newRelations = ancestors
            .filter((a) => a.depth + 1 < MAX_DEPTH)
            .map((a) => ({
              ancestorId: a.ancestorId,
              descendantId: userId,
              depth: a.depth + 1,
            }));

          if (newRelations.length > 0) {
            await tx.userClosure.createMany({
              data: newRelations,
            });
          }
        }
      }

      return { success: true, data: user };
    }, 
    // --- CONFIG: Increase Timeout ---
    {
      maxWait: 5000, // Time to wait to start the transaction
      timeout: 20000 // Time allowed for the transaction to run (increased to 20s)
    });

  } catch (error: any) {
    console.error("Signup Error:", error);

    // Map errors to friendly messages
    if (error === "EMAIL_EXISTS" || error.message === "EMAIL_EXISTS") {
      return { success: false, error: "This email address is already registered." };
    }
    if (error === "USERNAME_EXISTS" || error.message === "USERNAME_EXISTS") {
      return { success: false, error: "This username is already taken." };
    }
    if (error === "INVALID_REFERRAL_CODE" || error.message === "INVALID_REFERRAL_CODE") {
      return { success: false, error: "The Referral Code provided is invalid." };
    }

    return {
      success: false,
      error: error?.message || "Something went wrong. Please try again.",
    };
  }
}