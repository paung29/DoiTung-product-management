"use server";

import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
import WarehousePage from "./Warehouse-Page-Client";
import { WarehouseTableData } from "@/components/custom/admin/inventory&distribution/warehouse-table";
import { WarehouseCardData } from "@/components/custom/admin/inventory&distribution/warehouse-card";

export type Warehouse = {
  warehouse_id: number;
  warehouse_name: string;
  active_status: boolean;

  remaining_pods: number;
  remaining_weights: number;

  distributed_pods: number;
  distributed_weights: number;

  total_pods: number;
  total_weights: number;
};

export type WarehouseApiResponse = {
  total_warehouses: number;
  total_active_warehouses: number;
  remaining_stocks_pods: number;
  remaining_stocks_weights: number;
  warehouse_table: Warehouse[] | null;
};

export default async function Page({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const cookieStore = await cookies();

  const { year } = await params;

  const response = await fetch(
    `${baseUrl}/warehouses/get-warehouse-table-by-year?year=${year}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    },
  );

  const apiData: WarehouseApiResponse = response.ok
    ? await response.json()
    : {
        total_warehouses: 0,
        total_active_warehouses: 0,
        remaining_stocks_pods: 0,
        remaining_stocks_weights: 0,
        warehouse_table: [],
      };

  const records: WarehouseTableData[] = (apiData.warehouse_table ?? []).map(
    (item) => ({
      id: String(item.warehouse_id),
      name: item.warehouse_name,
      status: item.active_status ? "ACTIVE" : "INACTIVE",

      remainingPods: item.remaining_pods,
      remainingWeights: item.remaining_weights,

      distributedPods: item.distributed_pods,
      distributedWeights: item.distributed_weights,

      totalPods: item.total_pods,
      totalWeights: item.total_weights,
    }),
  );

  const remainingStockPods = records.reduce(
    (total, warehouse) => total + Number(warehouse.remainingPods || 0),
    0,
  );
  const remainingStockWeights = records.reduce(
    (total, warehouse) => total + Number(warehouse.remainingWeights || 0),
    0,
  );

  const cardData: WarehouseCardData = {
    totalWarehouse: apiData.total_warehouses,
    remainingStockPods,
    remainingStockWeights,
    activeWarehouse: apiData.total_active_warehouses,
  };

  return <WarehousePage data={cardData} records={records} />;
}
