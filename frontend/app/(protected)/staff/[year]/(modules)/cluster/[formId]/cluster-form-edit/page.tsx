"use server"

import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
import ClusterFormEdit from "./ClusterFormEditClient";
import { GetClusterApiResponse, ZoneApiResponse } from "@/lib/types/model/type";

export default async function Page({params,} : {params : {year : string, formId: string}}) {

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const {year, formId} = await params

  const response = await fetch(`${baseUrl}/clusters/get-cluster-form?clusterId=${formId}`, {
      credentials: "include",
      method: "GET",
      headers: {
        Cookie : cookieHeader
      }
  });

  const result : GetClusterApiResponse  = await response.json();
  console.log(result)


  return(
    <ClusterFormEdit data={result}/>
  )
  
}