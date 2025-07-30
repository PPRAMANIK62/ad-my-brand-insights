"use client";

import { motion } from "framer-motion";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DollarSign,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MetricsCardProps = {
  title: string;
  value: string | number;
  change: number;
  changeType: "increase" | "decrease";
  icon: string;
  description?: string;
  className?: string;
  loading?: boolean;
};

const iconMap = {
  DollarSign,
  Users,
  Target,
  TrendingUp,
  TrendingDown,
};

export function MetricsCard({
  title,
  value,
  change,
  changeType,
  icon,
  description,
  className,
  loading = false,
}: MetricsCardProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || TrendingUp;
  const isPositive = changeType === "increase";

  if (loading) {
    return (
      <Card className={cn("relative overflow-hidden", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
          </CardTitle>
          <div className="h-4 w-4 bg-muted animate-pulse rounded" />
        </CardHeader>
        <CardContent>
          <div className="h-8 w-32 bg-muted animate-pulse rounded mb-2" />
          <div className="h-3 w-20 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      className={className}
    >
      <Card className="relative overflow-hidden transition-all duration-200 hover:shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />

        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <IconComponent className="h-4 w-4 text-muted-foreground" />
          </motion.div>
        </CardHeader>

        <CardContent>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-2xl font-bold tracking-tight"
          >
            {value}
          </motion.div>

          <div className="flex items-center space-x-2 mt-2">
            <Badge
              variant={isPositive ? "default" : "destructive"}
              className={cn(
                "flex items-center space-x-1 text-xs",
                isPositive
                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
              )}
            >
              {isPositive
                ? (
                    <ArrowUpIcon className="h-3 w-3" />
                  )
                : (
                    <ArrowDownIcon className="h-3 w-3" />
                  )}
              <span>
                {Math.abs(change)}
                %
              </span>
            </Badge>

            {description && (
              <p className="text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Skeleton component for loading state
export function MetricsCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="h-4 w-24 bg-muted animate-pulse rounded" />
        <div className="h-4 w-4 bg-muted animate-pulse rounded" />
      </CardHeader>
      <CardContent>
        <div className="h-8 w-32 bg-muted animate-pulse rounded mb-2" />
        <div className="flex items-center space-x-2">
          <div className="h-5 w-12 bg-muted animate-pulse rounded" />
          <div className="h-3 w-20 bg-muted animate-pulse rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

// Grid container for metrics cards
export function MetricsGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(
      "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
      className,
    )}
    >
      {children}
    </div>
  );
}
