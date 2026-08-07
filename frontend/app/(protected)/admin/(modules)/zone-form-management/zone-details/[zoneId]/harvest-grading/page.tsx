"use server";

import { ClusterTable } from "@/components/custom/admin/zone&form/zone/form/cluster-table";
import { FlowerTable } from "@/components/custom/admin/zone&form/zone/form/flower-table";
import { HarvestGradingTable } from "@/components/custom/admin/zone&form/zone/form/harvest-grading-table";
import { Account } from "@/lib/types/model/account";
import { AccountItem, ClusterApiItem } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";

export type HarvestGradingItem = {
  no: number;
  poleId: number;
  year: number;
  location: string;
  poleNo: number;
  gradeAPlusCount: number;
  gradeAPlusWeight: number;
  gradeACount: number;
  gradeAWeight: number;
  gradeBCount: number;
  gradeBWeight: number;
  gradeCCount: number;
  gradeCWeight: number;
  gradeDPlusCount: number;
  gradeDPlusWeight: number;
  undersizedCount: number;
  undersizedWeight: number;
  harvestGradingFormDone: boolean;
  recordedBy: string;
  date: string;
  rottenCount: number;
  rottenWeight: number;
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
  const {zoneId} = await params
  console.log(zoneId)

  const response = await fetch(`${baseUrl}/harvest-grading/get-harvest-grading-forms-by-zone?zoneId=${zoneId}`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie: cookieHeader,
    },
  });

  console.log("fetching data");

  const apiData: { harvestGradingForms: HarvestGradingItem[] } = response.ok
    ? await response.json()
    : { harvestGradingForms: [] };

  const harvestGradingTableData = apiData?.harvestGradingForms?.map((item : any) => ({
      harvestId: Number(item.no ?? 0),
      poleNo: String(item.poleNo ?? ""),
      recordedDate: item.date ?? "",
      gradeAPlus_noPod: Number(item.gradeAPlusCount ?? 0),
      gradeAPlus_weight: Number(item.gradeAPlusWeight ?? 0),
      gradeA_noPod: Number(item.gradeACount ?? 0),
      gradeA_weight: Number(item.gradeAWeight ?? 0),
      gradeB_noPod: Number(item.gradeBCount ?? 0),
      gradeB_weight: Number(item.gradeBWeight ?? 0),
      gradeC_noPod: Number(item.gradeCCount ?? 0),
      gradeC_weight: Number(item.gradeCWeight ?? 0),
      gradeDPlus_noPod: Number(item.gradeDPlusCount ?? 0),
      gradeDPlus_weight: Number(item.gradeDPlusWeight ?? 0),
      rejectedUndersize_noPod: Number(item.undersizedCount ?? 0),
      rejectedUndersize_weight: Number(item.undersizedWeight ?? 0),
      recordedBy:
        item.recordedBy && item.recordedBy !== "" ? item.recordedBy : "N/A",
      rottenCount: Number(item.rottenCount ?? 0),
      rottenWeight: Number(item.rottenWeight ?? 0),
    })) ?? [];

    console.log(harvestGradingTableData)

  return(
    < HarvestGradingTable harvestGradingTableData={harvestGradingTableData} />
  )
}
