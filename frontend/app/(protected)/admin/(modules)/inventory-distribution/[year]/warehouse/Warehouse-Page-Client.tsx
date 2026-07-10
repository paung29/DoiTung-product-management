import WareHouse from "@/components/custom/admin/inventory&distribution/warehouse";
import WarehouseCard, { WarehouseCardData } from "@/components/custom/admin/inventory&distribution/warehouse-card";
import WarehouseTable, { WarehouseTableData } from "@/components/custom/admin/inventory&distribution/warehouse-table";

export default function WarehousePage({records, data} : {records : WarehouseTableData[], data : WarehouseCardData}) {
  return (
    // No extra px-* here: the shared inventory layout already applies the
    // horizontal padding, so KPI cards align edge-to-edge with the tab bar
    // exactly like the Stock Overview tab.
    <div className="w-full space-y-6">
      <WarehouseCard data={data}/>

      <div>
        <WareHouse />

        <div className="py-6">
          <WarehouseTable records={records}/>
        </div>
      </div>
    </div>
  );
}