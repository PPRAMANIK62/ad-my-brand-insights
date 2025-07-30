import type { MetricCard } from "@/lib/types";

/**
 * Mock data for metrics cards
 */

export const metricsCards: MetricCard[] = [
  {
    id: "revenue",
    title: "Total Revenue",
    value: "$847,392",
    change: 12.5,
    changeType: "increase",
    icon: "DollarSign",
    description: "Total revenue this month",
  },
  {
    id: "users",
    title: "Active Users",
    value: "24,891",
    change: 8.2,
    changeType: "increase",
    icon: "Users",
    description: "Monthly active users",
  },
  {
    id: "conversions",
    title: "Conversions",
    value: "3,247",
    change: -2.1,
    changeType: "decrease",
    icon: "Target",
    description: "Total conversions this month",
  },
  {
    id: "growth",
    title: "Growth Rate",
    value: "15.3%",
    change: 4.7,
    changeType: "increase",
    icon: "TrendingUp",
    description: "Month-over-month growth",
  },
];
