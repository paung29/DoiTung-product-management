"use server"

import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
import { GetClusterApiResponse, GetPodApiResponse } from "@/lib/types/model/type";
import PodForm from "./PodRecordingPageClient";

export default async function Page({params,} : {params : {year : string, formId: string}}) {

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const {year, formId} = await params

  const response = await fetch(`${baseUrl}/pods/get-pod-form?clusterId=${formId}`, {
      credentials: "include",
      method: "GET",
      headers: {
        Cookie : cookieHeader
      }
  });

  const result : GetPodApiResponse  = await response.json();
  console.log(result)
  return(
    <PodForm record={result}/>
  )
  
}