"use client";

import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartContainer, ChartTooltip } from "@/components/ui/chart-wrapper";

type LineChartProps = {
  data: any[];
  dataKey: string;
  xAxisKey?: string;
  color?: string;
  height?: number;
  className?: string;
  showGrid?: boolean;
  showArea?: boolean;
  strokeWidth?: number;
  dot?: boolean;
  animate?: boolean;
};

export function LineChart({
  data,
  dataKey,
  xAxisKey = "date",
  color = "hsl(var(--primary))",
  height = 300,
  className,
  showGrid = true,
  showArea = false,
  strokeWidth = 2,
  dot = false,
  animate = true,
}: LineChartProps) {
  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => (
    <ChartTooltip
      active={active}
      payload={payload}
      label={label}
      formatter={value => [formatValue(value), ""]}
    />
  );

  const ChartComponent = showArea ? AreaChart : RechartsLineChart;

  return (
    <ChartContainer height={height} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.3}
              />
            )}
            <XAxis
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={formatValue}
            />
            <Tooltip content={<CustomTooltip />} />

            {showArea
              ? (
                  <>
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey={dataKey}
                      stroke={color}
                      strokeWidth={strokeWidth}
                      fill="url(#colorGradient)"
                      dot={dot}
                    />
                  </>
                )
              : (
                  <Line
                    type="monotone"
                    dataKey={dataKey}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    dot={dot}
                    activeDot={{ r: 4, fill: color }}
                  />
                )}
        </ChartComponent>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

// Multi-line chart component
type MultiLineChartProps = {
  data: any[];
  lines: Array<{
    dataKey: string;
    color: string;
    name: string;
  }>;
  xAxisKey?: string;
  height?: number;
  className?: string;
  showGrid?: boolean;
  showArea?: boolean;
};

export function MultiLineChart({
  data,
  lines,
  xAxisKey = "date",
  height = 300,
  className,
  showGrid = true,
  showArea = false,
}: MultiLineChartProps) {
  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toLocaleString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => (
    <ChartTooltip
      active={active}
      payload={payload}
      label={label}
      formatter={(value, name) => [formatValue(value), name]}
    />
  );

  const ChartComponent = showArea ? AreaChart : RechartsLineChart;

  return (
    <ChartContainer height={height} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.3}
              />
            )}
            <XAxis
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={formatValue}
            />
            <Tooltip content={<CustomTooltip />} />

            {lines.map((line, index) => (
              showArea
                ? (
                    <Area
                      key={line.dataKey}
                      type="monotone"
                      dataKey={line.dataKey}
                      stackId={index}
                      stroke={line.color}
                      fill={line.color}
                      fillOpacity={0.3}
                    />
                  )
                : (
                    <Line
                      key={line.dataKey}
                      type="monotone"
                      dataKey={line.dataKey}
                      stroke={line.color}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, fill: line.color }}
                    />
                  )
            ))}
        </ChartComponent>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
