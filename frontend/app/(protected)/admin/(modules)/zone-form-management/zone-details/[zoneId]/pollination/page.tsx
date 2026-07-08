"use server";

import { ClusterTable } from "@/components/custom/admin/zone&form/zone/form/cluster-table";
import { FlowerTable } from "@/components/custom/admin/zone&form/zone/form/flower-table";
import { PodTable } from "@/components/custom/admin/zone&form/zone/form/pod-table";
import { PollinationTable } from "@/components/custom/admin/zone&form/zone/form/pollination-table";
import { Account } from "@/lib/types/model/account";
import { AccountItem, ClusterApiItem } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";

type PollintaionItem = {
  no: number;
  clusterId: number;
  location: string;
  poleNo: number;
  clusterNo: number;
  totalFlowers: number;
  numberPods: number;
  unsuccessfulPollination: number;
  goodFlowers: number;
  badFlowers: number;
  condition: string;
  pollinationFormDone: boolean;
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ zoneId: string }>;
  searchParams: Promise<{ zoneNo?: string }>;
}) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const { zoneId } = await params;
  console.log(zoneId);

  const response = await fetch(
    `${baseUrl}/pollinations/get-pollination-forms-by-zone?zoneId=${zoneId}`,
    {
      credentials: "include",
      method: "GET",
      headers: {
        Cookie: cookieHeader,
      },
    },
  );

  console.log("fetching data");

  const apiData: { pollinationForms: PollintaionItem[] } = response.ok
    ? await response.json()
    : { pollinationForms: [] };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pollinationTableData =
    apiData?.pollinationForms?.map((item: any) => ({
      pollinationId: Number(item.no ?? 0),
      poleNo: String(item.poleNo ?? ""),
      clusterId: String(item.clusterId ?? ""),
      totalFlower: Number(item.totalFlowers ?? 0),
      numberOfPod: Number(item.numberPods ?? 0),
      unsuccessfulPollination: Number(item.unsuccessfulPollination ?? 0),
      goodFlowers: Number(item.goodFlowers ?? 0),
      badDroppedFlowers: Number(item.badFlowers ?? 0),
      condition: item.condition ?? "",
      recordedBy:
        item.recordedBy && item.recordedBy !== "" ? item.recordedBy : "N/A",
      recordedDate: item.date ?? item.Date ?? "",
    })) ?? [];

  console.log(pollinationTableData);

  return <PollinationTable pollinationTableData={pollinationTableData} />;
}
