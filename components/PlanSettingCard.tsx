import { Edit2, X } from "lucide-react";
import { Button } from "./ui/button";
import { MouseEventHandler, ReactNode } from "react";
interface PlanSettingCardProp {
  children: ReactNode;
  heading: string;
  isEditEnable: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
export default function PlanSettingCard({
  children,
  heading,
  isEditEnable,
  onClick,
}: PlanSettingCardProp) {
  return (
    <div className="p-4 bg-card border rounded-md w-full space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold text-lg tracking-tight">{heading}</h3>
        <Button
          size="icon"
          className="h-8 w-8 bg-blue-500/30 text-blue-600 hover:bg-blue-600/30"
          onClick={onClick}
        >
          {isEditEnable ? <X size={16} /> : <Edit2 size={16} />}
        </Button>
      </div>
      {children}
      {isEditEnable && (
        <div className="flex items-center gap-2 justify-end">
          <Button variant={"outline"} onClick={onClick}>
            Cancel
          </Button>
          <Button className="bg-sky-500 hover:bg-sky-500/80 text-white">
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}
