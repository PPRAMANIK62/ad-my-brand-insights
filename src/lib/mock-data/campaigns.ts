import { format, getMonth, subDays } from "date-fns";

import type { TableRow } from "@/lib/types";

import { generateCampaignMetrics, getSeasonalMultiplier } from "@/lib/data-generators";

/**
 * Mock data for campaign analytics
 */

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

// Generate comprehensive yearly campaign data
function generateYearlyCampaignData(): TableRow[] {
  const channels = ["Google Ads", "Facebook Ads", "Instagram", "LinkedIn", "Twitter", "TikTok", "YouTube"];
  const campaignTypes = [
    // Seasonal campaigns
    { name: "New Year Resolution", season: "winter", duration: 14 },
    { name: "Valentine's Day Special", season: "winter", duration: 10 },
    { name: "Spring Launch", season: "spring", duration: 21 },
    { name: "Easter Promotion", season: "spring", duration: 7 },
    { name: "Mother's Day Campaign", season: "spring", duration: 14 },
    { name: "Summer Sale", season: "summer", duration: 30 },
    { name: "Father's Day Special", season: "summer", duration: 10 },
    { name: "Back to School", season: "summer", duration: 28 },
    { name: "Labor Day Weekend", season: "summer", duration: 5 },
    { name: "Halloween Special", season: "fall", duration: 14 },
    { name: "Black Friday", season: "fall", duration: 7 },
    { name: "Cyber Monday", season: "fall", duration: 3 },
    { name: "Holiday Season", season: "winter", duration: 45 },
    { name: "Christmas Special", season: "winter", duration: 21 },
    { name: "Year End Clearance", season: "winter", duration: 10 },

    // Ongoing campaigns
    { name: "Brand Awareness", season: "all", duration: 90 },
    { name: "Retargeting Campaign", season: "all", duration: 60 },
    { name: "Lead Generation", season: "all", duration: 45 },
    { name: "Product Launch", season: "all", duration: 30 },
    { name: "Customer Retention", season: "all", duration: 120 },
    { name: "Mobile App Install", season: "all", duration: 75 },
    { name: "Video Marketing", season: "all", duration: 60 },
    { name: "Influencer Collaboration", season: "all", duration: 30 },
  ];

  const campaigns: TableRow[] = [];
  let campaignId = 1;

  // Generate campaigns throughout the year
  for (let dayOffset = 364; dayOffset >= 0; dayOffset -= Math.floor(Math.random() * 7) + 3) {
    const startDate = subDays(new Date(), dayOffset);
    const month = getMonth(startDate);

    // Determine season
    let season = "spring";
    if (month >= 11 || month <= 1)
      season = "winter";
    else if (month >= 2 && month <= 4)
      season = "spring";
    else if (month >= 5 && month <= 7)
      season = "summer";
    else if (month >= 8 && month <= 10)
      season = "fall";

    // Select appropriate campaign types for the season
    const availableCampaigns = campaignTypes.filter(
      ct => ct.season === season || ct.season === "all",
    );

    if (availableCampaigns.length === 0)
      continue;

    const campaignType = availableCampaigns[Math.floor(Math.random() * availableCampaigns.length)];
    const channel = channels[Math.floor(Math.random() * channels.length)];

    // Generate realistic performance metrics based on channel and season
    const seasonalMultiplier = getSeasonalMultiplier(startDate);
    const baseImpressions = Math.floor((50000 + Math.random() * 100000) * seasonalMultiplier);
    const metrics = generateCampaignMetrics(channel);
    const clicks = Math.floor(baseImpressions * (metrics.ctr / 100));
    const conversions = Math.floor(clicks * (metrics.conversionRate / 100));
    const avgOrderValue = 150 + Math.random() * 200; // $150-350 AOV
    const revenue = Math.floor(conversions * avgOrderValue);

    // Determine campaign status based on how long ago it started
    let status: "active" | "paused" | "completed" = "completed";
    if (dayOffset <= 30)
      status = "active";
    else if (dayOffset <= 60 && Math.random() > 0.7)
      status = "paused";

    campaigns.push({
      id: campaignId.toString(),
      campaign: `${campaignType.name} ${new Date().getFullYear()}`,
      channel,
      impressions: baseImpressions,
      clicks,
      conversions,
      revenue,
      ctr: metrics.ctr,
      conversionRate: metrics.conversionRate,
      roas: metrics.roas,
      status,
      dateCreated: format(startDate, "yyyy-MM-dd"),
    });

    campaignId++;

    // Limit total campaigns to prevent too much data
    if (campaigns.length >= 85)
      break;
  }

  return campaigns.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
}

export const yearlyCampaignData: TableRow[] = generateYearlyCampaignData();
