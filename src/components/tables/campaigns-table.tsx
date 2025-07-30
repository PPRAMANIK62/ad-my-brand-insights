"use client";

import type { TableRow } from "@/lib/types";

import { DataTable } from "@/components/ui/data-table";

import { campaignColumns } from "./campaign-columns";

// Campaigns table component
type CampaignsTableProps = {
  data: TableRow[];
  className?: string;
};

export function CampaignsTable({ data, className }: CampaignsTableProps) {
  return (
    <DataTable
      columns={campaignColumns}
      data={data}
      searchKey="campaign"
      searchPlaceholder="Search campaigns..."
      className={className}
    />
  );
}
