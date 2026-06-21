import { cookies } from "next/headers";

export async function fetchWithCookie(url: string) {
  const cookieStore = await cookies();

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store", // important for admin data
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${url}`);
  }

  return res.json();
}
