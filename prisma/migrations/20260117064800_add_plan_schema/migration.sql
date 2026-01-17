-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "roi" DOUBLE PRECISION NOT NULL,
    "maximumReturn" DOUBLE PRECISION NOT NULL,
    "validity" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "idxOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanSetting" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "maxActivePlanLimit" INTEGER NOT NULL DEFAULT 100,
    "referralDepthLevel" INTEGER NOT NULL DEFAULT 10,
    "firstRoiIncome" INTEGER NOT NULL DEFAULT 1,
    "roiIncomeDay" TEXT NOT NULL DEFAULT 'Mon,Tue,Wed,Thu,Fri,Sat,Sun',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralSetting" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReferralSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReferralSetting_level_key" ON "ReferralSetting"("level");
