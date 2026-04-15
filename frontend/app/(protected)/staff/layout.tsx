"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/lib/utl";
import { useAuthStore } from "@/lib/store/user-store";

type UserInfoResponse = {
  id: number;
  email: string;
  role: string;
};

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStaff = async () => {
      try {
        const res = await fetch(`${baseUrl}/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          router.replace("/login");
          return;
        }

        const user: UserInfoResponse = await res.json();
        setUser(user);

        if (user.role !== "STAFF") {
          router.replace("/login");
          return;
        }

        setLoading(false);
      } catch (error) {
        router.replace("/login");
      }
    };

    checkStaff();
  }, [router, setUser]);

  if (loading) return null;

  return <>{children}</>;
}