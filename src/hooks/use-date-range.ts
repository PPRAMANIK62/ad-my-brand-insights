import type { DateRange as ReactDayPickerDateRange } from "react-day-picker";

import { useMemo, useState } from "react";

import type { DateRange } from "@/lib/types";

import { getPresetDateRange } from "@/lib/date-utils";

/**
 * Custom hook for managing date range state and logic
 */
export function useDateRange() {
  // State for date filtering
  const [selectedPreset, setSelectedPreset] = useState("30d");
  const [customDateRange, setCustomDateRange] = useState<ReactDayPickerDateRange | undefined>();
  const [isCustomRange, setIsCustomRange] = useState(false);

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

  return {
    selectedPreset,
    customDateRange,
    isCustomRange,
    currentDateRange,
    handlePresetChange,
    handleCustomDateChange,
  };
}
