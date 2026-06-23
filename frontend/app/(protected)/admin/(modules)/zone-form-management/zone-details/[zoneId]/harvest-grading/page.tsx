"use server";

import { ClusterTable } from "@/components/custom/admin/zone&form/zone/form/cluster-table";
import { FlowerTable } from "@/components/custom/admin/zone&form/zone/form/flower-table";
import { Account } from "@/lib/types/model/account";
import { AccountItem, ClusterApiItem } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";

type FlowerItem = {
    no: number;
    clusterId: number;
    location: string;
    poleNo: number;
    clusterNo: number;
    totalFlowers: number;
    condition: string;
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

  const response = await fetch(`${baseUrl}/flowers/get-flower-forms-by-zone?zoneId=${zoneId}`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie: cookieHeader,
    },
  });

  console.log("fetching data");

  const apiData: { flowerForms: FlowerItem[] } = response.ok
    ? await response.json()
    : { flowerForms: [] };

  const flowerTableData = apiData?.flowerForms?.map((item : any) => ({
      flowerId: Number(item.no ?? 0),
      clusterId: String(item.clusterId ?? ""),
      poleNo: String(item.poleNo ?? ""),
      totalFlower: Number(item.totalFlowers ?? 0),
      condition: item.condition ?? "",
      recordedBy:
        item.recordedBy && item.recordedBy !== "" ? item.recordedBy : "N/A",
      recordedDate: item.date ?? "",
    })) ?? [];

    console.log(flowerTableData)

  return(
    < FlowerTable flowerTableData={flowerTableData} />
  )
}
