import { generateSeasonalTimeSeriesData, generateTimeSeriesData } from "@/lib/data-generators";

/**
 * Mock data for performance metrics
 */

// Performance metrics over time (30 days)
export const performanceMetrics = {
  ctr: generateTimeSeriesData(30, 3.5, 0.4),
  conversionRate: generateTimeSeriesData(30, 4.2, 0.3),
  roas: generateTimeSeriesData(30, 4.8, 0.25),
};

// Generate yearly performance metrics
function generateYearlyPerformanceMetrics() {
  return {
    ctr: generateSeasonalTimeSeriesData(365, 3.2, 0.3, 0.08), // 8% improvement in CTR
    conversionRate: generateSeasonalTimeSeriesData(365, 3.8, 0.25, 0.12), // 12% improvement in conversion
    roas: generateSeasonalTimeSeriesData(365, 4.5, 0.2, 0.15), // 15% improvement in ROAS
  };
}

export const yearlyPerformanceMetrics = generateYearlyPerformanceMetrics();

// Additional chart data for different time periods
export const weeklyData = generateTimeSeriesData(7, 5000, 0.3);
export const monthlyData = generateTimeSeriesData(30, 25000, 0.2);
export const quarterlyData = generateTimeSeriesData(90, 750000, 0.15);
export const yearlyData = generateSeasonalTimeSeriesData(365, 25000, 0.2, 0.15);
