"use client";

import { motion } from "framer-motion";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type ChartWrapperProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  actions?: React.ReactNode;
};

export function ChartWrapper({
  title,
  description,
  children,
  className,
  loading = false,
  actions,
}: ChartWrapperProps) {
  if (loading) {
    return (
      <Card className={cn("", className)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              {description && <Skeleton className="h-4 w-48" />}
            </div>
            {actions && <Skeleton className="h-8 w-24" />}
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      <Card className="transition-all duration-200 hover:shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              {description && (
                <CardDescription className="text-sm text-muted-foreground">
                  {description}
                </CardDescription>
              )}
            </div>
            {actions && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {actions}
              </motion.div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {children}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Chart container with responsive height
export function ChartContainer({
  children,
  className,
  height = 300,
}: {
  children: React.ReactNode;
  className?: string;
  height?: number;
}) {
  return (
    <div
      className={cn("w-full", className)}
      style={{ height: `${height}px` }}
    >
      {children}
    </div>
  );
}

// Loading skeleton for charts
export function ChartSkeleton({
  height = 300,
  className,
}: {
  height?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
      <Skeleton className="w-full" style={{ height: `${height}px` }} />
    </div>
  );
}

// Chart legend component
export function ChartLegend({
  items,
  className,
}: {
  items: Array<{ label: string; color: string; value?: string | number }>;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-4 mt-4", className)}>
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center space-x-2"
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-muted-foreground">{item.label}</span>
          {item.value && (
            <span className="text-sm font-medium">{item.value}</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// Chart tooltip wrapper
export function ChartTooltip({
  active,
  payload,
  label,
  formatter,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
  formatter?: (value: any, name: string) => [string, string];
}) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-background border border-border rounded-lg shadow-lg p-3"
    >
      {label && (
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
      )}
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-muted-foreground">
              {entry.name}
              :
            </span>
            <span className="text-sm font-medium">
              {formatter ? formatter(entry.value, entry.name)[0] : entry.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
