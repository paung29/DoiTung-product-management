"use server";

import { HarvestGradingHistory, HarvestGradingRecord } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
import HarvestGradingHistoryPageClient from "./HarvestGradingHistoryPageClient";

export default async function HarvestGradingEntryPage({params} : {params : Promise<{year : string}>}) {

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const {year} = await params;

  const response = await fetch(`${baseUrl}/harvest-grading/get-harvest-grading-form-histories?year=${year}`, {
      credentials: "include",
      method: "GET",
      headers: {
        Cookie : cookieHeader
      }
  });

  const apiData = response.ok ? await response.json() : { harvestGradingFormHistories: [] };

  const records : HarvestGradingRecord[] = (apiData.harvestGradingFormHistories ?? []).map(
  (item: HarvestGradingHistory) => ({
    poleid: item.poleId,
    location: item.location,
    poleNumber: item.poleNo.toString(),
    recordedDate: item.createdAt,
    editedDate: item.updatedAt,
    status: item.harvestGradingFormDone ? "complete" : "incomplete",
  })
  );

  return <HarvestGradingHistoryPageClient records={records} year={year} />;
}
