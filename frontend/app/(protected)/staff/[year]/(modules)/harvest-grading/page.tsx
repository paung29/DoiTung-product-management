"use server";

import HarvestAndGradingSearch from "@/components/custom/staff/harvest-grading-search";
import { HarvestAndGradingResponse, HarvestGradingRecord } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
import HarvestGradingList from "./HarvestAndGradingPageClient";
import { redirect } from "next/navigation";

export default async function HarvestGradingEntryPage({params, searchParams,} : {params : Promise<{year : string}>, searchParams: Promise<{ zoneNo?: string }>;}) {

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  
  const {year} = await params;
  const { zoneNo } = await searchParams;

  if (!zoneNo) {
    redirect(`/staff/${year}/harvest-grading?zoneNo=3`);
  }
  
  const response = await fetch(`${baseUrl}/poles/get-by-zone?year=${year}&zoneNo=${zoneNo}`, {
      credentials: "include",
      method: "GET",
      headers: {
        Cookie : cookieHeader
      }
  });

  const result : HarvestAndGradingResponse = await response.json()
 
  console.log(result)



  return (
    <>
      <div className="px-2 py-2 sm:px-4">
        <HarvestAndGradingSearch />

        <HarvestGradingList zoneNo={zoneNo} poles={result.poles} year={year} />
      </div>
    </>
  );
}