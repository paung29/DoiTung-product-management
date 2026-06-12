"use server"

import { Account } from "@/lib/types/model/account";
import { AccountItem, ClusterApiItem, YearApiResponse, ZoneApiResponse } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
import { YearTableDataType } from "@/components/custom/admin/zone&form/year/year-table";
import { useZoneForm } from "../../../zone-form-context";
import ZoneManagement from "./Zone-Management-Page-Client";
import { ZoneTableDataType } from "@/components/custom/admin/zone&form/zone/zone-table";
 
export default async function Page( {
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  console.log("params year",year)

  const response = await fetch(`${baseUrl}/zones/get-zone-management-table?year=${year}`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie : cookieHeader
    }
  });

  console.log("response ok:", response.ok);
  console.log("status:", response.status);

  console.log("fetching data")
  
  

  const apiData: ZoneApiResponse = response.ok ? await response.json() : { zones: [] };
  
  console.log("zone api result : ", apiData);

  const records: ZoneTableDataType[] = (apiData.zones ?? []).map((item, index) => ({
    zone_name: item.zoneName,
    zone_id : item.zoneId,
    totalPole: item.totalPolesInZone,
    total_plants: item.totalPolesInZone,
  }));


  return (
    <ZoneManagement zoneRecords={records} totalPlants={apiData.totalPoles} totalZones={apiData.totalZones}/>
  );
  
}

