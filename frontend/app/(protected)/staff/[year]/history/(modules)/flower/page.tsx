"use server"

import ClusterEntryPage from "@/app/(protected)/staff/[year]/(modules)/cluster/ClusterPageClient";
import { ClusterHistoryApiItem } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";

export default async function Page({params} : {params : Promise<{year : string}>}) {

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const {year} = await params;

  const response = await fetch(`${baseUrl}/flowers/get-flower-form-histories?year=${year}`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie : cookieHeader
    }
  });

  const apiData = response.ok ? await response.json() : { flowerFormHistories: [] };

  const records = (apiData.flowerFormHistories ?? []).map(
  (item: ClusterHistoryApiItem, index: number) => ({
    id: String(item.clusterId),
    no: index + 1,
    location: item.location,
    poleNumber: `${item.poleNo}`,
    clusterId: `${item.clusterNo}`,
    progressDone: item.progressDone,
    recordedDate: item.createdAt,
  })
 );

  return (
    <ClusterEntryPage
      link="flower"
      editLink="flower-form"
      year={year}
      records={records}
      showSearch={false}
     />
  );

}
