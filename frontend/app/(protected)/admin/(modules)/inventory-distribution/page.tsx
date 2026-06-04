"use client";

import AdminCustomTabs from "@/components/custom/admin/admin-custom-tabs";
import DistributionHistory from "@/components/custom/admin/inventory&distribution/distribution-history";
import DistributionTable from "@/components/custom/admin/inventory&distribution/distribution-tabel";
import GradeGraph from "@/components/custom/admin/inventory&distribution/grade-graph";
import GradeSummary from "@/components/custom/admin/inventory&distribution/grade-summary-card";
import InventorySaleForm from "@/components/custom/admin/inventory&distribution/inventory-sale-form";
import SelectYearCard from "@/components/custom/admin/inventory&distribution/select-year-card";
import StockMovementGraph from "@/components/custom/admin/inventory&distribution/stock-movement-graph";
import StockOverviewCards from "@/components/custom/admin/inventory&distribution/stock-overview-card";
import WareHouse from "@/components/custom/admin/inventory&distribution/warehouse";
import WarehouseCard from "@/components/custom/admin/inventory&distribution/warehouse-card";
import WarehouseTable from "@/components/custom/admin/inventory&distribution/warehouse-table";
import { TabsContent } from "@/components/ui/tabs";
import { Option } from "@/lib/types/model/option";
import { useState } from "react";

const inventoryAndWarehouseTabs: Option[] = [
  { id: "overview", value: "Stock Overview" },
  { id: "warehouse", value: "Warehouse" },
  { id: "distribution", value: "Stock Distribution" },
  { id: "history", value: "Distribution History" },
];

export default function InventoryAndWarehouses() {
  const [year, setYear] = useState("2026");
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <StockOverviewCards />

      <div className="my-6 grid grid-cols-2 gap-6">

        <GradeGraph />

        <GradeSummary />

      </div>

      <StockMovementGraph />
    </>
  );
}
