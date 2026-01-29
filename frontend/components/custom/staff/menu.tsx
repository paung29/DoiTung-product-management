"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Home, Folder, History, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const HEADER_HEIGHT = 80;

export default function StaffMenu() {
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

  const menuItems = [
    { label: "Home", icon: Home, href: "/staff" },
    { label: "Data Collection", icon: Folder, href: "/staff/data-collection" },
    { label: "History", icon: History, href: "/staff/history" },
    { label: "Profile & Settings", icon: User, href: "/staff/profile" },
  ];

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
        className="text-white text-2xl font-bold p-2 hover:bg-white/10 rounded-lg transition relative z-50"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        ☰
      </button>

      {/*  Sidebar starts veloe header */}
      <aside
        className={`fixed left-0 z-40 w-72 bg-[#f7f2e6] text-[#2a1b12] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          top: HEADER_HEIGHT,
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
        role="dialog"
        aria-label="Staff menu"
      >
        {/* Menu Items */}
        <nav className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="flex items-center gap-4 px-6 py-4 hover:bg-black/5 transition"
              >
                <item.icon className="w-6 h-6 text-[#8a6752]" />
                <span className="text-lg font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t border-black/10">
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition font-medium text-lg"
            >
              <LogOut className="w-6 h-6" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </div>
  );
}
