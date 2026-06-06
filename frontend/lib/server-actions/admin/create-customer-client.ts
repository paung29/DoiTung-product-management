"use server"

import { CustomerFormSubmit } from "@/components/custom/admin/inventory&distribution/add-customer-button";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";


export async function createCustomer(data : CustomerFormSubmit) {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${baseUrl}/customers/create`, {
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