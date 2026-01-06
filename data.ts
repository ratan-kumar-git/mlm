import {
  ArrowDownRight,
  ArrowUpRight,
  TrendingUp,
  Wallet,
  ArrowDownLeft,
  Clock,
  TrendingDown,
} from "lucide-react";

export const financialSummary = [
  {
    title: "Available Balance",
    currency: "EURO",
    amount: 15964.64,
    icon: Wallet,
    iconColorCss: "text-blue-700",
  },
  {
    title: "Total Withdrawal",
    currency: "EURO",
    amount: 684892.76,
    icon: ArrowUpRight,
    iconColorCss: "text-red-700",
  },
  {
    title: "Total Deposit",
    currency: "EURO",
    amount: 682541.7,
    icon: ArrowDownRight,
    iconColorCss: "text-green-700",
  },
  {
    title: "Total Income",
    currency: "EURO",
    amount: 9548.7,
    icon: TrendingUp,
    iconColorCss: "text-yellow-700",
  },
];

export const withdrawalData = [
  {
    id: 231,
    title: "EURO",
    amount: 2034.07,
    status: "Pending",
    cssIcon: "text-yellow-500",
    icon: Clock,
  },
  {
    id: 232,
    title: "EURO",
    amount: 680527.29,
    status: "Admin",
    cssIcon: "text-red-500",
    icon: TrendingDown,
  },
  {
    id: 233,
    title: "EURO",
    amount: 1700,
    status: "Payout",
    cssIcon: "text-red-500",
    icon: TrendingDown,
  },
  {
    id: 234,
    title: "EURO",
    amount: 2531,
    status: "Pending",
    cssIcon: "text-green-500",
    icon: TrendingUp,
  },
];

export const depositData = [
  {
    id: 220,
    title: "EURO",
    amount: 2852.6,
    status: "Received",
    cssIcon: "text-green-500",
    icon: Wallet,
  },
  {
    id: 222,
    title: "EURO",
    amount: 679057.1,
    status: "Admin",
    cssIcon: "text-blue-500",
    icon: ArrowDownLeft,
  },
  {
    id: 223,
    title: "EURO",
    amount: 682129.7,
    status: "Total",
    cssIcon: "text-blue-500",
    icon: ArrowDownLeft,
  },
  {
    id: 224,
    title: "EURO",
    amount: 0,
    status: "—",
    cssIcon: "text-green-500",
    icon: TrendingUp,
  },
];
