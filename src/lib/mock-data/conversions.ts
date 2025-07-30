import type { ConversionData } from "@/lib/types";

/**
 * Mock data for conversion analytics
 */

// Conversion by Channel Data
export const conversionData: ConversionData[] = [
  {
    channel: "Google Ads",
    conversions: 1247,
    rate: 3.8,
    revenue: 324500,
    color: "#4285f4",
  },
  {
    channel: "Facebook Ads",
    conversions: 892,
    rate: 2.9,
    revenue: 198700,
    color: "#1877f2",
  },
  {
    channel: "Instagram",
    conversions: 634,
    rate: 4.2,
    revenue: 156800,
    color: "#e4405f",
  },
  {
    channel: "LinkedIn",
    conversions: 298,
    rate: 5.1,
    revenue: 89400,
    color: "#0077b5",
  },
  {
    channel: "Twitter",
    conversions: 176,
    rate: 2.3,
    revenue: 47900,
    color: "#1da1f2",
  },
];
