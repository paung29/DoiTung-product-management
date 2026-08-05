"use server"

import { CustomerFormSubmit } from "@/components/custom/admin/inventory&distribution/add-customer-button";
import { YearNameFormType, YearSettingFormType } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";


export async function updateYearName(data : YearNameFormType) {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${baseUrl}/years/update-year-name`, {
        method : "PATCH",
        credentials: "include",
        headers: {
            Cookie : cookieHeader,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    
    return await response.json()
}