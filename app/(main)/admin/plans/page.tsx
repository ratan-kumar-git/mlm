import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import ClientPlan from "./ClientPlan";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session?.user.role === "user") {
    return "unauthries";
  }
  const planData = await prisma.plan.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const settings = await prisma.planSetting.findFirst();

  const planSetting = settings
    ? {
        ...settings,
        roiIncomeDay: settings.roiIncomeDay
          ? settings.roiIncomeDay.split(",")
          : [],
      }
    : {
        id: 0,
        maxActivePlanLimit: 100,
        referralDepthLevel: 10,
        firstRoiIncome: 1,
        roiIncomeDay: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

  const referralSetting = await prisma.referralSetting.findMany();

  return (
    <ClientPlan
      planData={planData}
      planSetting={planSetting}
      referralSetting={referralSetting}
    />
  );
}
