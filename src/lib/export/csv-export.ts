import { format } from "date-fns";
import Papa from "papaparse";

import type { DateRange, MetricCard, TableRow, TimeSeriesData } from "@/lib/types";

/**
 * CSV Export utilities for dashboard data
 */

export type CSVExportOptions = {
  filename?: string;
  includeMetrics?: boolean;
  includeChartData?: boolean;
  includeCampaigns?: boolean;
  dateRange?: DateRange;
};

/**
 * Export dashboard metrics to CSV format
 */
export function exportMetricsToCSV(metrics: MetricCard[]): string {
  const csvData = metrics.map(metric => ({
    "Metric": metric.title,
    "Value": metric.value,
    "Change (%)": metric.change,
    "Change Type": metric.changeType,
    "Description": metric.description || "",
  }));

  return Papa.unparse(csvData);
}

/**
 * Export time series chart data to CSV format
 */
export function exportChartDataToCSV(
  data: TimeSeriesData[],
  chartName: string,
): string {
  const csvData = data.map(item => ({
    Date: item.date,
    Value: item.value,
    Chart: chartName,
    ...item, // Include any additional fields
  }));

  return Papa.unparse(csvData);
}

/**
 * Export campaign table data to CSV format
 */
export function exportCampaignsToCSV(campaigns: TableRow[]): string {
  const csvData = campaigns.map(campaign => ({
    "Campaign": campaign.campaign,
    "Channel": campaign.channel,
    "Status": campaign.status,
    "Impressions": campaign.impressions,
    "Clicks": campaign.clicks,
    "Conversions": campaign.conversions,
    "Revenue": campaign.revenue,
    "CTR (%)": campaign.ctr,
    "Conversion Rate (%)": campaign.conversionRate,
    "ROAS": campaign.roas,
    "Date Created": campaign.dateCreated,
  }));

  return Papa.unparse(csvData);
}

/**
 * Export multiple chart datasets to CSV format
 */
export function exportMultipleChartsToCSV(charts: {
  name: string;
  data: TimeSeriesData[];
}[]): string {
  const allData: any[] = [];

  charts.forEach((chart) => {
    chart.data.forEach((item) => {
      allData.push({
        Chart: chart.name,
        Date: item.date,
        Value: item.value,
        ...item,
      });
    });
  });

  return Papa.unparse(allData);
}

/**
 * Create a comprehensive dashboard export
 */
export function exportDashboardToCSV(data: {
  metrics: MetricCard[];
  revenueData: TimeSeriesData[];
  userData: TimeSeriesData[];
  campaignData: TableRow[];
  conversionData: any[];
  performanceMetrics: any;
  dateRange?: DateRange;
}): string {
  const sections: string[] = [];

  // Add metadata
  const metadata = [
    ["Export Type", "Dashboard Summary"],
    ["Generated On", format(new Date(), "yyyy-MM-dd HH:mm:ss")],
    ["Date Range", data.dateRange
      ? `${format(data.dateRange.from, "yyyy-MM-dd")} to ${format(data.dateRange.to, "yyyy-MM-dd")}`
      : "All Time"],
    [""], // Empty row for separation
  ];
  sections.push(Papa.unparse(metadata));

  // Add metrics section
  sections.push("KEY METRICS");
  sections.push(exportMetricsToCSV(data.metrics));
  sections.push(""); // Empty row

  // Add revenue data
  sections.push("REVENUE DATA");
  sections.push(exportChartDataToCSV(data.revenueData, "Revenue"));
  sections.push(""); // Empty row

  // Add user data
  sections.push("USER ANALYTICS");
  sections.push(exportChartDataToCSV(data.userData, "User Analytics"));
  sections.push(""); // Empty row

  // Add campaign data
  sections.push("CAMPAIGN PERFORMANCE");
  sections.push(exportCampaignsToCSV(data.campaignData));
  sections.push(""); // Empty row

  // Add conversion data
  if (data.conversionData.length > 0) {
    sections.push("CONVERSIONS BY CHANNEL");
    const conversionCSV = Papa.unparse(data.conversionData);
    sections.push(conversionCSV);
    sections.push(""); // Empty row
  }

  return sections.join("\n");
}

/**
 * Download CSV file
 */
export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * Generate filename for CSV export
 */
export function generateCSVFilename(
  type: "dashboard" | "campaigns" | "metrics" | "charts",
  dateRange?: DateRange,
): string {
  const timestamp = format(new Date(), "yyyy-MM-dd-HHmm");
  const dateRangeStr = dateRange
    ? `_${format(dateRange.from, "yyyy-MM-dd")}-to-${format(dateRange.to, "yyyy-MM-dd")}`
    : "";

  return `admybrand-insights-${type}${dateRangeStr}_${timestamp}.csv`;
}
