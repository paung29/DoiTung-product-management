import { cookies } from "next/headers";
import { baseUrl } from "@/lib/utl";
import { YearApiResponse } from "@/lib/types/model/type";
import InventoryLayoutClient from "./inventory-layout-client";

export default async function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await fetch(`${baseUrl}/years/get-all-years`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  const apiData: YearApiResponse = response.ok
    ? await response.json()
    : { years: [] };

  return (
    <InventoryLayoutClient yearRecords={apiData}>
      {children}
    </InventoryLayoutClient>
  );
}