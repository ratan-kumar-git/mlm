"use client";
import { Button } from "@/components/ui/button";
import { PlanProp, PlanSettingProp, ReferralSettingProp } from "@/type/Plan";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import DataTable from "@/components/DataTable";
import PlanSettingCard from "@/components/PlanSettingCard";
import Input2Comp from "@/components/ui/Input2Comp";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ClientPlanProp {
  planData: PlanProp[];
  planSetting: PlanSettingProp;
  referralSetting: ReferralSettingProp[];
}

// colums defination for header of table
const columns: ColumnDef<PlanProp>[] = [
  { accessorKey: "", header: "#", maxSize: 5 },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "price", header: "Price" },
  { accessorKey: "roi", header: "Daily ROI" },
  { accessorKey: "maximumReturn", header: "Maximum Return" },
  { accessorKey: "validity", header: "Validity" },
  { accessorKey: "active", header: "Status" },
  { accessorKey: "createdAt", header: "Create At" },
  { accessorKey: "id", header: "Action" },
];

const ClientPlan = ({
  planData,
  planSetting,
  referralSetting,
}: ClientPlanProp) => {
  const [isEditEnablePlanSetting, setIsEditEnablePlanSetting] =
    useState<boolean>(false);
  const [isEditEnableReferral, setIsEditEnableReferral] =
    useState<boolean>(false);

  const [planSettingData, setPlanSettingData] = useState<PlanSettingProp>({
    ...planSetting,
  });
  const [referralSettingData, setReferralSettingData] =
    useState<ReferralSettingProp[]>(referralSetting);
  const [selectedDays, setSelectedDays] = useState<string[]>(
    planSetting.roiIncomeDay || [],
  );

  const DAYS_ORDER = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // toggle plan edit
  const togglePlanEdit = () => {
    if (isEditEnablePlanSetting) {
      setPlanSettingData({ ...planSetting });
      setSelectedDays(planSetting.roiIncomeDay || []);
    }
    setIsEditEnablePlanSetting(!isEditEnablePlanSetting);
  };

  // toggle referral edit
  const toggleReferralEdit = () => {
    if (isEditEnableReferral) {
      setReferralSettingData(referralSetting);
    }
    setIsEditEnableReferral(!isEditEnableReferral);
  };

  // toggle day
  const toggleDay = (day: string) => {
    setSelectedDays((prev) => {
      const newDay = prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day];
      return newDay.sort(
        (a, b) => DAYS_ORDER.indexOf(a) - DAYS_ORDER.indexOf(b),
      );
    });
  };

  const handleReferralChange = (id: number, newValue: number) => {
    setReferralSettingData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, percentage: newValue } : item,
      ),
    );
  };

  const handlePlanSettingFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPayload = {
      ...planSettingData,
      roiIncomeDay: selectedDays,
    };
    console.log("Submitting Plan Settings:", finalPayload);
    // TODO: make api call
  };

  const handleReferralSettingFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Referral Settings:", referralSettingData);
    // TODO: make api call
  };

  return (
    <>
      <div className="w-full min-h-screen p-4 mx-auto space-y-6">
        {/* head */}
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-base font-bold">Plans</h1>
          <Link href="/admin/plans/create">
            <Button className="bg-sky-500 hover:bg-sky-500/80 text-white">
              <Plus className="h-4 w-4" /> New Plan
            </Button>
          </Link>
        </div>

        {/* plan table */}
        <DataTable columns={columns} data={planData || []} />

        {/* plan setting card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {/* planSetting Card */}
          <PlanSettingCard
            heading="Plan Setting"
            isEditEnable={isEditEnablePlanSetting}
            onClick={togglePlanEdit}
            handleFormSubmit={handlePlanSettingFormSubmit}
          >
            <Input2Comp
              key="max-active-plan"
              lable="Maximum Active Plan"
              lablefor="maximumActivePlan"
              type="text"
              disabled={isEditEnablePlanSetting}
              value={planSettingData.maxActivePlanLimit}
              onChange={(e) =>
                setPlanSettingData((prev) => ({
                  ...prev,
                  maxActivePlanLimit: Number(e.target.value),
                }))
              }
            />
            <Input2Comp
              key="referral-depth"
              lable="Referral Depth Level"
              lablefor="referralDepthLevel"
              type="text"
              disabled={isEditEnablePlanSetting}
              value={planSettingData.referralDepthLevel}
              subValue={"Level"}
              onChange={(e) =>
                setPlanSettingData((prev) => ({
                  ...prev,
                  referralDepthLevel: Number(e.target.value),
                }))
              }
            />
            <Input2Comp
              key="first-roi"
              lable="1st ROI Income"
              lablefor="firstRoiIncome"
              type="text"
              disabled={isEditEnablePlanSetting}
              value={planSettingData.firstRoiIncome}
              subValue={"Hours"}
              onChange={(e) =>
                setPlanSettingData((prev) => ({
                  ...prev,
                  firstRoiIncome: Number(e.target.value),
                }))
              }
            />
            {/* select days */}
            <div className="space-y-1">
              <h3 className="text-accent-foreground/60 text-sm">
                ROI Income Day
              </h3>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="w-full outline-none disabled:cursor-not-allowed disabled:text-muted-foreground rounded-md focus:border-blue-600 focus:ring-1 focus:ring-blue-600  transition-all"
                  disabled={!isEditEnablePlanSetting}
                >
                  <div className="w-auto flex flex-wrap items-center gap-2 p-2 border rounded-md">
                    {selectedDays.map((item, index) => (
                      <div
                        key={index}
                        className="border rounded-md text-sm tracking-wider text-foreground/60 p-1 bg-accent"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {DAYS_ORDER.map((item) => (
                    <DropdownMenuCheckboxItem
                      key={item}
                      checked={selectedDays.includes(item)}
                      onCheckedChange={() => toggleDay(item)}
                      onSelect={(e) => e.preventDefault()}
                    >
                      {item}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </PlanSettingCard>

          {/* referralLevelSetting card */}
          <PlanSettingCard
            heading="Referral Income Settings"
            isEditEnable={isEditEnableReferral}
            onClick={toggleReferralEdit}
            handleFormSubmit={handleReferralSettingFormSubmit}
          >
            {referralSettingData.map((item) => {
              return (
                <Input2Comp
                  type="text"
                  value={item.percentage}
                  key={item.id}
                  lable={`Level ${item.level + 1}`}
                  disabled={isEditEnableReferral}
                  lablefor={`Level ${item.level + 1}`}
                  onChange={(e) =>
                    handleReferralChange(item.id, Number(e.target.value))
                  }
                  subValue="%"
                />
              );
            })}
          </PlanSettingCard>
        </div>
      </div>
    </>
  );
};

export default ClientPlan;
