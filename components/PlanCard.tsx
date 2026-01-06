import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { CircleCheckBig } from "lucide-react";

const PlanCard = () => {
  return (
    <Card>
      <CardHeader className="font-bold text-base mb-2">
        Test
        <CardTitle className="text-xl text-blue-500">Euro 10</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <PlanItem title={"ROI"} value={"10%"} />
        <PlanItem title={"Validity"} value={"1 Days"} />
        <PlanItem title={"Maximum Return"} value={"100%"} />
      </CardContent>
      <CardFooter>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white w-full">Buy Now</Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;

const PlanItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <p className="flex items-center gap-2 font-medium">
        <CircleCheckBig className="w-6 h-6 text-green-500" />
        {title}
      </p>
      <span>{value}</span>
    </div>
  );
};
