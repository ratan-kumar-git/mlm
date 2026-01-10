import { SidebarSection } from "@/type/sidebar";
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
  Network,
  TrendingUp,
  History,
  Settings2,
  ShieldCheck,
  LifeBuoy,
  Monitor,
  HelpCircle,
  Info,
  Link
} from "lucide-react";

export const adminSidebarSections: SidebarSection[] = [
  {
    label: "GENERAL",
    items: [
      { 
        title: "Dashboard", 
        icon: LayoutDashboard, 
        url: "/admin/dashboard" 
      },
      { 
        title: "Tickets", 
        icon: Ticket, 
        url: "/admin/tickets" 
      },
      { 
        title: "Deposits", 
        icon: Wallet, 
        url: "/admin/deposits" 
      },
      { 
        title: "Withdrawals", 
        icon: Download, 
        url: "/admin/withdrawals" 
      },
      {
        title: "Associate",
        icon: Users,
        url: "/admin/associate",
        items: [
          { title: "Members", url: "/admin/associate/members" },
          { title: "Genealogy", url: "/admin/associate/genealogy" },
        ],
      },
    ],
  },
  {
    label: "REPORT",
    items: [
      { 
        title: "User Summary", 
        icon: FileText, 
        url: "/admin/summary" 
      },
      { 
        title: "Transactions", 
        icon: DollarSign, 
        url: "/admin/transactions" 
      },
      {
        title: "Income History",
        icon: History,
        url: "/admin/income-history",
        items: [
          { title: "Top Earners", url: "/admin/income/top-earners" },
          { title: "Peer Transfers", url: "/admin/income/peer-transfers" },
          { title: "Plan History", url: "/admin/income/plan-history" },
        ],
      },
      {
        title: "Incomes",
        icon: TrendingUp,
        url: "/admin/incomes",
        items: [
          { title: "ROI Income", url: "/admin/incomes/roi" },
          { title: "Referral Income", url: "/admin/incomes/referral" },
        ],
      },
      { 
        title: "Login Sessions", 
        icon: LogIn, 
        url: "/admin/sessions" 
      },
    ],
  },
  {
    label: "SETTINGS",
    items: [
      { 
        title: "Plans", 
        icon: Crown, 
        url: "/admin/plans" 
      },
      {
        title: "Payment Methods",
        icon: CreditCard,
        url: "/admin/payments",
        items: [
          { title: "Deposit Methods", url: "/admin/payments/deposit" },
          { title: "Withdraw Methods", url: "/admin/payments/withdraw" },
        ],
      },
      {
        title: "System Settings",
        icon: Settings2,
        url: "/admin/settings",
        items: [
          { title: "Email Configuration", url: "/admin/settings/email" },
          { title: "Site Settings", url: "/admin/settings/site" },
          { title: "Extensions", url: "/admin/settings/extensions" },
          { title: "Services", url: "/admin/settings/services" },
        ],
      },
      {
        title: "Staff Management",
        icon: ShieldCheck,
        url: "/admin/staff",
        items: [
          { title: "Roles & Permissions", url: "/admin/staff/roles" },
          { title: "Staff List", url: "/admin/staff/list" },
        ],
      },
      { 
        title: "Support Category", 
        icon: LifeBuoy, 
        url: "/admin/support-category" 
      },
    ],
  },
  {
    label: "FRONTEND",
    items: [
      {
        title: "Pages",
        icon: Monitor,
        url: "/admin/frontend",
        items: [
          { title: "FAQs", url: "/admin/frontend/faqs" },
          { title: "Contact Us", url: "/admin/frontend/contact" },
          { title: "Privacy Policy", url: "/admin/frontend/privacy" },
          { title: "Refund Policy", url: "/admin/frontend/refund" },
          { title: "Terms of Use", url: "/admin/frontend/terms" },
          { title: "Commission Policy", url: "/admin/frontend/commission" },
        ],
      },
      { 
        title: "Help", 
        icon: HelpCircle, 
        url: "/admin/help" 
      },
    ],
  },
  {
    label: "EXTRA",
    items: [
      { 
        title: "System Info", 
        icon: Info, 
        url: "/admin/system-info" 
      },
    ],
  },
];

export const userSidebarSections: SidebarSection[] = [
  {
    items: [
      { 
        title: "Dashboard", 
        icon: LayoutDashboard, 
        url: "/user/dashboard",
      },
      { 
        title: "Plans", 
        icon: Crown, 
        url: "/user/plans" 
      },
      { 
        title: "Plan History", 
        icon: History, 
        url: "/user/plan-history" 
      },
      { 
        title: "Wallet", 
        icon: Wallet, 
        url: "/user/wallet" 
      },
      { 
        title: "Incomes", 
        icon: TrendingUp, 
        url: "/user/incomes",
        items: [
          { title: "ROI Income", url: "/user/incomes/roi" },
          { title: "Referral Income", url: "/user/incomes/referral" },
        ],
      },
      {
        title: "My Network",
        icon: Network,
        url: "/user/network",
        items: [
          { title: "Genealogy", url: "/user/network/genealogy" },
          { title: "My Team", url: "/user/network/team" },
        ],
      },
      { 
        title: "Referral Link", 
        icon: Link, 
        url: "/user/referral" 
      },
      { 
        title: "Help Center", 
        icon: HelpCircle, 
        url: "/user/help" 
      },
    ],
  },
];