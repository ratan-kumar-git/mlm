import {
  LayoutDashboard,
  Ticket,
  Wallet,
  Download,
  Users,
  FileText,
  DollarSign,
  LogIn,
  Crown,
  CreditCard,
} from "lucide-react";

export const sidebarSections = [
  {
    label: "GENERAL",
    items: [
      { title: "Dashboard", icon: LayoutDashboard, url: "/", active: true },
      { title: "Tickets", icon: Ticket, url: "/tickets" },
      { title: "Deposits", icon: Wallet, url: "/deposits" },
      { title: "Withdrawals", icon: Download, url: "/withdrawals" },
      { title: "Associate", icon: Users, url: "/associate", expandable: true },
    ],
  },
  {
    label: "REPORT",
    items: [
      { title: "User Summary", icon: FileText, url: "/summary" },
      { title: "Transactions", icon: DollarSign, url: "/transactions" },
      { title: "Income History", icon: DollarSign, url: "/income", expandable: true },
      { title: "Login Sessions", icon: LogIn, url: "/sessions" },
    ],
  },
  {
    label: "SETTINGS",
    items: [
      { title: "Plans", icon: Crown, url: "/plans" },
      { title: "Payment Methods", icon: CreditCard, url: "/payments", expandable: true },
    ],
  },
];
