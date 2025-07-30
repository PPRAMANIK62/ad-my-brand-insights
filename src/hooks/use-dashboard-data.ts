import { useMemo } from "react";

import type { DateRange } from "@/lib/types";

import { filterTableData, filterTimeSeriesData } from "@/lib/date-utils";
import {
  campaignTableData,
  conversionData,
  performanceMetrics,
  revenueChartData,
  userChartData,
  yearlyCampaignData,
  yearlyPerformanceMetrics,
  yearlyRevenueData,
  yearlyUserData,
} from "@/lib/mock-data";

/**
 * Custom hook for managing dashboard data filtering and calculations
 */
export function useDashboardData(
  selectedPreset: string,
  isCustomRange: boolean,
  currentDateRange: DateRange,
) {
  // Select appropriate datasets based on time period
  const getDatasetForPeriod = useMemo(() => {
    const period = isCustomRange ? "custom" : selectedPreset;

    switch (period) {
      case "7d":
      case "30d":
        return {
          revenueData: revenueChartData,
          userData: userChartData,
          campaignData: campaignTableData,
          performanceData: performanceMetrics,
        };
      case "90d":
        return {
          revenueData: yearlyRevenueData.slice(-90), // Last 90 days from yearly data
          userData: yearlyUserData.slice(-90),
          campaignData: yearlyCampaignData,
          performanceData: yearlyPerformanceMetrics,
        };
      case "1y":
      case "custom":
        return {
          revenueData: yearlyRevenueData,
          userData: yearlyUserData,
          campaignData: yearlyCampaignData,
          performanceData: yearlyPerformanceMetrics,
        };
      default:
        return {
          revenueData: revenueChartData,
          userData: userChartData,
          campaignData: campaignTableData,
          performanceData: performanceMetrics,
        };
    }
  }, [selectedPreset, isCustomRange]);

  // Filter data based on current date range
  const filteredRevenueData = useMemo(() => {
    return filterTimeSeriesData(getDatasetForPeriod.revenueData, currentDateRange);
  }, [getDatasetForPeriod.revenueData, currentDateRange]);

  const filteredUserData = useMemo(() =>
    filterTimeSeriesData(getDatasetForPeriod.userData, currentDateRange), [getDatasetForPeriod.userData, currentDateRange]);

  const filteredCampaignData = useMemo(() =>
    filterTableData(getDatasetForPeriod.campaignData, currentDateRange, "dateCreated"), [getDatasetForPeriod.campaignData, currentDateRange]);

  // Note: conversionData doesn't have date field, so we'll use it as-is for now
  const filteredConversionData = conversionData;

  // Filter performance metrics data
  const filteredPerformanceMetrics = useMemo(() => ({
    ctr: filterTimeSeriesData(getDatasetForPeriod.performanceData.ctr, currentDateRange),
    conversionRate: filterTimeSeriesData(getDatasetForPeriod.performanceData.conversionRate, currentDateRange),
    roas: filterTimeSeriesData(getDatasetForPeriod.performanceData.roas, currentDateRange),
  }), [getDatasetForPeriod.performanceData, currentDateRange]);

  return {
    filteredRevenueData,
    filteredUserData,
    filteredCampaignData,
    filteredConversionData,
    filteredPerformanceMetrics,
  };
}
