import { format, getMonth, subDays } from "date-fns";

import type { ChartDataPoint } from "@/lib/types";

/**
 * Utility functions for generating mock data
 */

// Get seasonal multiplier for realistic business cycles
export function getSeasonalMultiplier(date: Date): number {
  const month = getMonth(date); // 0-11 (Jan-Dec)

  // Seasonal business patterns
  const seasonalMultipliers = [
    0.7, // January - post-holiday slump
    0.8, // February - slow period
    1.0, // March - spring start
    1.1, // April - spring growth
    1.1, // May - spring peak
    1.2, // June - summer start
    1.3, // July - summer peak
    1.2, // August - back-to-school prep
    1.1, // September - back-to-school
    1.0, // October - normal
    1.4, // November - holiday season start
    1.6, // December - holiday peak
  ];

  return seasonalMultipliers[month];
}

// Generate realistic time-series data
export function generateTimeSeriesData(
  days: number,
  baseValue: number,
  variance: number = 0.2,
): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];

  for (let i = days; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const randomFactor = 1 + (Math.random() - 0.5) * variance;
    const value = Math.round(baseValue * randomFactor);

    data.push({
      date: format(date, "MMM dd"),
      value,
    });
  }

  return data;
}

// Generate seasonal time-series data with growth trends
export function generateSeasonalTimeSeriesData(
  days: number,
  baseValue: number,
  variance: number = 0.2,
  growthRate: number = 0.15,
): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];

  for (let i = days; i >= 0; i--) {
    const date = subDays(new Date(), i);

    // Apply seasonal multiplier
    const seasonalMultiplier = getSeasonalMultiplier(date);

    // Apply growth over time (compound growth)
    const daysFromStart = days - i;
    const growthMultiplier = (1 + growthRate / 365) ** daysFromStart;

    // Add random variance
    const randomFactor = 1 + (Math.random() - 0.5) * variance;

    const value = Math.round(baseValue * seasonalMultiplier * growthMultiplier * randomFactor);

    data.push({
      date: format(date, "MMM dd"),
      value,
    });
  }

  return data;
}

// Generate random performance metrics within realistic ranges
export function generatePerformanceMetric(
  baseValue: number,
  variance: number = 0.2,
): number {
  const randomFactor = 1 + (Math.random() - 0.5) * variance;
  return Math.round((baseValue * randomFactor) * 100) / 100;
}

// Generate realistic campaign performance based on channel
export function generateCampaignMetrics(channel: string) {
  const channelMultipliers = {
    "Google Ads": { ctr: 3.8, conversionRate: 3.5, roas: 4.2 },
    "Facebook Ads": { ctr: 3.0, conversionRate: 2.9, roas: 3.1 },
    "Instagram": { ctr: 4.2, conversionRate: 4.1, roas: 5.8 },
    "LinkedIn": { ctr: 5.1, conversionRate: 5.1, roas: 6.2 },
    "Twitter": { ctr: 2.3, conversionRate: 2.5, roas: 2.8 },
    "TikTok": { ctr: 4.8, conversionRate: 3.2, roas: 4.5 },
    "YouTube": { ctr: 3.5, conversionRate: 3.8, roas: 4.0 },
  };

  const defaults = { ctr: 3.5, conversionRate: 3.5, roas: 4.0 };
  const multipliers = channelMultipliers[channel as keyof typeof channelMultipliers] || defaults;

  return {
    ctr: generatePerformanceMetric(multipliers.ctr, 0.3),
    conversionRate: generatePerformanceMetric(multipliers.conversionRate, 0.25),
    roas: generatePerformanceMetric(multipliers.roas, 0.2),
  };
}
