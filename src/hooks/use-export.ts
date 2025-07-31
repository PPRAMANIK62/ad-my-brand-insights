import { useCallback, useState } from "react";
import { toast } from "sonner";

import type { DateRange, ExportConfig, MetricCard, TableRow, TimeSeriesData } from "@/lib/types";

import {
  downloadCSV,
  exportCampaignsToCSV,
  exportDashboardToCSV,
  exportMetricsToCSV,
  generateCSVFilename,
} from "@/lib/export/csv-export";
import {
  exportDashboardToPDF,
  generatePDFFilename,
} from "@/lib/export/pdf-export";

/**
 * Export data structure
 */
export type ExportData = {
  metrics: MetricCard[];
  revenueData: TimeSeriesData[];
  userData: TimeSeriesData[];
  campaignData: TableRow[];
  conversionData: any[];
  performanceMetrics: any;
  dateRange?: DateRange;
};

/**
 * Export context for different export scenarios
 */
export type ExportContext = "dashboard" | "campaigns" | "metrics" | "charts";

/**
 * Hook for managing export functionality
 */
export function useExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  /**
   * Export to CSV format
   */
  const exportToCSV = useCallback(async (
    data: ExportData,
    context: ExportContext = "dashboard",
    config?: Partial<ExportConfig>,
  ) => {
    try {
      setIsExporting(true);
      setExportProgress(25);

      let csvContent: string;
      let filename: string;

      switch (context) {
        case "campaigns":
          csvContent = exportCampaignsToCSV(data.campaignData);
          filename = config?.filename || generateCSVFilename("campaigns", data.dateRange);
          break;

        case "metrics":
          csvContent = exportMetricsToCSV(data.metrics);
          filename = config?.filename || generateCSVFilename("metrics", data.dateRange);
          break;

        case "dashboard":
        default:
          csvContent = exportDashboardToCSV(data);
          filename = config?.filename || generateCSVFilename("dashboard", data.dateRange);
          break;
      }

      setExportProgress(75);

      // Download the CSV file
      downloadCSV(csvContent, filename);

      setExportProgress(100);
      toast.success("CSV export completed successfully!");
    }
    catch (error) {
      console.error("CSV export error:", error);
      toast.error("Failed to export CSV. Please try again.");
    }
    finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  }, []);

  /**
   * Export to PDF format
   */
  const exportToPDF = useCallback(async (
    data: ExportData,
    config?: Partial<ExportConfig>,
  ) => {
    try {
      setIsExporting(true);
      setExportProgress(25);

      const pdfData = {
        metrics: data.metrics,
        campaignData: data.campaignData,
        dateRange: data.dateRange,
      };

      const options = {
        filename: config?.filename || generatePDFFilename(data.dateRange),
        includeMetrics: true,
        includeCharts: false, // Charts removed from PDF exports
        includeCampaigns: true,
      };

      setExportProgress(50);

      await exportDashboardToPDF(pdfData, options);

      setExportProgress(100);
      toast.success("PDF export completed successfully!");
    }
    catch (error) {
      console.error("PDF export error:", error);
      toast.error("Failed to export PDF. Please try again.");
    }
    finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  }, []);

  // Chart export functionality removed

  /**
   * Quick export for campaign table
   */
  const exportCampaigns = useCallback(async (
    campaigns: TableRow[],
    dateRange?: DateRange,
  ) => {
    const data: ExportData = {
      metrics: [],
      revenueData: [],
      userData: [],
      campaignData: campaigns,
      conversionData: [],
      performanceMetrics: {},
      dateRange,
    };

    await exportToCSV(data, "campaigns");
  }, [exportToCSV]);

  /**
   * Quick export for metrics
   */
  const exportMetrics = useCallback(async (
    metrics: MetricCard[],
    dateRange?: DateRange,
  ) => {
    const data: ExportData = {
      metrics,
      revenueData: [],
      userData: [],
      campaignData: [],
      conversionData: [],
      performanceMetrics: {},
      dateRange,
    };

    await exportToCSV(data, "metrics");
  }, [exportToCSV]);

  // Chart element selection removed since charts are no longer exported

  return {
    // State
    isExporting,
    exportProgress,

    // Export functions
    exportToCSV,
    exportToPDF,

    // Quick export functions
    exportCampaigns,
    exportMetrics,
  };
}
