import { format, subDays } from "date-fns";

import type { UserData } from "@/lib/types";

import { getSeasonalMultiplier } from "@/lib/data-generators";

/**
 * Mock data for user analytics
 */

// User Analytics Data (30 days)
export const userChartData: UserData[] = Array.from({ length: 30 }, (_, i) => {
  const date = subDays(new Date(), 29 - i);
  const totalUsers = 800 + Math.random() * 400;
  const newUsers = totalUsers * (0.3 + Math.random() * 0.2);

  return {
    date: format(date, "MMM dd"),
    value: Math.round(totalUsers),
    users: Math.round(totalUsers),
    newUsers: Math.round(newUsers),
    returningUsers: Math.round(totalUsers - newUsers),
  };
});

// Generate yearly user data with growth trends
function generateYearlyUserData(): UserData[] {
  return Array.from({ length: 365 }, (_, i) => {
    const date = subDays(new Date(), 364 - i);
    const seasonalMultiplier = getSeasonalMultiplier(date);

    // Base users with growth over time
    const daysFromStart = i;
    const growthMultiplier = (1 + 0.25 / 365) ** daysFromStart; // 25% annual user growth

    const baseUsers = 600 * seasonalMultiplier * growthMultiplier;
    const variance = 0.2;
    const randomFactor = 1 + (Math.random() - 0.5) * variance;

    const totalUsers = Math.round(baseUsers * randomFactor);
    const newUserRate = 0.25 + Math.random() * 0.15; // 25-40% new users
    const newUsers = Math.round(totalUsers * newUserRate);
    const returningUsers = totalUsers - newUsers;

    return {
      date: format(date, "MMM dd"),
      value: totalUsers,
      users: totalUsers,
      newUsers,
      returningUsers,
    };
  });
}

export const yearlyUserData: UserData[] = generateYearlyUserData();
