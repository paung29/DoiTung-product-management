"use server"

import ClusterEntryPage from "@/app/(protected)/staff/[year]/(modules)/cluster/ClusterPageClient";
import { ClusterApiItem, ClusterHistoryApiItem } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
 
export default async function Page({params, searchParams,} : {params : Promise<{year : string}>, searchParams: Promise<{ zoneNo?: string }>;}) {

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const {year} = await params;
  const { zoneNo } = await searchParams;

  const selectedZoneNo = zoneNo ?? "3";

  const response = await fetch(`${baseUrl}/preHarvest/get-preHarvest-form-histories?year=${year}`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie : cookieHeader
    }
  });

  console.log("fetching data")
  

  
  const apiData = response.ok ? await response.json() : { preHarvestForms: [] };

  const records = (apiData.preHarvestForms ?? []).map((item : ClusterHistoryApiItem) => ({
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
      link="flower"
      editLink="flower-form"
      year={year}
      defaultZoneNo={selectedZoneNo}
      records={records}
     />
  );
  
}

