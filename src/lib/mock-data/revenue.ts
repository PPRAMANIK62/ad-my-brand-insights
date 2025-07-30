import { format, subDays } from "date-fns";

import type { RevenueData } from "@/lib/types";

import { getSeasonalMultiplier } from "@/lib/data-generators";

/**
 * Mock data for revenue analytics
 */

// Revenue Chart Data (30 days)
export const revenueChartData: RevenueData[] = Array.from({ length: 30 }, (_, i) => {
  const date = subDays(new Date(), 29 - i);
  const baseRevenue = 25000 + Math.random() * 10000;
  const expenses = baseRevenue * (0.6 + Math.random() * 0.2);

  return {
    date: format(date, "MMM dd"),
    value: Math.round(baseRevenue),
    revenue: Math.round(baseRevenue),
    profit: Math.round(baseRevenue - expenses),
    expenses: Math.round(expenses),
  };
});

// Generate yearly revenue data with seasonal patterns
function generateYearlyRevenueData(): RevenueData[] {
  return Array.from({ length: 365 }, (_, i) => {
    const date = subDays(new Date(), 364 - i);
    const seasonalMultiplier = getSeasonalMultiplier(date);

    // Base revenue with growth over time
    const daysFromStart = i;
    const growthMultiplier = (1 + 0.12 / 365) ** daysFromStart; // 12% annual growth

    const baseRevenue = 20000 * seasonalMultiplier * growthMultiplier;
    const variance = 0.15;
    const randomFactor = 1 + (Math.random() - 0.5) * variance;

    const revenue = Math.round(baseRevenue * randomFactor);
    const expenses = Math.round(revenue * (0.65 + Math.random() * 0.15)); // 65-80% of revenue
    const profit = revenue - expenses;

    return {
      date: format(date, "MMM dd"),
      value: revenue,
      revenue,
      profit,
      expenses,
    };
  });
}

export const yearlyRevenueData: RevenueData[] = generateYearlyRevenueData();
