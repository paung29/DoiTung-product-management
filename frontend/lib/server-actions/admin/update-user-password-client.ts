"use server";

import { UpdateUserPasswordForm, UpdateUserPasswordFormData } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { cookies } from "next/headers";

export async function updateUserPassword(data: UpdateUserPasswordForm) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await fetch(`${baseUrl}/accounts/update-password`, {
    method: "PUT",
    credentials: "include",
    headers: {
      Cookie: cookieHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}
