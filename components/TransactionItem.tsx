import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface TransactionItemProps {
  icon: LucideIcon;
  cssIcon: string;
  title: string;
  amount: number;
  status: string;
}

export const TransactionItem = ({icon, amount, title, status, cssIcon } : TransactionItemProps) => {
  const Icon = icon;
  return (
    <>
        <div className="flex items-center p-4 bg-card/50 hover:scale-101 transition-all duration-200 border rounded-md gap-4">
          <div className="flex items-center justify-center">
            <Icon className={cn("h-7 w-7 text-orange-400", cssIcon)} />
          </div>
          <div className="space-y-1 leading-snug tracking-wider">
            <h1 className="font-semibold text-sm">{`${title} ${amount}`}</h1>
            <p className="text-xs text-foreground/60">{status}</p>
          </div>
        </div>
    </>
  );
}
