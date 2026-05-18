"use client";

import LanguageSwitch from "@/components/custom/staff/language-switch";
import Menu, { MenuItem } from "@/components/custom/staff/menu";
import { Folder, History, Home, User } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const params = useParams()
  const year = params.year

  const staffMenuItems: MenuItem[] = [
    {
      label: "Home",
      icon: Home,
      href: "/staff",
    },
    { label: "History", icon: History, href: `/staff/${year}/history` },
    { label: "Profile & Settings", icon: User, href: "/staff/profile" },
  ];

  return (
    <div className="bg-staff-backdrop min-h-screen">
      <header className="sticky top-0 z-50 h-auto w-full bg-yellow-900 px-3 py-2 text-white sm:h-16 sm:px-4 sm:py-3 md:h-20 md:px-6 md:py-4">
        <div className="flex h-full items-center justify-between gap-2 sm:gap-3 md:gap-4">
          {/* LEFT */}
          <div className="flex min-w-fit items-center gap-2 sm:gap-3 md:gap-4">
            <Menu menuItems={staffMenuItems} title="Staff Menu" />
            <Image
              src="/logo.png"
              alt="Logo"
              width={180}
              height={80}
              className="h-8 w-auto sm:h-10 md:h-12"
            />
          </div>

          {/* CENTER */}
          <div className="hidden flex-1 text-center sm:block">
            <h1 className="truncate text-sm font-semibold sm:text-base md:text-xl">
              Vanilla Product Management
            </h1>
            <p className="hidden text-xs sm:text-sm md:block">Staff Portal</p>
          </div>

          {/* RIGHT */}
          <div className="min-w-fit">
            <LanguageSwitch locale="en" />
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-60px)] bg-[#f2f1ed] sm:min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)]">
        {children}
      </main>
    </div>
  );
}
