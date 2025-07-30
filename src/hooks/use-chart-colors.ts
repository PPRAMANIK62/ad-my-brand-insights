"use client";

import { useTheme } from "next-themes";

/**
 * Custom hook to provide theme-aware colors for chart components
 * This ensures proper text visibility in both light and dark modes
 */
export function useChartColors() {
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return {
    // Text colors for axis labels and ticks
    textColor: isDark ? "#9CA3AF" : "#6B7280", // gray-400 in dark, gray-500 in light
    mutedTextColor: isDark ? "#6B7280" : "#9CA3AF", // gray-500 in dark, gray-400 in light

    // Grid and border colors
    gridColor: isDark ? "#374151" : "#E5E7EB", // gray-700 in dark, gray-200 in light
    borderColor: isDark ? "#4B5563" : "#D1D5DB", // gray-600 in dark, gray-300 in light

    // Background colors for tooltips and overlays
    backgroundColor: isDark ? "#1F2937" : "#FFFFFF", // gray-800 in dark, white in light
    foregroundColor: isDark ? "#F9FAFB" : "#111827", // gray-50 in dark, gray-900 in light
  };
}
