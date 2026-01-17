"use client";
import Input2Comp from "@/components/ui/Input2Comp";
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
  return (
    <div className="w-full min-h-screen p-4 mx-auto space-y-6">
      <div className="max-w-2xl mx-auto bg-card p-4 rounded-md space-y-4">
        <div className="">
          Plan
        </div>
        <Input2Comp
          disabled
          lable="Name"
          lablefor="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({...prev, name: e.target.value }))}
          key={"name"}
        />
        <Input2Comp
          disabled
          lable="Price"
          lablefor="price"
          type="text"
          value={formData.price}
          onChange={(e) => setFormData((prev) => ({...prev, price: Number(e.target.value) }))}
          key={"name"}
        />
      </div>
    </div>
  );
}
