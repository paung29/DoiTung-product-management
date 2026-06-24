
"use server"

import { cookies } from "next/headers";
import { HarvestGradingRecordInput } from "../types/model/type";
import { baseUrl } from "../utl";


export async function updateHarvestGrading(data : HarvestGradingRecordInput) {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${baseUrl}/harvest-grading/update-harvest-grading-form`, {
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

