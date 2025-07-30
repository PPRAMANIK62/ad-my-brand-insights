import { useMemo } from "react";

import { metricsCards } from "@/lib/mock-data";

/**
 * Custom hook for calculating updated metrics from filtered data
 */
export function useMetricsCalculation(
  filteredRevenueData: any[],
  filteredUserData: any[],
  filteredCampaignData: any[],
) {
  return useMemo(() => {
    // Calculate revenue from filtered revenue data
    const totalRevenue = filteredRevenueData.reduce((sum, item) => sum + (item.revenue || 0), 0);

    // Calculate users from filtered user data
    const totalUsers = filteredUserData.reduce((sum, item) => sum + (item.users || 0), 0);

    // Calculate conversions from filtered campaign data
    const totalConversions = filteredCampaignData.reduce((sum, item) => sum + (item.conversions || 0), 0);

    // Calculate growth rate from revenue data
    const firstRevenue = filteredRevenueData[0]?.revenue || 0;
    const lastRevenue = filteredRevenueData[filteredRevenueData.length - 1]?.revenue || 0;
    const growthRate = firstRevenue > 0 ? ((lastRevenue - firstRevenue) / firstRevenue) * 100 : 0;

    // Calculate trend changes by comparing periods
    const calculateTrendChange = (data: any[], valueKey: string) => {
      if (data.length < 2)
        return 0;

      const midPoint = Math.floor(data.length / 2);
      const firstHalf = data.slice(0, midPoint);
      const secondHalf = data.slice(midPoint);

      const firstHalfAvg = firstHalf.reduce((sum, item) => sum + (item[valueKey] || 0), 0) / firstHalf.length;
      const secondHalfAvg = secondHalf.reduce((sum, item) => sum + (item[valueKey] || 0), 0) / secondHalf.length;

      return firstHalfAvg > 0 ? ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100 : 0;
    };

    // Calculate individual trend changes
    const revenueChange = calculateTrendChange(filteredRevenueData, "revenue");
    const usersChange = calculateTrendChange(filteredUserData, "users");
    const conversionsChange = calculateTrendChange(filteredCampaignData, "conversions");

    return metricsCards.map((card) => {
      let change = 0;
      let changeType: "increase" | "decrease" = "increase";

      switch (card.id) {
        case "revenue":
          change = revenueChange;
          changeType = change >= 0 ? "increase" : "decrease";
          return {
            ...card,
            value: `$${(totalRevenue / 1000).toFixed(1)}K`,
            change: Number(Math.abs(change).toFixed(2)),
            changeType,
          };
        case "users":
          change = usersChange;
          changeType = change >= 0 ? "increase" : "decrease";
          return {
            ...card,
            value: `${(totalUsers / 1000).toFixed(1)}K`,
            change: Number(Math.abs(change).toFixed(2)),
            changeType,
          };
        case "conversions":
          change = conversionsChange;
          changeType = change >= 0 ? "increase" : "decrease";
          return {
            ...card,
            value: totalConversions.toLocaleString(),
            change: Number(Math.abs(change).toFixed(2)),
            changeType,
          };
        case "growth":
          changeType = growthRate >= 0 ? "increase" : "decrease";
          return {
            ...card,
            value: `${growthRate.toFixed(2)}%`,
            change: Number(Math.abs(growthRate).toFixed(2)),
            changeType,
          };
        default:
          return card;
      }
    });
  }, [filteredRevenueData, filteredUserData, filteredCampaignData]);
}
