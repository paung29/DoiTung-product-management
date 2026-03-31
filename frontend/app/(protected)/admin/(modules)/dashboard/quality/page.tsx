import { DriedQuantityChart } from "@/components/custom/admin/dashboard/dried-quantity-chart";
import React from "react";
import { Card } from "@/components/ui/card";
import { DriedVsFreshChart } from "@/components/custom/admin/dashboard/dried-vs-fresh-chart";

function QualityPage() {
  return (
    <div className="space-y-6 p-6">
      <Card className="border-primary-button/20 p-6 shadow-sm">
        <DriedQuantityChart />
      </Card>

      <Card className="border-primary-button/20 p-6 shadow-sm">
        <DriedVsFreshChart />
      </Card>
    </div>
  );
}

export default QualityPage;
