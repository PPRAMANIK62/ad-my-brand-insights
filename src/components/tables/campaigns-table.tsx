"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { format } from "date-fns";
import { Edit, Eye, MoreHorizontal, Pause, Play, Trash2 } from "lucide-react";

import type { TableRow } from "@/lib/mock-data";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable, SortableHeader } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Format currency
function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

// Format percentage
function formatPercentage(value: number) {
  return `${value.toFixed(2)}%`;
}

// Format number with commas
function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const variants = {
    active: "default",
    paused: "secondary",
    completed: "outline",
  } as const;

  const colors = {
    active: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    paused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    completed: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  };

  return (
    <Badge
      variant={variants[status as keyof typeof variants]}
      className={colors[status as keyof typeof colors]}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

// Channel badge component
function ChannelBadge({ channel }: { channel: string }) {
  const colors = {
    "Google Ads": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    "Facebook Ads": "bg-blue-600 text-white dark:bg-blue-600",
    "Instagram": "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400",
    "LinkedIn": "bg-blue-700 text-white dark:bg-blue-700",
    "Twitter": "bg-sky-100 text-sky-800 dark:bg-sky-900/20 dark:text-sky-400",
  };

  return (
    <Badge
      variant="outline"
      className={colors[channel as keyof typeof colors] || "bg-gray-100 text-gray-800"}
    >
      {channel}
    </Badge>
  );
}

// Performance indicator component
function PerformanceIndicator({ value, threshold }: { value: number; threshold: number }) {
  const isGood = value >= threshold;
  return (
    <div className="flex items-center space-x-2">
      <span className={isGood ? "text-green-600" : "text-red-600"}>
        {formatPercentage(value)}
      </span>
      <div className={`w-2 h-2 rounded-full ${isGood ? "bg-green-500" : "bg-red-500"}`} />
    </div>
  );
}

// Table columns definition
export const campaignColumns: ColumnDef<TableRow>[] = [
  {
    accessorKey: "campaign",
    header: ({ column }) => (
      <SortableHeader column={column}>Campaign</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("campaign")}</div>
    ),
  },
  {
    accessorKey: "channel",
    header: "Channel",
    cell: ({ row }) => (
      <ChannelBadge channel={row.getValue("channel")} />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge status={row.getValue("status")} />
    ),
  },
  {
    accessorKey: "impressions",
    header: ({ column }) => (
      <SortableHeader column={column}>Impressions</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="text-right font-mono">
        {formatNumber(row.getValue("impressions"))}
      </div>
    ),
  },
  {
    accessorKey: "clicks",
    header: ({ column }) => (
      <SortableHeader column={column}>Clicks</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="text-right font-mono">
        {formatNumber(row.getValue("clicks"))}
      </div>
    ),
  },
  {
    accessorKey: "ctr",
    header: ({ column }) => (
      <SortableHeader column={column}>CTR</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="text-right">
        <PerformanceIndicator value={row.getValue("ctr")} threshold={3.0} />
      </div>
    ),
  },
  {
    accessorKey: "conversions",
    header: ({ column }) => (
      <SortableHeader column={column}>Conversions</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="text-right font-mono">
        {formatNumber(row.getValue("conversions"))}
      </div>
    ),
  },
  {
    accessorKey: "conversionRate",
    header: ({ column }) => (
      <SortableHeader column={column}>Conv. Rate</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="text-right">
        <PerformanceIndicator value={row.getValue("conversionRate")} threshold={3.5} />
      </div>
    ),
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => (
      <SortableHeader column={column}>Revenue</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="text-right font-mono font-medium">
        {formatCurrency(row.getValue("revenue"))}
      </div>
    ),
  },
  {
    accessorKey: "roas",
    header: ({ column }) => (
      <SortableHeader column={column}>ROAS</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="text-right">
        <PerformanceIndicator value={row.getValue("roas")} threshold={4.0} />
      </div>
    ),
  },
  {
    accessorKey: "dateCreated",
    header: ({ column }) => (
      <SortableHeader column={column}>Created</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {format(new Date(row.getValue("dateCreated")), "MMM dd, yyyy")}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const campaign = row.original;
      const isActive = campaign.status === "active";

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit campaign
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {isActive
                ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" />
                      Pause campaign
                    </>
                  )
                : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Resume campaign
                    </>
                  )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete campaign
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

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
