"use server"

import { Account } from "@/lib/types/model/account";
import { AccountItem, ClusterApiItem, YearApiResponse } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
import { YearTableDataType } from "@/components/custom/admin/zone&form/year/year-table";
import { useZoneForm } from "../zone-form-context";
import ZoneManagement from "./Zone-Management-Page-Client";
 
export default async function Page() {

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
  
  console.log(apiData);

    const records : YearTableDataType[] = apiData.years.map((item, index) => ({
        year : String(item),
        totalPole : 10,
        totalZone : 10,
    }));


  return (
    <ZoneManagement yearRecords={apiData}/>
  );
  
}

