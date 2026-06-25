"use server"

import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
import ReportsAndExportPage from "./reports-export-page-client";


 
export default async function Page() {

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();


  const response = await fetch(`${baseUrl}/years/get-all-years`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie : cookieHeader
    }
  });

  const result: { years: string[] } = await response.json();
  

  return (
    <ReportsAndExportPage years={result.years}/>
  );
  
}

