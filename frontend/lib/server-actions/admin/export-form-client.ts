"use server";

import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";

export async function exportExcelFile(path: string, year?: string) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  // Only append ?year= for year-scoped reports; all-years endpoints take no param.
  const url = year ? `${baseUrl}${path}?year=${year}` : `${baseUrl}${path}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (!response.ok) {
    return {
      success: false,
      message:
        response.status === 404
          ? year
            ? "Cannot download. No data found for this year."
            : "Cannot download. No data found."
          : "Cannot download file.",
    };
  }

  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();

  // Year-scoped: "<report>-<year>.xlsx"; all-years: joins the last two path
  // segments, e.g. "/export-data/stock-movements/all" -> "stock-movements-all.xlsx".
  const filename = year
    ? `${path.split("/").pop()}-${year}.xlsx`
    : `${path.split("/").filter(Boolean).slice(-2).join("-")}.xlsx`;

  return {
    success: true,
    file: Buffer.from(arrayBuffer).toString("base64"),
    filename,
    contentType:
      response.headers.get("content-type") ||
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };
}