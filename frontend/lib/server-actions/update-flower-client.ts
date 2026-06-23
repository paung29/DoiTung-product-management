"use server"

import { cookies } from "next/headers";
import { FlowerRecordingFormType } from "../types/model/type";
import { baseUrl } from "../utl";


export async function updateFlower(data : FlowerRecordingFormType) {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${baseUrl}/flowers/update-flower-form`, {
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