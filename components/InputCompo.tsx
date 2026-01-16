import * as React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputCompoProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  labelFor?: string;
}

const InputCompo = React.forwardRef<HTMLInputElement, InputCompoProps>(
  ({ className, type, label, labelFor, icon: Icon, id, ...props }, ref) => {
    const inputId = id || labelFor;

    return (
      <div className="space-y-1">
        <Label htmlFor={inputId} className="tracking-wider text-foreground/90">
          {label}
        </Label>

        <div className="relative">
          {Icon && (
            <Icon
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              strokeWidth={1.75}
            />
          )}

          <Input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(Icon && "pl-9", className)}
            {...props}
          />
        </div>
      </div>
    );
  }
);

InputCompo.displayName = "InputCompo";

export default InputCompo;
