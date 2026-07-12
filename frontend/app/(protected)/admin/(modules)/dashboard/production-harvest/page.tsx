import { PodSetRateChart } from "@/components/custom/admin/dashboard/pod-set-rate-chart";
import { HarvestablePodsTrendChart } from "@/components/custom/admin/dashboard/harvestable-pods-trend-chart";
import { FlowerProductionTrendChart } from "@/components/custom/admin/dashboard/flower-production-trend-chart";
import { PodProductionTrendChart } from "@/components/custom/admin/dashboard/pod-production-trend-chart";
import { Card } from "@/components/ui/card";
import React from "react";

function ProductionHarvestPage() {
  return (
    <div className="space-y-6">
      {/* Two Charts Side by Side */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="border-primary-button/20 shadow-sm">
          <div className="p-6">
            <PodSetRateChart />
          </div>
        </Card>

        <Card className="border-primary-button/20 shadow-sm">
          <div className="p-6">
            <HarvestablePodsTrendChart />
          </div>
        </Card>
      </div>

      {/* Flower Production Trend and Productive Poles - Side by Side */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="border-primary-button/20 shadow-sm">
          <div className="p-6">
            <FlowerProductionTrendChart />
          </div>
        </Card>

        <Card className="border-primary-button/20 shadow-sm">
          <div className="p-6">
            <PodProductionTrendChart />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ProductionHarvestPage;
