"use server";

import { ClusterTable } from "@/components/custom/admin/zone&form/zone/form/cluster-table";
import { FlowerTable } from "@/components/custom/admin/zone&form/zone/form/flower-table";
import { PodTable } from "@/components/custom/admin/zone&form/zone/form/pod-table";
import { Account } from "@/lib/types/model/account";
import { AccountItem, ClusterApiItem } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";

type PodItem = {
    no: number;
    clusterId: number;
    location: string;
    poleNo: number;
    clusterNo: number;
    numberPods: number;
    lostPods: number;
    remainingPods: number;
    condition: string;
    podFormDone: boolean;
    date: string;
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

  const response = await fetch(`${baseUrl}/pods/get-pod-forms-by-zone?zoneId=${zoneId}`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie: cookieHeader,
    },
  });

  console.log("fetching data");

  const apiData: { podForms: PodItem[] } = response.ok
    ? await response.json()
    : { podForms: [] };

  const podTableData = apiData?.podForms?.map((item : any) => ({
      podId: Number(item.no ?? 0),
      poleNo: String(item.poleNo ?? ""),
      clusterId: String(item.clusterId ?? ""),
      totalFlower: Number(item.totalFlowers ?? 0),
      numberOfPod: Number(item.numberPods ?? 0),
      lostPods: Number(item.lostPods ?? 0),
      remainingPod: Number(item.remainingPods ?? 0),
      recordedBy:
        item.recordedBy && item.recordedBy !== "" ? item.recordedBy : "N/A",
      recordedDate: item.date ?? "",
      condition: item.condition ?? "",
    })) ?? [];

    console.log(podTableData)

  return(
    < PodTable podTableData={podTableData} />
  )
}
