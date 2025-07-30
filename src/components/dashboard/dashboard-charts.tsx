import { useState } from "react";

import { BarChart } from "@/components/charts/bar-chart";
import { LineChart, MultiLineChart } from "@/components/charts/line-chart";
import { DonutChart } from "@/components/charts/pie-chart";
import { ChartWrapper } from "@/components/ui/chart-wrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type DashboardChartsProps = {
  filteredRevenueData: any[];
  filteredUserData: any[];
  filteredConversionData: any[];
  filteredPerformanceMetrics: any;
  isCustomRange: boolean;
  selectedPreset: string;
};

export function DashboardCharts({
  filteredRevenueData,
  filteredUserData,
  filteredConversionData,
  filteredPerformanceMetrics,
  isCustomRange,
  selectedPreset,
}: DashboardChartsProps) {
  const [selectedRevenueMetric, setSelectedRevenueMetric] = useState("revenue");
  const [selectedPerformanceMetric, setSelectedPerformanceMetric] = useState("ctr");

  const periodLabel = isCustomRange ? "Custom Range" : selectedPreset.toUpperCase();

  return (
    <>
      {/* Revenue and User Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Chart */}
        <ChartWrapper
          title="Revenue Trend"
          description={`Daily revenue over the selected period (${periodLabel})`}
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
          description={`New vs returning users over the selected period (${periodLabel})`}
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
          description={`Key performance indicators over the selected period (${periodLabel})`}
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
              "#8884d8",
              "#82ca9d",
              "#ffc658",
              "#ff7300",
              "#00ff00",
              "#8dd1e1",
              "#d084d0",
              "#ffb347",
              "#87ceeb",
              "#dda0dd",
              "#98fb98",
              "#f0e68c",
              "#ff6347",
              "#40e0d0",
              "#ee82ee",
              "#90ee90",
              "#ffd700",
              "#ff69b4",
              "#00ced1",
              "#ffa500",
              "#9370db",
              "#32cd32",
              "#ff1493",
              "#00bfff",
              "#ff4500",
              "#adff2f",
              "#da70d6",
              "#00fa9a",
              "#dc143c",
              "#00ffff",
            ]}
            height={300}
          />
        </ChartWrapper>
      </div>
    </>
  );
}
