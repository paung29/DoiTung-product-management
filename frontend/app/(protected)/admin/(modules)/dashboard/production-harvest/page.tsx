import { PodSetRateChart } from "@/components/custom/admin/dashboard/pod-set-rate-chart";
import { NumberHarvestablePodChart } from "@/components/custom/admin/dashboard/number-harvestable-pod-chart";
import { FreshPodChart } from "@/components/custom/admin/dashboard/fresh-pod-chart";
import { ProductivePolesChart } from "@/components/custom/admin/dashboard/productive-poles-chart";
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
            <NumberHarvestablePodChart />
          </div>
        </Card>
      </div>

      {/* Fresh Pod Quantity and Productive Poles - Side by Side */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="border-primary-button/20 shadow-sm">
          <div className="p-6">
            <FreshPodChart />
          </div>
        </Card>

        <Card className="border-primary-button/20 shadow-sm">
          <div className="p-6">
            <ProductivePolesChart />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ProductionHarvestPage;
