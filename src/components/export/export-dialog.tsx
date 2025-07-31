"use client";

import { Download, FileText, Table } from "lucide-react";
import { useState } from "react";

import type { DateRange, ExportConfig } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatDate } from "@/lib/formatters";

type ExportDialogProps = {
  trigger?: React.ReactNode;
  onExport: (config: ExportConfig) => Promise<void>;
  isExporting?: boolean;
  exportProgress?: number;
  dateRange?: DateRange;
  defaultFormat?: "pdf" | "csv";
  context?: "dashboard" | "campaigns" | "metrics";
};

export function ExportDialog({
  trigger,
  onExport,
  isExporting = false,
  exportProgress = 0,
  dateRange,
  defaultFormat = "csv",
  context = "dashboard",
}: ExportDialogProps) {
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState<"pdf" | "csv">(defaultFormat);
  const [filename, setFilename] = useState("");

  const handleExport = async () => {
    const config: ExportConfig = {
      format,
      filename: filename || undefined,
      dateRange,
    };

    try {
      await onExport(config);
      setOpen(false);
    }
    catch (error) {
      // Error handling is done in the hook
      console.error(error);
    }
  };

  const getDefaultFilename = () => {
    const timestamp = new Date().toISOString().slice(0, 16).replace(/[:-]/g, "");
    const dateRangeStr = dateRange
      ? `_${formatDate(dateRange.from, "short")}-to-${formatDate(dateRange.to, "short")}`
      : "";

    return `admybrand-insights-${context}${dateRangeStr}_${timestamp}`;
  };

  const getContextTitle = () => {
    switch (context) {
      case "campaigns":
        return "Export Campaign Data";
      case "metrics":
        return "Export Metrics";
      default:
        return "Export Dashboard";
    }
  };

  const getContextDescription = () => {
    switch (context) {
      case "campaigns":
        return "Export campaign performance data and metrics";
      case "metrics":
        return "Export key performance indicators and metrics";
      default:
        return "Export comprehensive dashboard data including metrics, charts, and campaign performance";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{getContextTitle()}</DialogTitle>
          <DialogDescription>
            {getContextDescription()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Date Range Info */}
          {dateRange && (
            <div className="rounded-lg border p-3 bg-muted/50">
              <div className="text-sm font-medium">Date Range</div>
              <div className="text-sm text-muted-foreground">
                {formatDate(dateRange.from, "long")}
                {" "}
                -
                {formatDate(dateRange.to, "long")}
              </div>
            </div>
          )}

          {/* Format Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Export Format</Label>
            <RadioGroup value={format} onValueChange={value => setFormat(value as "pdf" | "csv")}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv" className="flex items-center space-x-2 cursor-pointer">
                  <Table className="h-4 w-4" />
                  <span>CSV (Spreadsheet)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center space-x-2 cursor-pointer">
                  <FileText className="h-4 w-4" />
                  <span>PDF (Report)</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Filename */}
          <div className="space-y-2">
            <Label htmlFor="filename" className="text-sm font-medium">
              Filename (optional)
            </Label>
            <Input
              id="filename"
              placeholder={getDefaultFilename()}
              value={filename}
              onChange={e => setFilename(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to use default filename with timestamp
            </p>
          </div>

          {/* Export Progress */}
          {isExporting && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Exporting...</span>
                <span>
                  {exportProgress}
                  %
                </span>
              </div>
              <Progress value={exportProgress} className="h-2" />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isExporting}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting
              ? (
                  <>
                    <Download className="h-4 w-4 mr-2 animate-spin" />
                    Exporting...
                  </>
                )
              : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                    {" "}
                    {format.toUpperCase()}
                  </>
                )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
