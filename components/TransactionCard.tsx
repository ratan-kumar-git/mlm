import { ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";

interface TransactionCardProps {
  icon?: LucideIcon;
  title: string;
  link?: string;
  children: React.ReactNode;
}

export const TransactionCard = ({
  icon,
  title,
  link,
  children,
}: TransactionCardProps) => {
  const Icon = icon;
  return (
    <>
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <div className="text-base font-medium flex justify-between items-center">
          <div className="flex items-center gap-2">
            {Icon && (<Icon className="h-4 w-4" />)}
            {title}
          </div>
          {link && (
            <Link
              href={link}
              className="text-blue-500 text-sm flex items-center justify-between gap-2"
            >
              <span className="hover:underline">View details</span>{" "}
              <ArrowRight className="inline-block h-4 w-4" />
            </Link>
          )}
        </div>
        {children}
      </div>
    </>
  );
};
