"use server";

import {getAllWarehouses,YearListResponse } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
import { DistributionRecord } from "@/components/custom/admin/inventory&distribution/distribution-tabel";
import HistoryPageClient from "./history-page-client";
import { Option } from "@/lib/types/model/option";

export type DistributionHistoryItem = {
  no: number;
  stock_movement_id: number;
  date: string;
  category: "CARRY_OVER" | "INCOMING" | "ISSUED";
  grade: "A_PLUS" | "A" | "B" | "C" | "D_PLUS" | "REJECTED";
  production_year: number;
  warehouse: string;
  total_grams: number;
  total_pods: number;
  details: string;
};

export type StockMovementsApiResponse = {
  stock_movements: DistributionHistoryItem[];
};
 
export default async function Page({params, searchParams,} : {params : Promise<{year : string}>, searchParams: Promise<{category ?: string; grade ?: string; warehouseId ?: string}>;}) {

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ year: string }>;
  searchParams: Promise<{ zoneNo?: string }>;
}) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const {year} = await params
  const { category, grade, warehouseId } = await searchParams;

  const query = new URLSearchParams();

  query.set("year", year)

  if (category) {
    query.set("category", category);
  }

  if (grade) {
    query.set("grade", grade);
  }
  
  if (warehouseId) {
    query.set("warehouseId", String(warehouseId));
  }
  
  const YearResponse = await fetch(`${baseUrl}/years/get-all-years`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  const yearApiData : YearListResponse = YearResponse.ok
    ? await YearResponse.json()
    : { years: [] };

  const yearOptions : Option[] = yearApiData.years.map((item) => ({
    id : String(item),
    value : String(item)
  }))

  const WareHouseResponse = await fetch(`${baseUrl}/warehouses/get-all-warehouses`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  const warehouseApiData : getAllWarehouses = WareHouseResponse.ok
    ? await WareHouseResponse.json()
    : { warehouses: [] };

  const warehouseOptions : Option[] = warehouseApiData.warehouses.map((item) => ({
    id : String(item.warehouse_id),
    value : item.warehouse_name
  }))

  

  const response = await fetch(`${baseUrl}/stocks/filter-stock?${query.toString()}`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie : cookieHeader
    }
  });

  console.log("fetching data");

  const apiData: StockMovementsApiResponse = response.ok
    ? await response.json()
    : { stock_movements: [] };

  const records: DistributionRecord[] = apiData.stock_movements.map(
    (item, index) => ({
      id: String(item.stock_movement_id),
      date: item.date,
      category: item.category,
      grade: item.grade,
      productionYear: item.production_year,
      warehouse: item.warehouse,
      amount: item.total_grams,
      details: item.details,
    }),
  );

  console.log(apiData)
  console.log(records)
  console.log("yearApiData", yearApiData);
  console.log("warehouseApiData", warehouseApiData);

  return (
    <HistoryPageClient plantationYearOptions={yearOptions} plantationAreaOptions={warehouseOptions} records={records}/>
  );
  
}
