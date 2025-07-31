import { format } from "date-fns";
import JsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type { DateRange, MetricCard, TableRow } from "@/lib/types";

/**
 * PDF Export utilities for dashboard data
 */

export type PDFExportOptions = {
  filename?: string;
  includeMetrics?: boolean;
  includeCharts?: boolean;
  includeCampaigns?: boolean;
  dateRange?: DateRange;
};

/**
 * Create a new PDF document with branding
 */
function createPDFDocument(): JsPDF {
  const doc = new JsPDF();

  // Add header with branding
  doc.setFontSize(24);
  doc.setTextColor(59, 130, 246); // Blue color
  doc.text("ADmyBRAND Insights", 20, 25);

  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text("Analytics Dashboard Report", 20, 35);

  return doc;
}

/**
 * Add metrics section to PDF
 */
function addMetricsSection(
  doc: JsPDF,
  metrics: MetricCard[],
  startY: number,
): number {
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Key Performance Metrics", 20, startY);

  const tableData = metrics.map(metric => [
    metric.title,
    metric.value.toString(),
    `${metric.change > 0 ? "+" : ""}${metric.change}%`,
    metric.changeType,
  ]);

  autoTable(doc, {
    head: [["Metric", "Value", "Change", "Trend"]],
    body: tableData,
    startY: startY + 10,
    theme: "grid",
    headStyles: { fillColor: [59, 130, 246] },
    styles: { fontSize: 10 },
  });

  return (doc as any).lastAutoTable.finalY + 20;
}

/**
 * Add campaign table to PDF
 */
function addCampaignTable(
  doc: JsPDF,
  campaigns: TableRow[],
  startY: number,
): number {
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Campaign Performance", 20, startY);

  const tableData = campaigns.map(campaign => [
    campaign.campaign,
    campaign.channel,
    campaign.status,
    campaign.impressions.toLocaleString(),
    campaign.clicks.toLocaleString(),
    campaign.conversions.toString(),
    `$${campaign.revenue.toLocaleString()}`,
    `${campaign.ctr}%`,
    `${campaign.conversionRate}%`,
    campaign.roas.toString(),
  ]);

  autoTable(doc, {
    head: [["Campaign", "Channel", "Status", "Impressions", "Clicks", "Conversions", "Revenue", "CTR", "Conv Rate", "ROAS"]],
    body: tableData,
    startY: startY + 10,
    theme: "grid",
    headStyles: { fillColor: [59, 130, 246] },
    styles: { fontSize: 8 },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 20 },
      2: { cellWidth: 15 },
      3: { cellWidth: 20 },
      4: { cellWidth: 15 },
      5: { cellWidth: 15 },
      6: { cellWidth: 20 },
      7: { cellWidth: 12 },
      8: { cellWidth: 15 },
      9: { cellWidth: 12 },
    },
  });

  return (doc as any).lastAutoTable.finalY + 20;
}

// Chart capture functionality removed

/**
 * Add footer to PDF
 */
function addFooter(doc: JsPDF, dateRange?: DateRange): void {
  const pageCount = doc.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    // Add generation timestamp
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    doc.text(`Generated on ${timestamp}`, 20, 285);

    // Add date range if provided
    if (dateRange) {
      const dateRangeText = `Data range: ${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`;
      doc.text(dateRangeText, 20, 290);
    }

    // Add page number
    doc.text(`Page ${i} of ${pageCount}`, 170, 285);
  }
}

/**
 * Export dashboard data to PDF
 */
export async function exportDashboardToPDF(
  data: {
    metrics: MetricCard[];
    campaignData: TableRow[];
    dateRange?: DateRange;
  },
  options: PDFExportOptions = {},
): Promise<void> {
  const doc = createPDFDocument();
  let currentY = 50;

  // Add date range info
  if (data.dateRange) {
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const dateRangeText = `Report Period: ${format(data.dateRange.from, "MMM dd, yyyy")} - ${format(data.dateRange.to, "MMM dd, yyyy")}`;
    doc.text(dateRangeText, 20, 45);
    currentY = 60;
  }

  // Add metrics section
  if (options.includeMetrics !== false && data.metrics.length > 0) {
    currentY = addMetricsSection(doc, data.metrics, currentY);
  }

  // Charts section removed - no longer including charts in PDF

  // Add campaign table
  if (options.includeCampaigns !== false && data.campaignData.length > 0) {
    // Check if we need a new page
    if (currentY > 200) {
      doc.addPage();
      currentY = 20;
    }
    currentY = addCampaignTable(doc, data.campaignData, currentY);
  }

  // Add footer
  addFooter(doc, data.dateRange);

  // Generate filename and download
  const filename = options.filename || generatePDFFilename(data.dateRange);
  doc.save(filename);
}

// Chart-based PDF export function removed

/**
 * Generate filename for PDF export
 */
export function generatePDFFilename(dateRange?: DateRange): string {
  const timestamp = format(new Date(), "yyyy-MM-dd-HHmm");
  const dateRangeStr = dateRange
    ? `_${format(dateRange.from, "yyyy-MM-dd")}-to-${format(dateRange.to, "yyyy-MM-dd")}`
    : "";

  return `admybrand-insights-dashboard${dateRangeStr}_${timestamp}.pdf`;
}
