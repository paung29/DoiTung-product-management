"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Home, Folder, History, User, LogOut, LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const HEADER_HEIGHT = 80;

export type MenuItem = {
  label: string;
  icon: LucideIcon;
  href: string;
};

type MenuProps = {
  menuItems: MenuItem[];
  title: string;
};

export default function StaffMenu({ menuItems, title }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((v) => !v);

  const handleLogout = () => {
    closeMenu();
    router.push("/login");
  };

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="relative z-50 rounded-lg p-2 text-2xl font-bold text-white transition hover:bg-white/10"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        ☰
      </button>

      {/*  Sidebar starts veloe header */}
      <aside
        className={`fixed left-0 z-40 w-72 transform bg-[#f7f2e6] text-[#2a1b12] shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          top: HEADER_HEIGHT,
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
        role="dialog"
        aria-label={title}
      >
        {/* Menu Items */}
        <nav className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="flex items-center gap-4 px-6 py-4 transition hover:bg-black/5"
              >
                <item.icon className="h-6 w-6 text-[#8a6752]" />
                <span className="text-lg font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Logout Button */}
          <div className="border-t border-black/10 p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-4 rounded-xl bg-red-600 px-4 py-3 text-lg font-medium text-white transition hover:bg-red-700"
            >
              <LogOut className="h-6 w-6" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </div>
  );
}
