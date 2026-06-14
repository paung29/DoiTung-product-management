"use server"

import { Account } from "@/lib/types/model/account";
import { AccountItem, ClusterApiItem, getAllWarehouses, YearApiResponse } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
import { YearTableDataType } from "@/components/custom/admin/zone&form/year/year-table";
import DistributionPage from "./Distribution-Page-Client";
import { WarehouseTableData } from "@/components/custom/admin/inventory&distribution/warehouse-table";
import { WarehouseApiResponse } from "../warehouse/page";
import { Option } from "@/lib/types/model/option";
import { CustomersApiResponse } from "../../customer/page";
 
export default async function Page({params, searchParams,} : {params : Promise<{year : string}>, searchParams: Promise<{ zoneNo?: string }>;}) {

  const { year } = await params;
  const { zoneNo } = await searchParams;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await fetch(`${baseUrl}/years/get-all-years`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie : cookieHeader
    }
  });

  console.log("fetching data")
  

  const apiData: YearApiResponse = response.ok ? await response.json() : { years: [] };

  console.log("year from route:", year);
  console.log("zoneNo from query:", zoneNo);
  console.log(apiData);

  const wareHouseResponse = await fetch(`${baseUrl}/warehouses/get-all-warehouses`, {
      credentials: "include",
      method: "GET",
      headers: {
        Cookie : cookieHeader
      }
    });
  
    console.log("fetching data")
    
  
  const wareHouseapiData : getAllWarehouses = wareHouseResponse.ok ? await wareHouseResponse.json() : { warehouses: [] };

  const wareHouserecords : Option[] = wareHouseapiData.warehouses.map((item, index) => ({
    id : String(item.warehouse_id),
    value : item.warehouse_name,
  }));

  const customerResponse = await fetch(`${baseUrl}/customers/get-all-customers`, {
      credentials: "include",
      method: "GET",
      headers: {
        Cookie : cookieHeader
      }
    });
  
    console.log("fetching data")
    
  
    const customerApiData : CustomersApiResponse = customerResponse.ok ? await customerResponse.json() : { customers: [] };
  
    const customerOptions : Option[] = customerApiData.customers.map((item, index) => ({
      id : String(item.id),
      value : item.customer_name
    }));
  

  return (
    <DistributionPage years={apiData} plantationAreaOptions={wareHouserecords} customers={customerOptions}/>
  );
  
}

