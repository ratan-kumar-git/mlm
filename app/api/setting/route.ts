import { apiResponseError, apiResponseSuccess } from "@/lib/api-response";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user.id) {
      return apiResponseError("Unauthorized", 401);
    }

    const planSetting = await prisma.planSetting.findFirst({
      where: {
        id: 1,
      },
    });

    const referralSetting = await prisma.referralSetting.findMany();

    return apiResponseSuccess({ planSetting, referralSetting });
  } catch (error) {
    console.log("Error in setting", error);
    return apiResponseError("Internal Server Error", 500);
  }
}
