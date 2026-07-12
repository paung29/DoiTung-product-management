import React from "react";
import { Card } from "@/components/ui/card";
import { ActualYieldChart } from "@/components/custom/admin/dashboard/actual-yield-chart";
import { TargetVsActualYieldChart } from "@/components/custom/admin/dashboard/target-vs-actual-yield-chart";
import { ProductivePolesTrendChart } from "@/components/custom/admin/dashboard/productive-poles-chart";

function YieldEfficiencyPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Top Row: Productive Poles Trend (full-width) */}
      <Card className="border-primary-button/20 p-6 shadow-sm">
        <ProductivePolesTrendChart />
      </Card>

      {/* Bottom Row: two-column responsive grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Average Pod Weight Trend (left) */}
        <Card className="border-primary-button/20 p-6 shadow-sm">
          <ActualYieldChart />
        </Card>

        {/* Actual Yield Trend (right) */}
        <Card className="border-primary-button/20 p-6 shadow-sm">
          <TargetVsActualYieldChart />
        </Card>
      </div>
    </div>
  );
}

export default YieldEfficiencyPage;
