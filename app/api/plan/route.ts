import { apiResponseError, apiResponseSuccess } from "@/lib/api-response";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return apiResponseError("Unauthorized", 401);
    }
    const plans = await prisma.plan.findMany();

    return apiResponseSuccess(plans);
  } catch (error) {
    console.log("Error in Plan", error);
    return apiResponseError("Internal Server Error", 500);
  }
}
