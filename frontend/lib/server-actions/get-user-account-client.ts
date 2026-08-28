"use server"

import { cookies } from "next/headers";
import { baseUrl } from "../utl";

export async function getUserAccount() {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${baseUrl}/accounts/get-user-account`, {
        credentials: "include",
        headers: {
            Cookie: cookieHeader,
        },
    })

    return await response.json()
}
