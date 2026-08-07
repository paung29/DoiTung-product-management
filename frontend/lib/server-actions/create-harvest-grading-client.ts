
"use server"

import { cookies } from "next/headers";
import { HarvestGradingRecordInput } from "../types/model/type";
import { baseUrl } from "../utl";


export async function createHarvestGrading(data : HarvestGradingRecordInput) {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${baseUrl}/harvest-grading/create`, {
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
        status: response.status,
        message: result.message,
    };
}

