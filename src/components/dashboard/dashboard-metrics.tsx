import type { MetricCard } from "@/lib/types";

import { DashboardSection } from "@/components/layout/dashboard-layout";
import { MetricsCard, MetricsGrid } from "@/components/ui/metrics-card";

type DashboardMetricsProps = {
  metrics: MetricCard[];
};

export function DashboardMetrics({ metrics }: DashboardMetricsProps) {
  return (
    <DashboardSection
      title="Key Metrics"
      description="Overview of your most important performance indicators"
    >
      <MetricsGrid>
        {metrics.map(metric => (
          <MetricsCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            icon={metric.icon}
            description={metric.description}
          />
        ))}
      </MetricsGrid>
    </DashboardSection>
  );
}
