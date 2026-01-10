'use client';
import { TransactionCard } from "@/components/TransactionCard";
import { TransactionItem } from "@/components/TransactionItem";
import WalletCard from "@/components/WalletCard";
import { depositData, financialSummary, withdrawalData } from "@/data";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UserDashboard = () => {
  const router = useRouter();
  const { data: session, isPending, error } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    } else if (!isPending && session?.user.role === "admin") {
      router.push("/admin/dashboard");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p>Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-red-500">
        Error loading session: {error.message}
      </div>
    );
  }

  if ( !session || session?.user.role === "admin") return null;
  return (
    <div className="w-full min-h-screen p-4 mx-auto space-y-4">
      <div className="w-full p-4 mx-auto space-y-4">
        <div className="flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-bold">User Dashboard</h1>
          <div className="text-sm text-right">
            <p className="font-medium">{session.user.name}</p>
            <p className="text-muted-foreground">{session.user.email}</p>
            <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
              {session.user.role}
            </span>
          </div>
        </div>
      </div>

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
