import { Edit2, X } from "lucide-react";
import { Button } from "./ui/button";
import { FormEventHandler, MouseEventHandler, ReactNode } from "react";
interface PlanSettingCardProp {
  children: ReactNode;
  heading: string;
  isEditEnable: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
}
export default function PlanSettingCard({
  children,
  heading,
  isEditEnable,
  onClick,
  handleFormSubmit,
}: PlanSettingCardProp) {
  return (
    <div className="p-4 bg-card border rounded-md w-full space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold text-lg tracking-tight">{heading}</h3>
        <Button
          size="icon"
          type="button"
          className="h-8 w-8 bg-blue-500/30 text-blue-600 hover:bg-blue-600/30"
          onClick={onClick}
        >
          {isEditEnable ? <X size={16} /> : <Edit2 size={16} />}
        </Button>
      </div>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {children}

        {isEditEnable && (
          <div className="flex items-center gap-2 justify-end">
            <Button type="button" variant={"outline"} onClick={onClick}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-sky-500 hover:bg-sky-500/80 text-white"
            >
              Submit
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
