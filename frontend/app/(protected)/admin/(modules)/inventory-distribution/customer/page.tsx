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

type CustomersApiResponse = {
  customers: Customers[];
};
 
export default async function Page({params, searchParams,} : {params : Promise<{year : string}>, searchParams: Promise<{ zoneNo?: string }>;}) {

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await fetch(`${baseUrl}/customers/get-all-customers`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie : cookieHeader
    }
  });

  console.log("fetching data")
  

  const apiData : CustomersApiResponse = response.ok ? await response.json() : { customers: [] };

  const records : CustomerHistoryData[] = apiData.customers.map((item, index) => ({
    id: String(item.id),
    date: "Jan 8, 2026",
    customer: item.customer_name,
    gradeA: 500,
    gradeB: 500,
    gradeC: 459,
    gradeFailed: 500,
    totalWeight: 1959,
    note: item.note,
    }));

  console.log(apiData)
  console.log(records)

  return (
    <CustomerHome records={records}/>
  );
  
}

