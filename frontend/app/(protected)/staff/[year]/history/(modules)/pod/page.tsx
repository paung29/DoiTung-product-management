"use server"

import ClusterEntryPage from "@/app/(protected)/staff/[year]/(modules)/cluster/ClusterPageClient";
import { ClusterHistoryApiItem } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";

export default async function Page({params} : {params : Promise<{year : string}>}) {

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const {year} = await params;

  const response = await fetch(`${baseUrl}/pods/get-pod-form-histories?year=${year}`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie : cookieHeader
    }
  });

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

  return (
    <ClusterEntryPage
      link="pod"
      editLink="pod-form"
      year={year}
      records={records}
      showSearch={false}
     />
  );

}
