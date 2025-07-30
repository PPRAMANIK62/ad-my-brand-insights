import { format, subDays } from "date-fns";

// Types for our analytics data
export type MetricCard = {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: "increase" | "decrease";
  icon: string;
  description: string;
};

export type ChartDataPoint = {
  date: string;
  value: number;
  label?: string;
};

export type RevenueData = {
  revenue: number;
  profit: number;
  expenses: number;
} & ChartDataPoint;

export type UserData = {
  users: number;
  newUsers: number;
  returningUsers: number;
} & ChartDataPoint;

export type ConversionData = {
  channel: string;
  conversions: number;
  rate: number;
  revenue: number;
  color: string;
};

export type TableRow = {
  id: string;
  campaign: string;
  channel: string;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  ctr: number;
  conversionRate: number;
  roas: number;
  status: "active" | "paused" | "completed";
  dateCreated: string;
};

// Generate realistic time-series data
function generateTimeSeriesData(days: number, baseValue: number, variance: number = 0.2) {
  const data: ChartDataPoint[] = [];

  for (let i = days; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const randomFactor = 1 + (Math.random() - 0.5) * variance;
    const value = Math.round(baseValue * randomFactor);

    data.push({
      date: format(date, "MMM dd"),
      value,
    });
  }

  return data;
}

// Mock Metrics Cards Data
export const metricsCards: MetricCard[] = [
  {
    id: "revenue",
    title: "Total Revenue",
    value: "$847,392",
    change: 12.5,
    changeType: "increase",
    icon: "DollarSign",
    description: "Total revenue this month",
  },
  {
    id: "users",
    title: "Active Users",
    value: "24,891",
    change: 8.2,
    changeType: "increase",
    icon: "Users",
    description: "Monthly active users",
  },
  {
    id: "conversions",
    title: "Conversions",
    value: "3,247",
    change: -2.1,
    changeType: "decrease",
    icon: "Target",
    description: "Total conversions this month",
  },
  {
    id: "growth",
    title: "Growth Rate",
    value: "15.3%",
    change: 4.7,
    changeType: "increase",
    icon: "TrendingUp",
    description: "Month-over-month growth",
  },
];

// Revenue Chart Data (30 days)
export const revenueChartData: RevenueData[] = Array.from({ length: 30 }, (_, i) => {
  const date = subDays(new Date(), 29 - i);
  const baseRevenue = 25000 + Math.random() * 10000;
  const expenses = baseRevenue * (0.6 + Math.random() * 0.2);

  return {
    date: format(date, "MMM dd"),
    value: Math.round(baseRevenue),
    revenue: Math.round(baseRevenue),
    profit: Math.round(baseRevenue - expenses),
    expenses: Math.round(expenses),
  };
});

// User Analytics Data (30 days)
export const userChartData: UserData[] = Array.from({ length: 30 }, (_, i) => {
  const date = subDays(new Date(), 29 - i);
  const totalUsers = 800 + Math.random() * 400;
  const newUsers = totalUsers * (0.3 + Math.random() * 0.2);

  return {
    date: format(date, "MMM dd"),
    value: Math.round(totalUsers),
    users: Math.round(totalUsers),
    newUsers: Math.round(newUsers),
    returningUsers: Math.round(totalUsers - newUsers),
  };
});

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

// Campaign Performance Table Data
// Generate recent dates for campaigns to work with date filtering
function generateRecentCampaignData(): TableRow[] {
  const campaigns = [
    {
      id: "1",
      campaign: "Summer Sale 2024",
      channel: "Google Ads",
      impressions: 125000,
      clicks: 4750,
      conversions: 189,
      revenue: 47250,
      ctr: 3.8,
      conversionRate: 3.98,
      roas: 4.2,
      status: "active" as const,
      daysAgo: 5,
    },
    {
      id: "2",
      campaign: "Brand Awareness Q3",
      channel: "Facebook Ads",
      impressions: 89000,
      clicks: 2670,
      conversions: 78,
      revenue: 19500,
      ctr: 3.0,
      conversionRate: 2.92,
      roas: 3.1,
      status: "active" as const,
      daysAgo: 12,
    },
    {
      id: "3",
      campaign: "Product Launch",
      channel: "Instagram",
      impressions: 67000,
      clicks: 2814,
      conversions: 118,
      revenue: 29500,
      ctr: 4.2,
      conversionRate: 4.19,
      roas: 5.8,
      status: "completed" as const,
      daysAgo: 25,
    },
    {
      id: "4",
      campaign: "B2B Lead Gen",
      channel: "LinkedIn",
      impressions: 34000,
      clicks: 1734,
      conversions: 89,
      revenue: 26700,
      ctr: 5.1,
      conversionRate: 5.13,
      roas: 6.2,
      status: "active" as const,
      daysAgo: 8,
    },
    {
      id: "5",
      campaign: "Retargeting Campaign",
      channel: "Google Ads",
      impressions: 45000,
      clicks: 1800,
      conversions: 72,
      revenue: 18000,
      ctr: 4.0,
      conversionRate: 4.0,
      roas: 3.6,
      status: "paused" as const,
      daysAgo: 18,
    },
    {
      id: "6",
      campaign: "Holiday Promo",
      channel: "Facebook Ads",
      impressions: 78000,
      clicks: 3120,
      conversions: 156,
      revenue: 39000,
      ctr: 4.0,
      conversionRate: 5.0,
      roas: 4.5,
      status: "active" as const,
      daysAgo: 3,
    },
    {
      id: "7",
      campaign: "Mobile App Install",
      channel: "Instagram",
      impressions: 92000,
      clicks: 4600,
      conversions: 230,
      revenue: 23000,
      ctr: 5.0,
      conversionRate: 5.0,
      roas: 3.8,
      status: "active" as const,
      daysAgo: 15,
    },
  ];

  return campaigns.map(campaign => ({
    ...campaign,
    dateCreated: format(subDays(new Date(), campaign.daysAgo), "yyyy-MM-dd"),
  }));
}

export const campaignTableData: TableRow[] = generateRecentCampaignData();

// Additional chart data for different time periods
export const weeklyData = generateTimeSeriesData(7, 5000, 0.3);
export const monthlyData = generateTimeSeriesData(30, 25000, 0.2);
export const quarterlyData = generateTimeSeriesData(90, 750000, 0.15);

// Performance metrics over time
export const performanceMetrics = {
  ctr: generateTimeSeriesData(30, 3.5, 0.4),
  conversionRate: generateTimeSeriesData(30, 4.2, 0.3),
  roas: generateTimeSeriesData(30, 4.8, 0.25),
};
