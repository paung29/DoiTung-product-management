"use server";

import HarvestAndGradingSearch from "@/components/custom/staff/harvest-grading-search";
import { HarvestAndGradingResponse, HarvestGradingHistory, HarvestGradingRecord } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HarvestGradingList from "../../../(modules)/harvest-grading/HarvestAndGradingPageClient";
import HarvestGradingRecordingCard from "@/components/custom/staff/harvest-grading-recording-card";

export default async function HarvestGradingEntryPage({params, searchParams,} : {params : Promise<{year : string}>, searchParams: Promise<{ zoneNo?: string }>;}) {

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
  
  console.log(apiData)

  const records : HarvestGradingRecord[] = (apiData.harvestGradingFormHistories ?? []).map(
  (item: HarvestGradingHistory, index: number) => ({

    poleid: item.poleId,
    location: item.location,
    poleNumber: item.poleNo,
    recordedDate: item.createdAt,
    editedDate: item.updatedAt,
    status: item.harvestGradingFormDone
  })
  );
  console.log(records)

  return (
    <>
      <div className="px-2 py-2 sm:px-4">

        <HarvestGradingRecordingCard records={records}/>
      </div>
    </>
  );
}