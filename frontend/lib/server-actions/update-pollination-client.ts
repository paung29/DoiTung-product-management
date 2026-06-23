"use server"

import { cookies } from "next/headers";
import { PollinationRecordingFormType } from "../types/model/type";
import { baseUrl } from "../utl";


export async function updatePollination(data : PollinationRecordingFormType) {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${baseUrl}/pollinations/update-pollination-form`, {
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