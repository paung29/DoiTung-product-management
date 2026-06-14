import WareHouse from "@/components/custom/admin/inventory&distribution/warehouse";
import WarehouseCard, { WarehouseCardData } from "@/components/custom/admin/inventory&distribution/warehouse-card";
import WarehouseTable, { WarehouseTableData } from "@/components/custom/admin/inventory&distribution/warehouse-table";

export default function WarehousePage({records, data} : {records : WarehouseTableData[], data : WarehouseCardData}) {
  return (
    <div className="px-10 py-6">
      <WarehouseCard data={data}/>

      <div className="py-6">
        <WareHouse />

        <div className="py-6">
          <WarehouseTable records={records}/>
        </div>
      </div>
    </div>
  );
}