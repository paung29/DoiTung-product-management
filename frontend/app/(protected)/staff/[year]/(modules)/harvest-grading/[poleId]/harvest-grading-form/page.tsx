"use server";

import HarvestGradingRecordingForm from "@/components/custom/staff/form/harvest-grading-recording-form";
import { HarvestGradingRecord, HarvestGradingRecordResponse } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";

export default async function HarvestGradingEntryPage({params, searchParams} : {params : Promise<{year : string, poleId : string}>, searchParams: Promise<{ zoneNo?: string }>;}) {
  

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  
  const {year, poleId} = await params;
  const {zoneNo}= await searchParams;
  console.log(poleId)
  
  const response = await fetch(`${baseUrl}/harvest-grading/get-harvest-grading-form?poleId=${poleId}`, {
      credentials: "include",
      method: "GET",
      headers: {
        Cookie : cookieHeader
      }
  });

  const result : HarvestGradingRecordResponse = await response.json()
  console.log(result)

  const PassData : HarvestGradingRecord = {
      poleid: result.poleId,
      location: result.location,
      poleNumber: String(result.poleNo),
      recordedDate: "2025",
      editedDate: "2024",
      status: "complete"
  };

  return (
    <>
      <div className="px-2 py-2 sm:px-4">

        <HarvestGradingRecordingForm data={result} zoneNo={Number(zoneNo)} record={PassData} />
      </div>
    </>
  );
}
