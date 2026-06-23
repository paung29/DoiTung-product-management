"use server";

import { ClusterTable } from "@/components/custom/admin/zone&form/zone/form/cluster-table";
import { Account } from "@/lib/types/model/account";
import { AccountItem, ClusterApiItem } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";

type ClusterItem = {
    no: number;
    date: string;
    clusterId: number;
    poleNo: number;
    clusterNo: number;
    condition: string;
    recordedBy: string;
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ zoneId: string }>;
  searchParams: Promise<{ zoneNo?: string }>;
}) {

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const {zoneId} = await params
  console.log(zoneId)

  const response = await fetch(`${baseUrl}/clusters/get-cluster-forms-by-zone?zoneId=${zoneId}`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie: cookieHeader,
    },
  });

  console.log("fetching data");

  const apiData: { clusterForms: ClusterItem[] } = response.ok
    ? await response.json()
    : { clusterForms: [] };

  const clusterTableData = apiData?.clusterForms?.map((item : any) => ({
      clusterId: item.clusterId,
      clusterNo: item.clusterNo,
      poleNo: item.poleNo,
      recordedBy: item.recordedBy ?? "N/A",
      recordedDate: item.date ?? "",
      condition: item.condition ?? "",
    })) ?? [];

    console.log(clusterTableData)

  return(
    < ClusterTable clusterTableData={clusterTableData} />
  )
}
