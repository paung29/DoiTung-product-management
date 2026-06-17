"use server"

import { Account } from "@/lib/types/model/account";
import { AccountItem, ClusterApiItem } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
import { WarehouseTableData } from "@/components/custom/admin/inventory&distribution/warehouse-table";
import { CustomerHistoryData } from "@/components/custom/admin/inventory&distribution/customer-tabel";
import CustomerHome from "./Customer-Management-Page-Client";

export type Customers = {
  id: number;
  customer_name: string;
  note: string;
};

export type CustomersApiResponse = {
  customers: Customers[];
};

export type CustomerStockTableItem = {
  customer_id: number;
  no: number;
  customer_name: string;
  grade_a: number;
  grade_b: number;
  grade_c: number;
  grade_failed: number;
  total_weight: number;
  note: string;
};

export type CustomerStockTableResponse = {
  customer_stock_table : CustomerStockTableItem[]
}
 
export default async function Page({params, searchParams,} : {params : Promise<{year : string}>, searchParams: Promise<{ zoneNo?: string }>;}) {

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const {year} = await params
  
  const stockTableResponse = await fetch(`${baseUrl}/stocks/get-customer-stock-by-year?year=${year}`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie : cookieHeader
    }
  });

  const stockTableapiData : CustomerStockTableResponse = stockTableResponse.ok ? await stockTableResponse.json() : { customer_stock_table: [] };

  const records : CustomerHistoryData[] = stockTableapiData.customer_stock_table.map((item, index) => ({
    id: String(item.customer_id),
    date: "Jan 8, 2026",
    customer: item.customer_name,
    gradeA: item.grade_a,
    gradeB: item.grade_b,
    gradeC: item.grade_c,
    gradeFailed: item.grade_failed,
    totalWeight: item.total_weight,
    note: item.note,
  }));

  console.log(stockTableapiData)
  console.log(records)

  return (
    <CustomerHome records={records}/>
  );
  
}

