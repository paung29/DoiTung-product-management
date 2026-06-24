"use server"

import { cookies } from "next/headers";
import { PodCreateForm } from "../types/model/type";
import { baseUrl } from "../utl";


export async function updatePod(data : PodCreateForm) {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${baseUrl}/pods/update-pod-form`, {
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