"use client";

import { useState, useMemo } from "react";
import { Download, RefreshCw } from "lucide-react";

import { BarChart } from "@/components/charts/bar-chart";
import { LineChart, MultiLineChart } from "@/components/charts/line-chart";
import { DonutChart } from "@/components/charts/pie-chart";
import { DashboardContainer, DashboardLayout, DashboardSection } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/header";
import { CampaignsTable } from "@/components/tables/campaigns-table";
import { Button } from "@/components/ui/button";
import { ChartWrapper } from "@/components/ui/chart-wrapper";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MetricsCard, MetricsGrid } from "@/components/ui/metrics-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  campaignTableData,
  conversionData,
  metricsCards,
  performanceMetrics,
  revenueChartData,
  userChartData,
} from "@/lib/mock-data";
import type { DateRange } from "@/lib/types";
import type { DateRange as ReactDayPickerDateRange } from "react-day-picker";
import {
  filterTimeSeriesData,
  filterTableData,
  getPresetDateRange,
} from "@/lib/date-utils";

export default function Home() {
  // State for date filtering
  const [selectedPreset, setSelectedPreset] = useState("30d");
  const [customDateRange, setCustomDateRange] = useState<ReactDayPickerDateRange | undefined>();
  const [isCustomRange, setIsCustomRange] = useState(false);

  // State for chart selections
  const [selectedRevenueMetric, setSelectedRevenueMetric] = useState("revenue");
  const [selectedPerformanceMetric, setSelectedPerformanceMetric] = useState("ctr");

  // Calculate current date range based on preset or custom selection
  const currentDateRange = useMemo(() => {
    if (isCustomRange && customDateRange?.from && customDateRange?.to) {
      return {
        from: customDateRange.from,
        to: customDateRange.to,
      } as DateRange;
    }
    return getPresetDateRange(selectedPreset);
  }, [selectedPreset, customDateRange, isCustomRange]);

  // Filter data based on current date range
  const filteredRevenueData = useMemo(() =>
    filterTimeSeriesData(revenueChartData, currentDateRange),
    [currentDateRange]
  );

  const filteredUserData = useMemo(() =>
    filterTimeSeriesData(userChartData, currentDateRange),
    [currentDateRange]
  );

  const filteredCampaignData = useMemo(() =>
    filterTableData(campaignTableData, currentDateRange, 'dateCreated'),
    [currentDateRange]
  );

  // Note: conversionData doesn't have date field, so we'll use it as-is for now
  const filteredConversionData = conversionData;

  // Filter performance metrics data
  const filteredPerformanceMetrics = useMemo(() => ({
    ctr: filterTimeSeriesData(performanceMetrics.ctr, currentDateRange),
    conversionRate: filterTimeSeriesData(performanceMetrics.conversionRate, currentDateRange),
    roas: filterTimeSeriesData(performanceMetrics.roas, currentDateRange),
  }), [currentDateRange]);

  // Calculate updated metrics from filtered data
  const updatedMetrics = useMemo(() => {
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
      if (data.length < 2) return 0;

      const midPoint = Math.floor(data.length / 2);
      const firstHalf = data.slice(0, midPoint);
      const secondHalf = data.slice(midPoint);

      const firstHalfAvg = firstHalf.reduce((sum, item) => sum + (item[valueKey] || 0), 0) / firstHalf.length;
      const secondHalfAvg = secondHalf.reduce((sum, item) => sum + (item[valueKey] || 0), 0) / secondHalf.length;

      return firstHalfAvg > 0 ? ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100 : 0;
    };

    // Calculate individual trend changes
    const revenueChange = calculateTrendChange(filteredRevenueData, 'revenue');
    const usersChange = calculateTrendChange(filteredUserData, 'users');
    const conversionsChange = calculateTrendChange(filteredCampaignData, 'conversions');

    return metricsCards.map(card => {
      let change = 0;
      let changeType: "increase" | "decrease" = "increase";

      switch (card.id) {
        case 'revenue':
          change = revenueChange;
          changeType = change >= 0 ? "increase" : "decrease";
          return {
            ...card,
            value: `$${(totalRevenue / 1000).toFixed(1)}K`,
            change: Number(Math.abs(change).toFixed(2)),
            changeType
          };
        case 'users':
          change = usersChange;
          changeType = change >= 0 ? "increase" : "decrease";
          return {
            ...card,
            value: `${(totalUsers / 1000).toFixed(1)}K`,
            change: Number(Math.abs(change).toFixed(2)),
            changeType
          };
        case 'conversions':
          change = conversionsChange;
          changeType = change >= 0 ? "increase" : "decrease";
          return {
            ...card,
            value: totalConversions.toLocaleString(),
            change: Number(Math.abs(change).toFixed(2)),
            changeType
          };
        case 'growth':
          changeType = growthRate >= 0 ? "increase" : "decrease";
          return {
            ...card,
            value: `${growthRate.toFixed(2)}%`,
            change: Number(Math.abs(growthRate).toFixed(2)),
            changeType
          };
        default:
          return card;
      }
    });
  }, [filteredRevenueData, filteredUserData, filteredCampaignData]);

  // Handle preset selection
  const handlePresetChange = (preset: string) => {
    setSelectedPreset(preset);
    setIsCustomRange(false);
    setCustomDateRange(undefined);
  };

  // Handle custom date range selection
  const handleCustomDateChange = (dateRange: ReactDayPickerDateRange | undefined) => {
    setCustomDateRange(dateRange);
    if (dateRange?.from && dateRange?.to) {
      setIsCustomRange(true);
    }
  };

  return (
    <DashboardLayout>
      <DashboardContainer>
        {/* Page Header */}
        <PageHeader
          title="Dashboard Overview"
          description={`Monitor your marketing performance and key metrics in real-time${isCustomRange ? ' (Custom Range)' : ` (${selectedPreset.toUpperCase()})`}`}
        >
          <div className="flex items-center space-x-2">
            <Select value={selectedPreset} onValueChange={handlePresetChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <DateRangePicker
              date={customDateRange}
              onDateChange={handleCustomDateChange}
              placeholder="Custom Range"
            />
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </PageHeader>

        {/* Key Metrics Cards */}
        <DashboardSection title="Key Metrics" description="Overview of your most important performance indicators">
          <MetricsGrid>
            {updatedMetrics.map(metric => (
              <MetricsCard
                key={metric.id}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                changeType={metric.changeType}
                icon={metric.icon}
                description={metric.description}
              />
            ))}
          </MetricsGrid>
        </DashboardSection>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Revenue Chart */}
          <ChartWrapper
            title="Revenue Trend"
            description="Daily revenue over the last 30 days"
            actions={(
              <Select value={selectedRevenueMetric} onValueChange={setSelectedRevenueMetric}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="profit">Profit</SelectItem>
                  <SelectItem value="expenses">Expenses</SelectItem>
                </SelectContent>
              </Select>
            )}
          >
            <LineChart
              data={filteredRevenueData}
              dataKey="revenue"
              color="#8884d8"
              showArea={true}
              height={300}
            />
          </ChartWrapper>

          {/* User Analytics Chart */}
          <ChartWrapper
            title="User Analytics"
            description="New vs returning users over time"
          >
            <MultiLineChart
              data={filteredUserData}
              lines={[
                { dataKey: "newUsers", color: "#82ca9d", name: "New Users" },
                { dataKey: "returningUsers", color: "#ffc658", name: "Returning Users" },
              ]}
              height={300}
            />
          </ChartWrapper>
        </div>

        {/* Performance and Conversion Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Conversion by Channel */}
          <ChartWrapper
            title="Conversions by Channel"
            description="Distribution of conversions across marketing channels"
          >
            <DonutChart
              data={filteredConversionData}
              dataKey="conversions"
              nameKey="channel"
              height={300}
            />
          </ChartWrapper>

          {/* Performance Metrics */}
          <ChartWrapper
            title="Performance Metrics"
            description="Key performance indicators over time"
            actions={(
              <Select value={selectedPerformanceMetric} onValueChange={setSelectedPerformanceMetric}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ctr">CTR</SelectItem>
                  <SelectItem value="conversionRate">Conv. Rate</SelectItem>
                  <SelectItem value="roas">ROAS</SelectItem>
                </SelectContent>
              </Select>
            )}
          >
            <BarChart
              data={filteredPerformanceMetrics[selectedPerformanceMetric as keyof typeof filteredPerformanceMetrics]}
              dataKey="value"
              color="#6366f1"
              colors={[
                "#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00ff00",
                "#8dd1e1", "#d084d0", "#ffb347", "#87ceeb", "#dda0dd",
                "#98fb98", "#f0e68c", "#ff6347", "#40e0d0", "#ee82ee",
                "#90ee90", "#ffd700", "#ff69b4", "#00ced1", "#ffa500",
                "#9370db", "#32cd32", "#ff1493", "#00bfff", "#ff4500",
                "#adff2f", "#da70d6", "#00fa9a", "#dc143c", "#00ffff"
              ]}
              height={300}
            />
          </ChartWrapper>
        </div>

        {/* Campaign Performance Table */}
        <DashboardSection
          title="Campaign Performance"
          description="Detailed performance metrics for all active campaigns"
          actions={(
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button size="sm">
                Create Campaign
              </Button>
            </div>
          )}
        >
          <CampaignsTable data={filteredCampaignData} />
        </DashboardSection>
      </DashboardContainer>
    </DashboardLayout>
  );
}
