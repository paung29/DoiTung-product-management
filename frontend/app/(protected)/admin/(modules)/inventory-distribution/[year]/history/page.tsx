"use server"

import { Account } from "@/lib/types/model/account";
import { AccountItem, ClusterApiItem } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
import { WarehouseTableData } from "@/components/custom/admin/inventory&distribution/warehouse-table";
import { DistributionRecord } from "@/components/custom/admin/inventory&distribution/distribution-tabel";
import HistoryPageClient from "./history-page-client";

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
 
export default async function Page({params, searchParams,} : {params : Promise<{year : string}>, searchParams: Promise<{ zoneNo?: string }>;}) {

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const {year} = await params

  const response = await fetch(`${baseUrl}/stocks/get-all-by-year?year=${year}`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie : cookieHeader
    }
  });

  console.log("fetching data")
  

  const apiData : StockMovementsApiResponse = response.ok ? await response.json() : { stock_movements: [] };

  const records : DistributionRecord[] = apiData.stock_movements.map((item, index) => ({
    id: String(item.stock_movement_id),
    date: item.date,
    category: item.category,
    grade: item.grade,
    productionYear: item.production_year,
    warehouse: item.warehouse,
    amount: item.total_grams,
    details: item.details,
  }));

  console.log(apiData)
  console.log(records)

  return (
    <HistoryPageClient records={records}/>
  );
  
}

