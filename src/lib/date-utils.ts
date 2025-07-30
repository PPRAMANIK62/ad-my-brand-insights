import { endOfDay, format, isAfter, isBefore, isEqual, parseISO, startOfDay, subDays } from "date-fns";

import type { DateRange } from "@/lib/types";

/**
 * Get date range for predefined periods
 */
export function getPresetDateRange(preset: string): DateRange {
  const today = new Date();
  const endOfToday = endOfDay(today);

  switch (preset) {
    case "7d":
      return {
        from: startOfDay(subDays(today, 6)), // Last 7 days including today
        to: endOfToday,
      };
    case "30d":
      return {
        from: startOfDay(subDays(today, 29)), // Last 30 days including today
        to: endOfToday,
      };
    case "90d":
      return {
        from: startOfDay(subDays(today, 89)), // Last 90 days including today
        to: endOfToday,
      };
    case "1y":
      return {
        from: startOfDay(subDays(today, 364)), // Last year including today
        to: endOfToday,
      };
    default:
      return {
        from: startOfDay(subDays(today, 29)), // Default to 30 days
        to: endOfToday,
      };
  }
}

/**
 * Check if a date is within a date range
 */
export function isDateInRange(date: Date, dateRange: DateRange): boolean {
  if (!dateRange.from || !dateRange.to)
    return true;

  const targetDate = startOfDay(date);
  const fromDate = startOfDay(dateRange.from);
  const toDate = endOfDay(dateRange.to);

  return (
    (isEqual(targetDate, fromDate) || isAfter(targetDate, fromDate))
    && (isEqual(targetDate, toDate) || isBefore(targetDate, toDate))
  );
}

/**
 * Parse date string in various formats to Date object
 */
export function parseDate(dateString: string): Date {
  // Handle "MMM dd" format (e.g., "Jan 15")
  if (/^[A-Z]{3}\s\d{1,2}$/i.test(dateString)) {
    const currentYear = new Date().getFullYear();
    const fullDateString = `${dateString}, ${currentYear}`;
    return new Date(fullDateString);
  }

  // Handle ISO date strings
  if (dateString.includes("T") || dateString.includes("-")) {
    return parseISO(dateString);
  }

  // Fallback to standard Date parsing
  return new Date(dateString);
}

/**
 * Filter time series data by date range
 */
export function filterTimeSeriesData<T extends { date: string }>(
  data: T[],
  dateRange: DateRange,
): T[] {
  if (!dateRange.from || !dateRange.to)
    return data;

  return data.filter((item) => {
    try {
      const itemDate = parseDate(item.date);
      return isDateInRange(itemDate, dateRange);
    }
    catch (error) {
      console.warn(`Failed to parse date: ${item.date}`, error);
      return false;
    }
  });
}

/**
 * Filter table data by date range using a specific date field
 */
export function filterTableData<T extends Record<string, any>>(
  data: T[],
  dateRange: DateRange,
  dateField: keyof T = "dateCreated",
): T[] {
  if (!dateRange.from || !dateRange.to)
    return data;

  return data.filter((item) => {
    try {
      const itemDate = parseDate(item[dateField] as string);
      return isDateInRange(itemDate, dateRange);
    }
    catch (error) {
      console.warn(`Failed to parse date: ${item[dateField]}`, error);
      return false;
    }
  });
}

/**
 * Calculate metrics from filtered data
 */
export function calculateMetricsFromData(data: any[]): {
  revenue: number;
  users: number;
  conversions: number;
  growthRate: number;
} {
  if (data.length === 0) {
    return { revenue: 0, users: 0, conversions: 0, growthRate: 0 };
  }

  // Calculate totals based on data type
  const revenue = data.reduce((sum, item) => {
    if (typeof item.revenue === "number")
      return sum + item.revenue;
    if (typeof item.value === "number")
      return sum + item.value;
    return sum;
  }, 0);

  const users = data.reduce((sum, item) => {
    if (typeof item.users === "number")
      return sum + item.users;
    if (typeof item.value === "number")
      return sum + item.value;
    return sum;
  }, 0);

  const conversions = data.reduce((sum, item) => {
    if (typeof item.conversions === "number")
      return sum + item.conversions;
    return sum;
  }, 0);

  // Calculate growth rate (simplified - comparing first and last values)
  const firstValue = data[0]?.value || data[0]?.revenue || 0;
  const lastValue = data[data.length - 1]?.value || data[data.length - 1]?.revenue || 0;
  const growthRate = firstValue > 0 ? ((lastValue - firstValue) / firstValue) * 100 : 0;

  return { revenue, users, conversions, growthRate };
}

/**
 * Format date range for display
 */
export function formatDateRange(dateRange: DateRange): string {
  if (!dateRange.from)
    return "Select date range";

  if (!dateRange.to) {
    return format(dateRange.from, "MMM dd, yyyy");
  }

  return `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`;
}
