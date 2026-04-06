"use client";

import AdminCustomTabs from "@/components/custom/admin/admin-custom-tabs";
import DistributionHistory from "@/components/custom/admin/distribution-history";
import InventorySaleForm from "@/components/custom/admin/inventory-sale-form";
import SelectYearCard from "@/components/custom/admin/select-year-card";
import WareHouse from "@/components/custom/admin/warehouse";
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
      <h1>Inventory and Warehouses</h1>

      {activeTab === "overview" && (
        <SelectYearCard
          title="Inventory And WareHouse"
          year={year}
          onYearChange={setYear}
        />
      )}

      <div className="mt-4">Current year: {year}</div>

      <AdminCustomTabs
        tabs={inventoryAndWarehouseTabs}
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsContent value="overview">
          <div>Overview UI here</div>
        </TabsContent>
        
        <TabsContent value="warehouse">
          <WareHouse />
        </TabsContent>

        <TabsContent value="distribution">
          <InventorySaleForm />
        </TabsContent>

        <TabsContent value="history">
          <DistributionHistory />
        </TabsContent>
      </AdminCustomTabs>
    </>
  );
}
