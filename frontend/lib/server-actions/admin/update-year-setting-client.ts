"use server"

import { CustomerFormSubmit } from "@/components/custom/admin/inventory&distribution/add-customer-button";
import { YearSettingFormType } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";


export async function updateYearSetting(data : YearSettingFormType) {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${baseUrl}/years/form-setting/update`, {
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