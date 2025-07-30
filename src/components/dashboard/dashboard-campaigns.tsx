import { Download } from "lucide-react";

import type { TableRow } from "@/lib/types";

import { DashboardSection } from "@/components/layout/dashboard-layout";
import { CampaignsTable } from "@/components/tables/campaigns-table";
import { Button } from "@/components/ui/button";

type DashboardCampaignsProps = {
  filteredCampaignData: TableRow[];
};

export function DashboardCampaigns({ filteredCampaignData }: DashboardCampaignsProps) {
  return (
    <DashboardSection
      title="Campaign Performance"
      description="Detailed performance metrics for all active campaigns"
      actions={(
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button size="sm">
            Create Campaign
          </Button>
        </div>
      )}
    >
      <CampaignsTable data={filteredCampaignData} />
    </DashboardSection>
  );
}
