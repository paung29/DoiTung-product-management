"use server";

import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";

export type editZoneType = {
  zoneId: number;
  zoneName: string;
};

export async function updateZone(data: editZoneType) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await fetch(`${baseUrl}/zones/update-zone-name`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      Cookie: cookieHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}
