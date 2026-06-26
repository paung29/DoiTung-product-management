"use server";

import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";

export async function exportExcelFile(path: string, year: string) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await fetch(`${baseUrl}${path}?year=${year}`, {
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
          ? "Cannot download. No data found for this year."
          : "Cannot download file.",
    };
  }

  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();

  return {
    success: true,
    file: Buffer.from(arrayBuffer).toString("base64"),
    filename: `${path.split("/").pop()}-${year}.xlsx`,
    contentType:
      response.headers.get("content-type") ||
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };
}