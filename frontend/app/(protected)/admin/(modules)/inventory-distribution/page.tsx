"use client";

import AdminCustomTabs from "@/components/custom/admin/admin-custom-tabs";
import Customer from "@/components/custom/admin/inventory&distribution/customer";
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
  { id: "customer", value: "Customer" },
];

export default function InventoryAndWarehouses() {
  const [year, setYear] = useState("2026");
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <SelectYearCard
        title="Inventory And WareHouse"
        year={year}
        onYearChange={setYear}
      />

      <div className="px-10 py-6">
        <AdminCustomTabs
          tabs={inventoryAndWarehouseTabs}
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsContent value="overview">
            <div className="py-6">
              <StockOverviewCards />

              <div className="my-6 grid grid-cols-2 gap-6">
                <GradeGraph />
                <GradeSummary />
              </div>

              <div className="">
                <StockMovementGraph />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="warehouse">
            <div className="">
              <WarehouseCard />
            </div>
            <div className="py-6">
              <h2 className="text-lg font-normal text-gray-900">
                <WareHouse />
              </h2>

              <div className="py-6">
                <WarehouseTable />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="distribution">
            <InventorySaleForm />
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-6 py-6">
              <DistributionHistory />
              <DistributionTable />
            </div>
          </TabsContent>

          <TabsContent value="customer">
            <div className="space-y-6 py-6">
              <Customer />
            </div>
          </TabsContent>
        </AdminCustomTabs>
      </div>
    </>
  );
}
