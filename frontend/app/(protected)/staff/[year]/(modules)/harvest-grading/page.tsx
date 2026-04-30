"use server";

import HarvestAndGradingSearch from "@/components/custom/staff/harvest-grading-search";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";

export default async function HarvestGradingEntryPage({params, searchParams,} : {params : Promise<{year : string}>, searchParams: Promise<{ zoneNo?: string }>;}) {

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  
  const {year} = await params;
  const { zoneNo } = await searchParams;
  
  const selectedZoneNo = zoneNo ?? "3";
  
  const response = await fetch(`${baseUrl}/poles/get-by-zone?year=${year}&zoneNo=${selectedZoneNo}`, {
      credentials: "include",
      method: "GET",
      headers: {
        Cookie : cookieHeader
      }
  });
  
  console.log("fetching data")

  return (
    <>
      <div className="px-2 py-2 sm:px-4">
        <HarvestAndGradingSearch />

        <div className="mt-6 space-y-2">
          {/* {mockRecords.map((record) => (
            <div key={record.id} onClick={() => handleEditRecord(record)}>
              <HarvestGradingRecordingCard
                records={[record]}
                onEdit={handleEditRecord}
              />
            </div>
          ))} */}
        </div>
      </div>
    </>
  );
}
