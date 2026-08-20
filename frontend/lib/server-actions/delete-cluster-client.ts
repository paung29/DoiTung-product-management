"use server"

import { cookies } from "next/headers";
import { baseUrl } from "../utl";

export async function deleteCluster(clusterId: number) {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${baseUrl}/clusters/delete-cluster?clusterId=${clusterId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            Cookie: cookieHeader,
        },
    })

    return await response.json()
}
