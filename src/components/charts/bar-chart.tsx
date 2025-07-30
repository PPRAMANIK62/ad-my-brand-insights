"use client";

import {
  Bar,
  CartesianGrid,
  Cell,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartContainer, ChartTooltip } from "@/components/ui/chart-wrapper";
import { useChartColors } from "@/hooks/use-chart-colors";

type BarChartProps = {
  data: any[];
  dataKey: string;
  xAxisKey?: string;
  color?: string;
  height?: number;
  className?: string;
  showGrid?: boolean;

  colors?: string[];
};

export function BarChart({
  data,
  dataKey,
  xAxisKey = "date",
  color = "hsl(var(--primary))",
  height = 300,
  className,
  showGrid = true,
  colors,
}: BarChartProps) {
  const chartColors = useChartColors();
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
      formatter={value => [formatValue(value), ""]}
    />
  );

  return (
    <ChartContainer height={height} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.gridColor}
              opacity={0.3}
            />
          )}
          <XAxis
            dataKey={xAxisKey}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: chartColors.textColor }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: chartColors.textColor }}
            tickFormatter={formatValue}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey={dataKey}
            radius={[4, 4, 0, 0]}
            fill={color}
          >
            {colors && data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

// Horizontal bar chart
export function HorizontalBarChart({
  data,
  dataKey,
  xAxisKey = "name",
  color = "hsl(var(--primary))",
  height = 300,
  className,
  showGrid = true,
  colors,
}: BarChartProps) {
  const chartColors = useChartColors();
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
      formatter={value => [formatValue(value), ""]}
    />
  );

  return (
    <ChartContainer height={height} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          layout="horizontal"
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.gridColor}
              opacity={0.3}
            />
          )}
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: chartColors.textColor }}
            tickFormatter={formatValue}
          />
          <YAxis
            type="category"
            dataKey={xAxisKey}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: chartColors.textColor }}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey={dataKey}
            radius={[0, 4, 4, 0]}
            fill={color}
          >
            {colors && data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

// Stacked bar chart
type StackedBarChartProps = {
  data: any[];
  bars: Array<{
    dataKey: string;
    color: string;
    name: string;
  }>;
  xAxisKey?: string;
  height?: number;
  className?: string;
  showGrid?: boolean;
};

export function StackedBarChart({
  data,
  bars,
  xAxisKey = "date",
  height = 300,
  className,
  showGrid = true,
}: StackedBarChartProps) {
  const chartColors = useChartColors();
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

  return (
    <ChartContainer height={height} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.gridColor}
              opacity={0.3}
            />
          )}
          <XAxis
            dataKey={xAxisKey}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: chartColors.textColor }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: chartColors.textColor }}
            tickFormatter={formatValue}
          />
          <Tooltip content={<CustomTooltip />} />
          {bars.map(bar => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              stackId="stack"
              fill={bar.color}
              radius={[2, 2, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
