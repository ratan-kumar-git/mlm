import PlanCard from "@/components/PlanCard";

const plan = () => {
  return (
    <>
      <div className="w-full min-h-screen p-4 mx-auto space-y-6">
        <h1 className="text-base font-bold">Plans</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <PlanCard />
          <PlanCard />
          <PlanCard />
          <PlanCard />
          <PlanCard />
          <PlanCard />
        </div>
      </div>
    </>
  );
};

export default plan;
