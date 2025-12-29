"use client";

import * as React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputCompoProps {
  label: string;
  labelFor: string;
  icon?: LucideIcon;
  type: "email" | "text" | "number";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export default function InputCompo({
  label,
  labelFor,
  icon: Icon,
  type,
  value,
  onChange,
  placeholder,
}: InputCompoProps) {
  return (
    <div className="space-y-1">
      {/* Label */}
      <Label
        htmlFor={labelFor}
        className="tracking-wider text-foreground/90"
      >
        {label}
      </Label>

      {/* Input wrapper */}
      <div className="relative">
        {/* Left icon */}
        {Icon && (
          <Icon
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.75}
          />
        )}

        {/* Input */}
        <Input
          id={labelFor}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            Icon && "pl-9",
          )}
        />
      </div>
    </div>
  );
}
