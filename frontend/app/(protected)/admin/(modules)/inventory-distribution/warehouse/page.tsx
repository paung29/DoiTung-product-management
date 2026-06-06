"use server"

import { Account } from "@/lib/types/model/account";
import { AccountItem, ClusterApiItem } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
import WarehousePage from "./Warehouse-Page-Client";
import { WarehouseTableData } from "@/components/custom/admin/inventory&distribution/warehouse-table";

export type Warehouse = {
  warehouse_id: number;
  warehouse_name: string;
  active_status: boolean;
};

type WarehouseApiResponse = {
  warehouses: Warehouse[];
};
 
export default async function Page({params, searchParams,} : {params : Promise<{year : string}>, searchParams: Promise<{ zoneNo?: string }>;}) {

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await fetch(`${baseUrl}/warehouses/get-all-warehouses`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie : cookieHeader
    }
  });

  console.log("fetching data")
  

  const apiData : WarehouseApiResponse = response.ok ? await response.json() : { warehouses: [] };

  const records : WarehouseTableData[] = apiData.warehouses.map((item, index) => ({
    id: String(item.warehouse_id),
    name : item.warehouse_name,
    status : item.active_status ? "ACTIVE" : "INACTIVE",
    stock: 20990,
    totalWeight: "32290.00 g",
    distributed: "8100 g",
    remaining: "24190.00 g",
    }));

  console.log(apiData)
  console.log(records)

  return (
    <WarehousePage records={records}/>
  );
  
}

