import { ProductionMetricChart } from "@/components/custom/admin/dashboard/production-metric-chart";
import { FlowerProductionChart } from "@/components/custom/admin/dashboard/flower-production-chart";
import { InflorescenceDamageChart } from "@/components/custom/admin/dashboard/inflorescence-damage-chart";
import KPICard from "@/components/custom/admin/dashboard/kpi-card";
import { Card } from "@/components/ui/card";
import React from "react";
import { Flower, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

function OverviewPage() {
  const currentYear = new Date().getFullYear();

  // Mock KPI data for current year
  const kpiData = [
    {
      title: "Total Flowers",
      value: "32,000",
      icon: Flower,
      description: "Cumulative flower count",
    },
    {
      title: "Yield %",
      value: "78",
      unit: "%",
      icon: TrendingUp,
      trend: { value: 5, isPositive: true },
    },
    {
      title: "Flower Loss %",
      value: "14",
      unit: "%",
      icon: AlertTriangle,
      trend: { value: 2, isPositive: false },
    },
    {
      title: "Pod Success %",
      value: "69",
      unit: "%",
      icon: CheckCircle2,
      trend: { value: 3, isPositive: true },
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Section with Header */}
      <Card className="border-primary-button/20 bg-secondary shadow-sm">
        <div className="p-4">
          {/* Year Header */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {currentYear} Performance
            </h3>
            <p className="text-sm text-gray-600">Current year metrics</p>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpiData.map((kpi) => (
              <KPICard
                key={kpi.title}
                title={kpi.title}
                value={kpi.value}
                unit={kpi.unit}
                icon={kpi.icon}
                trend={kpi.trend}
                description={kpi.description}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Charts Section */}
      <div className="mt-8 space-y-8">
        {/* Inflorescence Damage Chart - Full Width */}
        <Card className="border-primary-button/20 shadow-sm">
          <div className="p-6">
            <InflorescenceDamageChart />
          </div>
        </Card>

        {/* Flower Production and Pod Overview - Side by Side */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="border-primary-button/20 bg-secondary shadow-sm">
            <div className="p-6">
              <FlowerProductionChart />
            </div>
          </Card>

          <Card className="border-primary-button/20 bg-secondary shadow-sm">
            <div className="p-6">
              <ProductionMetricChart />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
