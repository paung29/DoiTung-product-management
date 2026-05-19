"use server"

import { cookies } from "next/headers";
import { ClusterEditType, PollinationRecordingFormType } from "../types/model/type";
import { baseUrl } from "../utl";


export async function editCluster(data : ClusterEditType) {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${baseUrl}/clusters/update-cluster-form`, {
        method : "PUT",
        credentials: "include",
        headers: {
            Cookie : cookieHeader,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    
    return await response.json()
}