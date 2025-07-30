"use client";

import { Calendar, Download, RefreshCw } from "lucide-react";

import { BarChart } from "@/components/charts/bar-chart";
import { LineChart, MultiLineChart } from "@/components/charts/line-chart";
import { DonutChart } from "@/components/charts/pie-chart";
import { DashboardContainer, DashboardLayout, DashboardSection } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/header";
import { CampaignsTable } from "@/components/tables/campaigns-table";
import { Button } from "@/components/ui/button";
import { ChartWrapper } from "@/components/ui/chart-wrapper";
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

export default function Home() {
  return (
    <DashboardLayout>
      <DashboardContainer>
        {/* Page Header */}
        <PageHeader
          title="Dashboard Overview"
          description="Monitor your marketing performance and key metrics in real-time"
        >
          <div className="flex items-center space-x-2">
            <Select defaultValue="30d">
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
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Custom Range
            </Button>
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
            {metricsCards.map(metric => (
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
              <Select defaultValue="revenue">
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
              data={revenueChartData}
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
              data={userChartData}
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
              data={conversionData}
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
              <Select defaultValue="ctr">
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
              data={performanceMetrics.ctr}
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
          <CampaignsTable data={campaignTableData} />
        </DashboardSection>
      </DashboardContainer>
    </DashboardLayout>
  );
}
