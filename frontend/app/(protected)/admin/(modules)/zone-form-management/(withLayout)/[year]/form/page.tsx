"use server"

import { Account } from "@/lib/types/model/account";
import { AccountItem, ClusterApiItem, YearApiResponse, YearSettingApiResponse, ZoneApiResponse } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
import { YearTableDataType } from "@/components/custom/admin/zone&form/year/year-table";
import { useZoneForm } from "../../../zone-form-context";
import { ZoneTableDataType } from "@/components/custom/admin/zone&form/zone/zone-table";
import FormManagement from "./Form-Management-Page-Client";
 
export default async function Page( {
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  console.log("params year",year)

  const response = await fetch(`${baseUrl}/years/get-year-setting?year=${year}`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie : cookieHeader
    }
  });

  console.log("response ok:", response.ok);
  console.log("status:", response.status);

  console.log("fetching data")
  
  

  const apiData: YearSettingApiResponse = response.ok ? await response.json() : { zones: [] };
  
  console.log("zone api result : ", apiData);


  return (
    <FormManagement data={apiData} />
  );
  
}

