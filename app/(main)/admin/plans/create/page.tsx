"use client";
import { Button } from "@/components/ui/button";
import Input2Comp from "@/components/ui/Input2Comp";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
interface FormData {
  name: string;
  price: number;
  roi: number;
  maximumReturn: number;
  validity: number;
  active: boolean;
  idxOrder?: number;
}

export default function CreatePlan() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: 0,
    roi: 0,
    maximumReturn: 0,
    validity: 0,
    active: true,
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("data: ", formData);
  }
  return (
    <div className="w-full min-h-screen p-4 mx-auto space-y-6">
      <div className="max-w-2xl mx-auto bg-card p-4 rounded-md space-y-4">
        <h1 className="text-base font-bold tracking-wider">Plan</h1>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="airplane-mode">Active </Label>
          <Switch id="active" checked={formData.active} onCheckedChange={() => setFormData((prev) => ({ ...prev, active: !formData.active }))} />
        </div>
        <form className="space-y-4" onSubmit={handleFormSubmit}>
        <Input2Comp
          disabled
          lable="Name"
          lablefor="name"
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          key={"name"}
        />
        <Input2Comp
          disabled
          lable="Price"
          lablefor="price"
          type="text"
          preValue="EURO"
          value={formData.price}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))
          }
          key={"price"}
        />
        <Input2Comp
          disabled
          lable="ROI"
          lablefor="roi"
          type="text"
          value={formData.roi}
          subValue={"%"}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, roi: Number(e.target.value) }))
          }
          key={"roi"}
        />
        <Input2Comp
          disabled
          lable="Maximum Return"
          lablefor="maximumReturn"
          type="text"
          value={formData.maximumReturn}
          subValue={"%"}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              maximumReturn: Number(e.target.value),
            }))
          }
          key={"maximumReturn"}
        />
        <Input2Comp
          disabled
          lable="Validity"
          lablefor="validity"
          type="text"
          value={formData.validity}
          subValue={"Days"}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              validity: Number(e.target.value),
            }))
          }
          key={"validity"}
        />
        <Button type="submit" className="bg-sky-500 hover:bg-sky-600 w-full">
          Submit
        </Button>
        </form>
      </div>
    </div>
  );
}
