import { Badge } from "@/components/ui/badge";
import { formatPercentage } from "@/lib/formatters";

/**
 * Reusable cell components for campaign table
 */

// Status badge component
export function StatusBadge({ status }: { status: string }) {
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
export function ChannelBadge({ channel }: { channel: string }) {
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
export function PerformanceIndicator({ value, threshold }: { value: number; threshold: number }) {
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
