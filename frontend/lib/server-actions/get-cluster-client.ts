'use server'

import { baseUrl } from "../utl"

export async function GetClusterByID(clusterId:string) {
    const response = await fetch(`${baseUrl}/clusters/get-cluster-form?clusterId=${clusterId}`)
    return await response.json()
}