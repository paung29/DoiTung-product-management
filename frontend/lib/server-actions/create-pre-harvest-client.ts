"use server"

import { cookies } from "next/headers";
import { CreatePreHarvestForm, FlowerRecordingFormType, PreHarvestFormValue } from "../types/model/type";
import { baseUrl } from "../utl";


export async function createPreHarvestForm(data : CreatePreHarvestForm) {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${baseUrl}/preHarvest/create`, {
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