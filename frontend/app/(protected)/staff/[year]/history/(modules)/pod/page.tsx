"use server"

import ClusterEntryPage from "@/app/(protected)/staff/[year]/(modules)/cluster/ClusterPageClient";
import { Option } from "@/lib/types/model/option";
import { ClusterApiItem, ClusterHistoryApiItem, ZoneApiResponse } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
 
export default async function Page({params, searchParams,} : {params : Promise<{year : string}>, searchParams: Promise<{ zoneNo?: string }>;}) {

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

  const response = await fetch(`${baseUrl}/pods/get-pod-form-histories?year=${year}`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie : cookieHeader
    }
  });

  console.log("fetching data")
  

  
  const apiData = response.ok ? await response.json() : { podFormHistories: [] };

  const records = (apiData.podFormHistories ?? []).map((item : ClusterHistoryApiItem) => ({
      id: String(item.clusterId),             
      no: item.no,
      location: item.location,
      poleNumber: `${item.poleNo}`,
      clusterId: `${item.clusterNo}`,
      progressDone: item.progressDone,
      recordedDate: item.createdAt
  }));

  
  console.log(apiData)
  console.log(records)

  return (
    <ClusterEntryPage
      zones={locationOptions}
      link="flower"
      editLink="flower-form"
      year={year}
      defaultZoneNo={selectedZoneNo}
      records={records}
     />
  );
  
}

