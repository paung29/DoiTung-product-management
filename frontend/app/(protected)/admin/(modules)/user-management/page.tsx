"use server"

import { Account } from "@/lib/types/model/account";
import { AccountItem, ClusterApiItem } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";
import UserManage from "./User-Management-Page-Client";
 
export default async function Page({params, searchParams,} : {params : Promise<{year : string}>, searchParams: Promise<{ zoneNo?: string }>;}) {

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await fetch(`${baseUrl}/accounts/get-all`, {
    credentials: "include",
    method: "GET",
    headers: {
      Cookie : cookieHeader
    }
  });

  console.log("fetching data")
  

  const apiData = response.ok ? await response.json() : { accounts: [] };

  const records : Account[]= (apiData.accounts ?? []).map((item : AccountItem) => ({
    account_id: item.user_id,
    name: item.name,
    email: item.email,
    password: "",
    role_on_db: item.role,
    phone_no : item.phone_no,
    status : item.active_status
  }));

  console.log(apiData)
  console.log(records)

  return (
    <UserManage records={records}/>
  );
  
}

