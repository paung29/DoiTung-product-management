"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SelectYearCard from "@/components/custom/admin/inventory&distribution/select-year-card";
import { useState } from "react";

const tabs = [
  { href: "/admin/inventory-distribution", label: "Stock Overview" },
  { href: "/admin/inventory-distribution/warehouse", label: "Warehouse" },
  { href: "/admin/inventory-distribution/distribution", label: "Stock Distribution" },
  { href: "/admin/inventory-distribution/history", label: "Distribution History" },
  { href: "/admin/inventory-distribution/customer", label: "Customer" },
];

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [year, setYear] = useState("2026");

  const isStockOverviewPage = pathname === "/admin/inventory-distribution";

  return (
    <>
      
        <SelectYearCard
          title="Inventory And Warehouse"
          year={year}
          onYearChange={setYear}
        />

      <div className="px-10 py-6">
        <div className="flex gap-3 border-b">
          {tabs.map((tab) => {
            const active = pathname === tab.href;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-4 py-2 text-sm font-medium ${
                  active
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        <div className="py-6">{children}</div>
      </div>
    </>
  );
}