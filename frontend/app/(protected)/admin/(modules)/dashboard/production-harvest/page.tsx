import { FlowerProductionTrendChart } from "@/components/custom/admin/dashboard/flower-production-trend-chart";
import { PodSetRateChart } from "@/components/custom/admin/dashboard/pod-set-rate-chart";
import { PodProductionTrendChart } from "@/components/custom/admin/dashboard/pod-production-trend-chart";
import { HarvestablePodsTrendChart } from "@/components/custom/admin/dashboard/harvestable-pods-trend-chart";
import { Card } from "@/components/ui/card";
import React from "react";

// Ordered to follow the vanilla production lifecycle:
// Flower Production -> Pollination -> Pod Production -> Harvestable Pods.
// Single responsive grid: 1 column on mobile, 2 columns on desktop (row-major).
function ProductionHarvestPage() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card className="border-primary-button/20 shadow-sm">
        <div className="p-6">
          <FlowerProductionTrendChart />
        </div>
      </Card>

      <Card className="border-primary-button/20 shadow-sm">
        <div className="p-6">
          <PodSetRateChart />
        </div>
      </Card>

      <Card className="border-primary-button/20 shadow-sm">
        <div className="p-6">
          <PodProductionTrendChart />
        </div>
      </Card>

      <Card className="border-primary-button/20 shadow-sm">
        <div className="p-6">
          <HarvestablePodsTrendChart />
        </div>
      </Card>
    </div>
  );
}

export default ProductionHarvestPage;
