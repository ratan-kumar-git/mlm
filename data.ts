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

export const PLAN_SETTING = [
  {
    id: 0,
    label: "Maximum Active Plan",
    labelFor: "Maximum Active Plan",
    value: "100"
  },
  {
    id: 1,
    label: "Referral Income",
    labelFor: "referral_Income",
    value: "10",
    subValue: "Level"
  },
  {
    id: 2,
    label: "1st ROI Income",
    labelFor: "roi_Income",
    value: "1",
    subValue: "Hours"
  }
]

export const REFERRAl_INCOME_SETTING = [
  {
    id: 0,
    label: "Level 1",
    labelFor: "level1",
    value: "50",
    subValue: "%"
  },
  {
    id: 1,
    label: "Level 2",
    labelFor: "level2",
    value: "40",
    subValue: "%"
  },
  {
    id: 2,
    label: "Level 3",
    labelFor: "level3",
    value: "30",
    subValue: "%"
  },
  {
    id: 3,
    label: "Level 4",
    labelFor: "level4",
    value: "20",
    subValue: "%"
  },
  {
    id: 4,
    label: "Level 5",
    labelFor: "level5",
    value: "10",
    subValue: "%"
  },
  {
    id: 5,
    label: "Level 6",
    labelFor: "level6",
    value: "5",
    subValue: "%"
  },
  {
    id: 6,
    label: "Level 7",
    labelFor: "level7",
    value: "4",
    subValue: "%"
  },
  {
    id: 7,
    label: "Level 8",
    labelFor: "level8",
    value: "3",
    subValue: "%"
  },
  {
    id: 8,
    label: "Level 9",
    labelFor: "level9",
    value: "2",
    subValue: "%"
  },
  {
    id: 9,
    label: "Level 10",
    labelFor: "level10",
    value: "1",
    subValue: "%"
  },
]
