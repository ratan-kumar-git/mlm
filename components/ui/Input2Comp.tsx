import { cn } from "@/lib/utils";
import React, { ChangeEventHandler } from "react";

interface Input2Compprop {
  lable: string;
  lablefor: string;
  type: "text" | "email";
  preValue?: string;
  value: string | number;
  subValue?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export default function Input2Comp({
  lable,
  lablefor,
  type,
  disabled,
  preValue,
  value,
  subValue,
  onChange,
}: Input2Compprop) {
  return (
    <>
      <div className="relative">
        {/* input */}
        <input
          id={lablefor}
          type={type}
          disabled={!disabled}
          value={value}
          onChange={onChange}
          placeholder=" "
          className={cn(
            "peer h-12 w-full rounded-md border px-3 pt-3.5 text-base outline-none transition-all",
            "disabled:cursor-not-allowed disabled:text-muted-foreground",
            "focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20",
            "placeholder:text-transparent",
            preValue && "pl-16",
          )}
        />

        {/* Main input label */}
        <label
          htmlFor={lablefor}
          className={cn(
            "absolute left-3 top-1 z-10 text-xs text-muted-foreground transition-all duration-200",
            "peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground/70",
            "peer-focus:top-1 peer-focus:text-xs",
          )}
        >
          {lable}
        </label>

        {/* first/pre input lable */}
        {preValue && (
          <span
            className={cn(
              "absolute text-base tracking-wide left-3 top-3 pt-2 text-muted-foreground",
              !disabled && "text-muted-foreground/70",
            )}
          >
            {preValue}
          </span>
        )}

        {/* last input labal */}
        {subValue && (
          <span
            className={cn(
              "absolute text-base tracking-wide right-3 top-3 text-muted-foreground",
              !disabled && "text-muted-foreground/70",
            )}
          >
            {subValue}
          </span>
        )}
      </div>
    </>
  );
}
