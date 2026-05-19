"use server"

import { cookies } from "next/headers";
import { FlowerRecordingFormType, PodCreateForm } from "../types/model/type";
import { baseUrl } from "../utl";


export async function createPod(data : PodCreateForm) {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${baseUrl}/pods/create`, {
        method : "POST",
        credentials: "include",
        headers: {
            Cookie : cookieHeader,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    
    return await response.json()
}