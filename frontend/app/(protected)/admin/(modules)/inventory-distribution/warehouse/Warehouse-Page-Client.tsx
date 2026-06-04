import WareHouse from "@/components/custom/admin/inventory&distribution/warehouse";
import WarehouseCard from "@/components/custom/admin/inventory&distribution/warehouse-card";
import WarehouseTable, { WarehouseTableData } from "@/components/custom/admin/inventory&distribution/warehouse-table";

export default function WarehousePage({records} : {records : WarehouseTableData[]}) {
  return (
    <div className="px-10 py-6">
      <WarehouseCard />

      <div className="py-6">
        <WareHouse />

        <div className="py-6">
          <WarehouseTable records={records}/>
        </div>
      </div>
    </div>
  );
}