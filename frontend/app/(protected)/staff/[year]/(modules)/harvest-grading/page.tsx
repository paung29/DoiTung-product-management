"use server";

import { HarvestAndGradingResponse, HarvestGradingRecord, ZoneApiResponse } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
import HarvestGradingList from "./HarvestAndGradingPageClient";
import { Option } from "@/lib/types/model/option";

export default async function HarvestGradingEntryPage({params, searchParams,} : {params : Promise<{year : string}>, searchParams: Promise<{ zoneNo?: string }>;}) {

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  
  const {year} = await params;
  const { zoneNo } = await searchParams;

  const zoneResponse = await fetch(`${baseUrl}/zones/get-all-zones?year=${year}`,
        {
          method: "GET",
          headers: {
            Cookie : cookieHeader
          },
          credentials: "include",
        },
      );
      
  console.log("zone status:", zoneResponse.status);

  if (!zoneResponse.ok) {
    throw new Error("Failed to fetch zones");
  }

  const data: ZoneApiResponse = await zoneResponse.json();

  const locationOptions: Option[] = (data.zones ?? []).map((zone) => ({
    id: String(zone.zoneId),
    value: zone.zoneName,
  }));

  console.log("zone options",locationOptions)

  const selectedZoneNo = zoneNo ?? locationOptions[0]?.id ?? "";
  
  const response = await fetch(`${baseUrl}/poles/get-by-zone?year=${year}&zoneId=${selectedZoneNo}`, {
      credentials: "include",
      method: "GET",
      headers: {
        Cookie : cookieHeader
      }
  });

  const result : HarvestAndGradingResponse = await response.json()
 
  console.log("fetch server side ",result)



  return (
    <>
      <div className="px-2 py-2 sm:px-4">
        <HarvestGradingList zoneNo={selectedZoneNo} poles={result.poles} year={year} zones={locationOptions}/>
      </div>
    </>
  );
}