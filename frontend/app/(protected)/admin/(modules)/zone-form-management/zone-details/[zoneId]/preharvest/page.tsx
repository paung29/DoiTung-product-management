"use server";

import { ClusterTable } from "@/components/custom/admin/zone&form/zone/form/cluster-table";
import { FlowerTable } from "@/components/custom/admin/zone&form/zone/form/flower-table";
import { PodTable } from "@/components/custom/admin/zone&form/zone/form/pod-table";
import { PollinationTable } from "@/components/custom/admin/zone&form/zone/form/pollination-table";
import { PreharvestTable } from "@/components/custom/admin/zone&form/zone/form/preharvest-table";
import { Account } from "@/lib/types/model/account";
import { AccountItem, ClusterApiItem } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";

type PreHarvestItem = {
    no: number;
    clusterId: number;
    location: string;
    poleNo: number;
    clusterNo: number;
    remainingPods: number;
    numberPodsSecondRound: number;
    lostPodsBeforeHarvest: number;
    removedPods: number;
    plantsRemoved: number;
    condition: string;
    preHarvestFormDone: boolean;
    recordedBy: string;
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

  const response = await fetch(`${baseUrl}/preHarvest/get-preHarvest-forms-by-zone?zoneId=${zoneId}`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie: cookieHeader,
    },
  });

  console.log("fetching data");

  const apiData: { preHarvestForms: PreHarvestItem[] } = response.ok
    ? await response.json()
    : { preHarvestForms: [] };

  const preHarvestTableData = apiData?.preHarvestForms?.map((item : any) => ({
      preharvestId: Number(item.no ?? 0),
      poleNo: String(item.poleNo ?? ""),
      clusterId: String(item.clusterId ?? ""),
      gradeARound1: Number(item.remainingPods ?? 0), // maps backend calculation value
      numberOfPodsRound2: Number(item.numberPodsSecondRound ?? 0),
      lostPodsBeforeHarvest: Number(item.lostPodsBeforeHarvest ?? 0),
      podRemoved: Number(item.removedPods ?? 0),
      plantWithPodRemoved: Number(item.plantsRemoved ?? 0),
      recordedBy:
        item.recordedBy && item.recordedBy !== "" ? item.recordedBy : "N/A",
      recordedDate: item.date ?? "",
      condition: item.condition ?? "",
    })) ?? [];

    console.log(preHarvestTableData)

  return(
    < PreharvestTable preharvestTableData={preHarvestTableData} />
  )
}
