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
    } else {
      return { success: false, error: "INVALID_REFERRAL_CODE" };
    }

    return await prisma.$transaction(async (tx) => {
      const user = await auth.api.createUser({
        body: {
          name,
          email,
          password,
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
    {
      maxWait: 5000, 
      timeout: 20000
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