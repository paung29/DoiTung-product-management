"use server"

import ClusterEntryPage from "@/app/(protected)/staff/[year]/(modules)/cluster/ClusterPageClient";
import { Option } from "@/lib/types/model/option";
import { ClusterApiItem, ZoneApiResponse } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
import PreHarvestPageClient from "./PreHarvestClient";
 
export default async function Page({params, searchParams,} : {params : Promise<{year : string}>, searchParams: Promise<{ zoneNo?: string; clusterNo ?: string; poleNo ?: string }>;}) {

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const {year} = await params;
  const { zoneNo, clusterNo, poleNo } = await searchParams;

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

  const query = new URLSearchParams();

  query.set("zoneId", selectedZoneNo);

  if (clusterNo) query.set("clusterNo", clusterNo);

  if (poleNo) query.set("poleNo", poleNo);

  const response = await fetch(`${baseUrl}/clusters/get-cluster-filter?${query.toString()}`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie : cookieHeader
    }
  });

  console.log("fetching data")
  

  const apiData = response.ok ? await response.json() : { clusters: [] };

  const records = (apiData.clusters ?? []).map((item : ClusterApiItem) => ({
      id: String(item.clusterId),             
      no: item.no,
      location: item.location,
      poleNumber: `${item.poleNo}`,
      clusterId: `${item.clusterNo}`,
      recordedDate: `${item.recordedDate}`,
      progressDone: item.progressDone 
}));

  
  console.log(apiData)

  return (
    <PreHarvestPageClient
      link="pre-harvest"
      editLink="pre-harvest-form"
      year={year}
      defaultZoneNo={selectedZoneNo}
      records={records}
      zones={locationOptions}
     />
  );
  
}

