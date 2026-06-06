"use server"

import { Account } from "@/lib/types/model/account";
import { AccountItem, ClusterApiItem, YearApiResponse } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
import ZoneAndFormManagementPage from "./Year-Management-Page-Client";
import { YearTableDataType } from "@/components/custom/admin/zone&form/year/year-table";
import YearManagementPage from "./Year-Management-Page-Client";
 
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

    const records : YearTableDataType[] = apiData.years.map((item, index) => ({
        year : String(item),
        totalPole : 10,
        totalZone : 10,
    }));


  return (
    <YearManagementPage yearsRecords={apiData} yearTables={records}/>
  );
  
}

