"use server"

import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
import { GetPodApiResponse } from "@/lib/types/model/type";
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

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message = errorData?.message ?? "Failed to load pod form.";

    return (
      <div className="mx-auto max-w-2xl py-16 text-center">
        <p className="text-staff-failed text-lg font-medium">{message}</p>
      </div>
    );
  }

  const result : GetPodApiResponse  = await response.json();
  console.log(result)
  return(
    <PodForm record={result}/>
  )

}
