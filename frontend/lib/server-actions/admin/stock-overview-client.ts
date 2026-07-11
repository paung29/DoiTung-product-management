"use server";

import { cookies } from "next/headers";
import { baseUrl } from "@/lib/utl";

/**
 * Fetch the stock overview, grade summary, and monthly summary for a year.
 * GET /stocks/get-stock-overview-by-year?year={year}
 * Returns StockOverview on success, or the standard
 * { success:false, message } error shape on failure.
 */
export async function getStockOverviewByYear(year: string | number) {
  const cookieStore = await cookies();

  const response = await fetch(
    `${baseUrl}/stocks/get-stock-overview-by-year?year=${year}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    },
  );

  return await response.json();
}
