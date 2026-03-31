"use client";
import { useSearchParams } from "next/navigation";
import { DashboardTabSelection } from "@/components/custom/admin/dashboard/tab-selection";
import OverviewPage from "./(modules)/dashboard/overview/page";
import ProductionHarvestPage from "./(modules)/dashboard/production-harvest/page";
import YieldEfficiencyPage from "./(modules)/dashboard/yield-efficiency/page";
import QualityPage from "./(modules)/dashboard/quality/page";

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";

  const renderContent = () => {
    switch (currentTab) {
      case "overview":
        return <OverviewPage />;
      case "production":
        return <ProductionHarvestPage />;
      case "yield":
        return <YieldEfficiencyPage />;
      case "quality":
        return <QualityPage />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Tab Selection */}
      <div className="rounded-lg bg-white shadow">
        <DashboardTabSelection />
      </div>

      {/* Content */}
      <div className="bg-overview-bg rounded-lg p-6 shadow">
        {renderContent()}
      </div>
    </div>
  );
}
