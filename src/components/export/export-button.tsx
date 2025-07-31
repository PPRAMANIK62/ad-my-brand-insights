"use client";

import { Download } from "lucide-react";

import type { ExportContext, ExportData } from "@/hooks/use-export";
import type { DateRange, ExportConfig } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { useExport } from "@/hooks/use-export";

import { ExportDialog } from "./export-dialog";

type ExportButtonProps = {
  data: ExportData;
  context?: ExportContext;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
  quickExport?: boolean; // If true, exports immediately without dialog
  defaultFormat?: "pdf" | "csv";
};

export function ExportButton({
  data,
  context = "dashboard",
  variant = "outline",
  size = "sm",
  className,
  children,
  quickExport = false,
  defaultFormat = "csv",
}: ExportButtonProps) {
  const {
    isExporting,
    exportProgress,
    exportToCSV,
    exportToPDF,
  } = useExport();

  const handleQuickExport = async () => {
    if (defaultFormat === "csv") {
      await exportToCSV(data, context);
    }
    else {
      await exportToPDF(data);
    }
  };

  const handleExport = async (config: ExportConfig) => {
    if (config.format === "csv") {
      await exportToCSV(data, context, config);
    }
    else {
      // PDF export without charts
      await exportToPDF(data, config);
    }
  };

  if (quickExport) {
    return (
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={handleQuickExport}
        disabled={isExporting}
      >
        {isExporting
          ? (
              <>
                <Download className="h-4 w-4 mr-2 animate-spin" />
                Exporting...
              </>
            )
          : (
              children || (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                  {" "}
                  {defaultFormat.toUpperCase()}
                </>
              )
            )}
      </Button>
    );
  }

  return (
    <ExportDialog
      trigger={(
        <Button variant={variant} size={size} className={className} disabled={isExporting}>
          {children || (
            <>
              <Download className="h-4 w-4 mr-2" />
              Export
            </>
          )}
        </Button>
      )}
      onExport={handleExport}
      isExporting={isExporting}
      exportProgress={exportProgress}
      dateRange={data.dateRange}
      defaultFormat={defaultFormat}
      context={context}
    />
  );
}

/**
 * Quick export button for campaigns
 */
export function CampaignExportButton({
  campaigns,
  dateRange,
  ...props
}: {
  campaigns: any[];
  dateRange?: DateRange;
} & Omit<ExportButtonProps, "data" | "context">) {
  const data: ExportData = {
    metrics: [],
    revenueData: [],
    userData: [],
    campaignData: campaigns,
    conversionData: [],
    performanceMetrics: {},
    dateRange,
  };

  return (
    <ExportButton
      data={data}
      context="campaigns"
      quickExport={true}
      defaultFormat="csv"
      {...props}
    >
      <Download className="h-4 w-4 mr-2" />
      Export CSV
    </ExportButton>
  );
}

/**
 * Quick export button for metrics
 */
export function MetricsExportButton({
  metrics,
  dateRange,
  ...props
}: {
  metrics: any[];
  dateRange?: DateRange;
} & Omit<ExportButtonProps, "data" | "context">) {
  const data: ExportData = {
    metrics,
    revenueData: [],
    userData: [],
    campaignData: [],
    conversionData: [],
    performanceMetrics: {},
    dateRange,
  };

  return (
    <ExportButton
      data={data}
      context="metrics"
      quickExport={true}
      defaultFormat="csv"
      {...props}
    >
      <Download className="h-4 w-4 mr-2" />
      Export Metrics
    </ExportButton>
  );
}
