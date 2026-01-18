import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Clock,
  AlertTriangle,
  UserPlus,
  HelpCircle,
} from "lucide-react";

export const statsConfig = [
  {
    title: "Total Revenue",
    icon: DollarSign,
    gradient: "bg-gradient-to-r from-emerald-500 to-green-600",
    iconBg: "bg-white/20",
    key: "totalRevenue",
  },
  {
    title: "Total Orders",
    icon: ShoppingCart,
    gradient: "bg-gradient-to-r from-blue-500 to-indigo-600",
    iconBg: "bg-white/20",
    key: "totalOrders",
  },
  {
    title: "Total Customers",
    icon: Users,
    gradient: "bg-gradient-to-r from-violet-500 to-purple-600",
    iconBg: "bg-white/20",
    key: "totalCustomers",
  },
  {
    title: "Total Products",
    icon: Package,
    gradient: "bg-gradient-to-r from-sky-500 to-cyan-600",
    iconBg: "bg-white/20",
    key: "totalProducts",
  },
  {
    title: "Pending Orders",
    icon: Clock,
    gradient: "bg-gradient-to-r from-amber-500 to-orange-600",
    iconBg: "bg-white/20",
    key: "pendingOrders",
  },
  {
    title: "Out Of Stock",
    icon: AlertTriangle,
    gradient: "bg-gradient-to-r from-red-500 to-rose-600",
    iconBg: "bg-white/20",
    key: "outOfStock",
  },
  {
    title: "New Customers (30 days)",
    icon: UserPlus,
    gradient: "bg-gradient-to-r from-teal-500 to-emerald-600",
    iconBg: "bg-white/20",
    key: "newCustomers",
  },
  {
    title: "Unanswered Questions",
    icon: HelpCircle,
    gradient: "bg-gradient-to-r from-fuchsia-500 to-pink-600",
    iconBg: "bg-white/20",
    key: "unansweredQuestions",
  },
];
