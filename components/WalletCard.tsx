import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface WalletCardProp {
  title: string;
  currency: string;
  amount: number;
  icon: LucideIcon;
  iconColorCss: string
}

const WalletCard = ({ title, currency, amount, icon, iconColorCss }: WalletCardProp) => {
  const Icon = icon;
  return (
    <>
      <div className="flex items-center justify-between p-4 bg-card border rounded-md">
        <div className="space-y-1">
          <p className="text-base text-foreground/70">{title}</p>
          <p className="text-lg leading-tight font-semibold">{`${currency} ${amount}`}</p>
        </div>
        <div className="bg-accent p-3 rounded-full">
          <Icon className={cn("size-5", iconColorCss)} />
        </div>
      </div>
    </>
  );
};

export default WalletCard;
