"use server"

import { cookies } from "next/headers";
import { ClusterEditType, PollinationRecordingFormType } from "../types/model/type";
import { baseUrl } from "../utl";
import { clusterCreate } from "@/app/(protected)/staff/[year]/(modules)/cluster/cluster-form/page";


export async function createCluster(data : clusterCreate) {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${baseUrl}/clusters/create`, {
        method : "POST",
        credentials: "include",
        headers: {
            Cookie : cookieHeader,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const result = await response.json();
    
    return {
        ok: response.ok,
        status: response.status,
        message: result.message,
        data: result,
  };
}