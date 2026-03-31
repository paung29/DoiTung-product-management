import React from "react";
import { Card } from "@/components/ui/card";
import { ActualYieldChart } from "@/components/custom/admin/dashboard/actual-yield-chart";
import { TargetVsActualYieldChart } from "@/components/custom/admin/dashboard/target-vs-actual-yield-chart";
import { WeightPerPodChart } from "@/components/custom/admin/dashboard/weight-per-pod-chart";

function YieldEfficiencyPage() {
  return (
    <div className="space-y-6 p-6">
      <Card className="border-primary-button/20 p-6 shadow-sm">
        <WeightPerPodChart />
      </Card>

      {/* Charts Grid Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Actual Yield Chart */}
        <Card className="border-primary-button/20 p-6 shadow-sm">
          <ActualYieldChart />
        </Card>

        {/* Target vs Actual Yield Chart */}
        <Card className="border-primary-button/20 p-6 shadow-sm">
          <TargetVsActualYieldChart />
        </Card>
      </div>
    </div>
  );
}

export default YieldEfficiencyPage;
