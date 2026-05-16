"use server"

import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
import { GetClusterApiResponse, GetPodApiResponse, GetPreHarvestApiResponse } from "@/lib/types/model/type";
import PreHarvestForm from "./PreHarvestPageClient";

export default async function Page({params,} : {params : {year : string, formId: string}}) {

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const {year, formId} = await params

  const response = await fetch(`${baseUrl}/preHarvest/get-preHarvest-form?clusterId=${formId}`, {
      credentials: "include",
      method: "GET",
      headers: {
        Cookie : cookieHeader
      }
  });

  const result : GetPreHarvestApiResponse  = await response.json();
  console.log(result)
  return(
    <PreHarvestForm record={result}/>
  )
  
}