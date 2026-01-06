import { TransactionCard } from "@/components/TransactionCard";
import { TransactionItem } from "@/components/TransactionItem";
import WalletCard from "@/components/WalletCard";
import { depositData, financialSummary, withdrawalData } from "@/data";
import Image from "next/image";

const UserDashboard = () => {
  return (
    <div className="w-full min-h-screen p-4 mx-auto space-y-4">
      {/* summary card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {financialSummary.map((item, idx) => (
          <WalletCard
            key={idx}
            title={item.title}
            amount={item.amount}
            currency={item.currency}
            icon={item.icon}
            iconColorCss={item.iconColorCss}
          />
        ))}
      </div>

      {/* item card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TransactionCard title="Team Overview">
          <div className="relative flex items-center justify-between p-4 bg-card/50 hover:scale-101 transition-all duration-200 border rounded-md gap-4">
            <div className="text-base space-y-1">
              <span className="text-xl leading-snug">7</span>
              <p className="text-foreground/80">Refferal</p>
            </div>
            <div className="absolute -bottom-3 right-4">
              <Image
                src="/teamwork.webp"
                height={70}
                width={100}
                alt="img"
                className="size-"
              />
            </div>
          </div>
          <div className="relative flex items-center justify-between p-4 bg-card/50 hover:scale-101 transition-all duration-200 border rounded-md gap-4">
            <div className="text-base space-y-1">
              <span className="text-xl leading-snug">7</span>
              <p className="text-foreground/80">Refferal</p>
            </div>
            <div className="absolute -bottom-3 right-4">
              <Image
                src="/teamwork.webp"
                height={70}
                width={100}
                alt="img"
                className="size-"
              />
            </div>
          </div>
        </TransactionCard>

        <TransactionCard title="Withdrawal Summary" link="#">
          {withdrawalData.map((item, index) => (
            <TransactionItem
              key={`withdrawal-${item.id ?? index}`}
              amount={item.amount}
              title={item.title}
              status={item.status}
              cssIcon={item.cssIcon}
              icon={item.icon}
            />
          ))}
        </TransactionCard>

        <TransactionCard title="Deposite Summary" link="#">
          {depositData.map((item, index) => (
            <TransactionItem
              key={`deposit-${item.id ?? index}`}
              amount={item.amount}
              title={item.title}
              status={item.status}
              cssIcon={item.cssIcon}
              icon={item.icon}
            />
          ))}
        </TransactionCard>
      </div>
    </div>
  );
};

export default UserDashboard;
