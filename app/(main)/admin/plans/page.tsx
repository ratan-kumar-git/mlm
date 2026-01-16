"use client";
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { columns, Payment } from "./columns";
import PlanSettingCard from "@/components/PlanSettingCard";
import Input2Comp from "@/components/ui/Input2Comp";
import { PLAN_SETTING, REFERRAl_INCOME_SETTING } from "@/data";

function getData(): Payment[] {
  return [
    {
      id: 1,
      name: "Test",
      priceCurrency: "EURO",
      price: 9,
      profitPercent: 10,
      maxReturnPercent: 100,
      durationDays: 1,
      status: "Active",
      createdAt: "2025-11-21T17:41:10",
    },
    {
      id: 2,
      name: "VIP",
      priceCurrency: "EURO",
      price: 100,
      profitPercent: 12,
      maxReturnPercent: 50,
      durationDays: 2,
      status: "Active",
      createdAt: "2025-11-22T17:14:37",
    },
    {
      id: 3,
      name: "Basic",
      priceCurrency: "EURO",
      price: 100,
      profitPercent: 10,
      maxReturnPercent: 200,
      durationDays: 99,
      status: "Active",
      createdAt: "2025-11-27T12:30:54",
    },
    {
      id: 4,
      name: "Standard",
      priceCurrency: "EURO",
      price: 300,
      profitPercent: 10,
      maxReturnPercent: 300,
      durationDays: 99,
      status: "Active",
      createdAt: "2025-11-27T12:31:25",
    },
    {
      id: 5,
      name: "Premium",
      priceCurrency: "EURO",
      price: 500,
      profitPercent: 13,
      maxReturnPercent: 400,
      durationDays: 199,
      status: "Active",
      createdAt: "2025-11-27T12:31:53",
    },
    {
      id: 6,
      name: "Silver",
      priceCurrency: "EURO",
      price: 1000,
      profitPercent: 20,
      maxReturnPercent: 400,
      durationDays: 200,
      status: "Active",
      createdAt: "2025-11-27T12:32:18",
    },
  ];
}

export default function Page() {
  const [isEditEnablePlan, setIsEditEnablePlan] = useState(false);
  const [isEditEnableReferral, setIsEditEnableReferral] = useState(false);
  const [planSettingData, setPlanSettingData] = useState({
    maxActivePlan: "100",
    referralIncome: "10",
    firstROI: "1",
  });
  const data = getData();
  return (
    <>
      <div className="w-full min-h-screen p-4 mx-auto space-y-6">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-base font-bold">Plans</h1>
          <Button className="bg-sky-500 hover:bg-sky-500/80 text-white">
            <Plus className="h-4 w-4" /> New Plan
          </Button>
        </div>
        <DataTable columns={columns} data={data} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PlanSettingCard
            heading="Plan Setting"
            isEditEnable={isEditEnablePlan}
            onClick={() => setIsEditEnablePlan(!isEditEnablePlan)}
          >
            {PLAN_SETTING.map((item) => {
              return (
                <Input2Comp
                  key={item.id}
                  lable={item.label}
                  lablefor={item.labelFor}
                  type="text"
                  disabled={isEditEnablePlan}
                  value={item.value}
                  subValue={item.subValue}
                  onChange={(e) => (item.value = e.target.value)}
                />
              );
            })}
          </PlanSettingCard>
          <PlanSettingCard
            heading="Referral Income Settings"
            isEditEnable={isEditEnableReferral}
            onClick={() => setIsEditEnableReferral(!isEditEnableReferral)}
          >
            {REFERRAl_INCOME_SETTING.map((item) => {
              return (
                <Input2Comp
                  type="text"
                  value={item.value}
                  key={item.id}
                  lable={item.label}
                  disabled={isEditEnableReferral}
                  lablefor={item.labelFor}
                  onChange={(e) => (item.value = e.target.value)}
                  subValue={item.subValue}
                />
              );
            })}
          </PlanSettingCard>
        </div>
      </div>
    </>
  );
}
