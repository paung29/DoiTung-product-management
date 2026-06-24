"use server"

import { cookies } from "next/headers";
import { CreatePreHarvestForm,} from "../types/model/type";
import { baseUrl } from "../utl";


export async function updatePreHarvestForm(data : CreatePreHarvestForm) {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${baseUrl}/preHarvest/update-preHarvest-form`, {
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