import * as React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// 1. Extend standard HTML input props to inherit all native functionality
interface InputCompoProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  // We can make labelFor optional and fallback to the 'id'
  labelFor?: string; 
}

// 2. Use forwardRef to allow parent components (like React Hook Form) to control the input
const InputCompo = React.forwardRef<HTMLInputElement, InputCompoProps>(
  ({ className, type, label, labelFor, icon: Icon, id, ...props }, ref) => {
    // Ensure we have an ID for accessibility (use passed id, labelFor, or fallback)
    const inputId = id || labelFor;

    return (
      <div className="space-y-1">
        {/* Label */}
        <Label
          htmlFor={inputId}
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
            id={inputId}
            type={type}
            ref={ref} // 3. Forward the ref here
            className={cn(
              // Add padding if icon exists
              Icon && "pl-9",
              className
            )}
            // 4. Spread all other props (onChange, onBlur, name, value, etc.)
            {...props}
          />
        </div>
      </div>
    );
  }
);

// Required for debugging in React DevTools
InputCompo.displayName = "InputCompo";

export default InputCompo;