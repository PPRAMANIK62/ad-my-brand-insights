"use client";

import { motion } from "framer-motion";
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { ChartContainer, ChartLegend } from "@/components/ui/chart-wrapper";

type PieChartProps = {
  data: any[];
  dataKey: string;
  nameKey: string;
  height?: number;
  className?: string;
  colors?: string[];
  showLegend?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  animate?: boolean;
};

const DEFAULT_COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#00ff00",
];

export function PieChart({
  data,
  dataKey,
  nameKey,
  height = 300,
  className,
  colors = DEFAULT_COLORS,
  showLegend = true,
  innerRadius = 0,
  outerRadius = 80,
}: PieChartProps) {
  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toLocaleString();
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length)
      return null;

    const data = payload[0];
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-background border border-border rounded-lg shadow-lg p-3"
      >
        <p className="text-sm font-medium text-foreground">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          Value:
          {" "}
          <span className="font-medium">{formatValue(data.value)}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Percentage:
          {" "}
          <span className="font-medium">
            {data.payload.percentage?.toFixed(1)}
            %
          </span>
        </p>
      </motion.div>
    );
  };

  // Calculate percentages
  const total = data.reduce((sum, item) => sum + item[dataKey], 0);
  const dataWithPercentage = data.map(item => ({
    ...item,
    percentage: (item[dataKey] / total) * 100,
  }));

  const legendItems = dataWithPercentage.map((item, index) => ({
    label: item[nameKey],
    color: colors[index % colors.length],
    value: formatValue(item[dataKey]),
  }));

  return (
    <div className={className}>
      <ChartContainer height={height}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={dataWithPercentage}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={2}
              dataKey={dataKey}
              nameKey={nameKey}
            >
              {dataWithPercentage.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </RechartsPieChart>
        </ResponsiveContainer>
      </ChartContainer>

      {showLegend && (
        <ChartLegend items={legendItems} className="justify-center" />
      )}
    </div>
  );
}

// Donut chart (pie chart with inner radius)
export function DonutChart({
  data,
  dataKey,
  nameKey,
  height = 300,
  className,
  colors = DEFAULT_COLORS,
  showLegend = true,
  animate = true,
}: Omit<PieChartProps, "innerRadius" | "outerRadius">) {
  return (
    <PieChart
      data={data}
      dataKey={dataKey}
      nameKey={nameKey}
      height={height}
      className={className}
      colors={colors}
      showLegend={showLegend}
      innerRadius={60}
      outerRadius={100}
      animate={animate}
    />
  );
}

// Semi-circle chart
export function SemiCircleChart({
  data,
  dataKey,
  nameKey,
  height = 200,
  className,
  colors = DEFAULT_COLORS,
  showLegend = true,
}: Omit<PieChartProps, "innerRadius" | "outerRadius" | "animate">) {
  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toLocaleString();
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length)
      return null;

    const data = payload[0];
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-background border border-border rounded-lg shadow-lg p-3"
      >
        <p className="text-sm font-medium text-foreground">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          Value:
          {" "}
          <span className="font-medium">{formatValue(data.value)}</span>
        </p>
      </motion.div>
    );
  };

  const legendItems = data.map((item, index) => ({
    label: item[nameKey],
    color: colors[index % colors.length],
    value: formatValue(item[dataKey]),
  }));

  return (
    <div className={className}>
      <ChartContainer height={height}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="80%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey={dataKey}
              nameKey={nameKey}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </RechartsPieChart>
        </ResponsiveContainer>
      </ChartContainer>

      {showLegend && (
        <ChartLegend items={legendItems} className="justify-center mt-2" />
      )}
    </div>
  );
}
