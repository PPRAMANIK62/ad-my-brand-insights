"use client";

import type { ExportData } from "@/hooks/use-export";

import { DashboardCampaigns } from "@/components/dashboard/dashboard-campaigns";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { DashboardControls } from "@/components/dashboard/dashboard-controls";
import { DashboardMetrics } from "@/components/dashboard/dashboard-metrics";
import { DashboardContainer, DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/header";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { useDateRange } from "@/hooks/use-date-range";
import { useMetricsCalculation } from "@/hooks/use-metrics-calculation";

export default function Home() {
  // Use custom hooks for state management
  const {
    selectedPreset,
    customDateRange,
    isCustomRange,
    currentDateRange,
    handlePresetChange,
    handleCustomDateChange,
  } = useDateRange();

  // Get filtered data using custom hook
  const {
    filteredRevenueData,
    filteredUserData,
    filteredCampaignData,
    filteredConversionData,
    filteredPerformanceMetrics,
  } = useDashboardData(selectedPreset, isCustomRange, currentDateRange);

  // Calculate updated metrics using custom hook
  const updatedMetrics = useMetricsCalculation(
    filteredRevenueData,
    filteredUserData,
    filteredCampaignData,
  );

  // Prepare export data
  const exportData: ExportData = {
    metrics: updatedMetrics,
    revenueData: filteredRevenueData,
    userData: filteredUserData,
    campaignData: filteredCampaignData,
    conversionData: filteredConversionData,
    performanceMetrics: filteredPerformanceMetrics,
    dateRange: currentDateRange,
  };

  return (
    <DashboardLayout>
      <DashboardContainer>
        {/* Page Header */}
        <PageHeader
          title="Dashboard Overview"
          description={`Monitor your marketing performance and key metrics in real-time${isCustomRange ? " (Custom Range)" : ` (${selectedPreset.toUpperCase()})`}`}
        >
          <DashboardControls
            selectedPreset={selectedPreset}
            customDateRange={customDateRange}
            onPresetChange={handlePresetChange}
            onCustomDateChange={handleCustomDateChange}
            exportData={exportData}
          />
        </PageHeader>

        {/* Key Metrics Cards */}
        <DashboardMetrics metrics={updatedMetrics} />

        {/* Charts Section */}
        <DashboardCharts
          filteredRevenueData={filteredRevenueData}
          filteredUserData={filteredUserData}
          filteredConversionData={filteredConversionData}
          filteredPerformanceMetrics={filteredPerformanceMetrics}
          isCustomRange={isCustomRange}
          selectedPreset={selectedPreset}
        />

        {/* Campaign Performance Table */}
        <DashboardCampaigns filteredCampaignData={filteredCampaignData} />
      </DashboardContainer>
    </DashboardLayout>
  );
}
