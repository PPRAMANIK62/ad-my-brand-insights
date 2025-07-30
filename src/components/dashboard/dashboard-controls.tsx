import type { DateRange as ReactDayPickerDateRange } from "react-day-picker";

import { Download, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type DashboardControlsProps = {
  selectedPreset: string;
  customDateRange: ReactDayPickerDateRange | undefined;
  onPresetChange: (preset: string) => void;
  onCustomDateChange: (dateRange: ReactDayPickerDateRange | undefined) => void;
};

export function DashboardControls({
  selectedPreset,
  customDateRange,
  onPresetChange,
  onCustomDateChange,
}: DashboardControlsProps) {
  return (
    <div className="flex items-center space-x-2">
      <Select value={selectedPreset} onValueChange={onPresetChange}>
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
        onDateChange={onCustomDateChange}
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
  );
}
