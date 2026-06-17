"use server"

import { Account } from "@/lib/types/model/account";
import { AccountItem, ClusterApiItem } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
import WarehousePage from "./Warehouse-Page-Client";
import { WarehouseTableData } from "@/components/custom/admin/inventory&distribution/warehouse-table";
import { WarehouseCardData } from "@/components/custom/admin/inventory&distribution/warehouse-card";

export type Warehouse = {
  warehouse_id: number;
  warehouse_name: string;
  active_status: boolean;
  total_pods : number
  total_weights : number
  distributed_pods : number
  distributed_weights : number
  remaining_pods : number
  remaining_weights : number
};

export type WarehouseApiResponse = {
  total_warehouses : number
  total_active_warehouses : number
  total_stocks_pods : number
  total_stocks_weights : number
  warehouse_table: Warehouse[];
};

 
export default async function Page({params, searchParams,} : {params : Promise<{year : string}>, searchParams: Promise<{ zoneNo?: string }>;}) {

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const {year} = await params
  console.log("year", year)

  const response = await fetch(`${baseUrl}/warehouses/get-warehouse-table-by-year?year=${year}`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie : cookieHeader
    }
  });

  console.log("fetching data")
  

  const apiData : WarehouseApiResponse = response.ok ? await response.json() 
    : {
        total_warehouses: 0,
        total_active_warehouses: 0,
        total_stocks_pods: 0,
        total_stocks_weights: 0,
        warehouse_table: [],
    };

  const records : WarehouseTableData[] = apiData.warehouse_table.map((item, index) => ({
    id: String(item.warehouse_id),
    name : item.warehouse_name,
    status : item.active_status ? "ACTIVE" : "INACTIVE",
    stock: item.total_pods,
    totalWeight: String(item.total_weights),
    distributed: String(item.distributed_weights),
    remaining: String(item.remaining_weights),
  }));

  const cardData : WarehouseCardData = {
    totalWarehouse : String(apiData.total_warehouses),
    totalStockPods : String(apiData.total_stocks_pods),
    totalWeightPods : String(apiData.total_stocks_weights),
    activeWarehouse : String(apiData.total_active_warehouses)
  }

  console.log(apiData)
  console.log(records)

  return (
    <WarehousePage data={cardData} records={records}/>
  );
  
}

