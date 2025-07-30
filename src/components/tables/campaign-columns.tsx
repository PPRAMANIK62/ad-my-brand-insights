import type { ColumnDef } from "@tanstack/react-table";

import { format } from "date-fns";
import { Edit, Eye, MoreHorizontal, Pause, Play, Trash2 } from "lucide-react";

import type { TableRow } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { SortableHeader } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency, formatNumber } from "@/lib/formatters";

import { ChannelBadge, PerformanceIndicator, StatusBadge } from "./campaign-cell-components";

/**
 * Column definitions for campaigns table
 */

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
