"use client"

import { YearApiResponse } from "@/lib/types/model/type";
import { useInventory } from "./inventory-context";
import InventoryAndWarehouseFormLayout from "@/components/custom/admin/zone&form/inventory-and-warehouse-form-layout";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/admin/inventory-distribution", label: "Stock Overview" },
  { href: "/admin/inventory-distribution/warehouse", label: "Warehouse" },
  { href: "/admin/inventory-distribution/distribution", label: "Stock Distribution" },
  { href: "/admin/inventory-distribution/history", label: "Distribution History" },
  { href: "/admin/inventory-distribution/customer", label: "Customer" },
];

export function InventoryLayoutContent({
  children,
  yearRecords,
}: {
  children: React.ReactNode;
  yearRecords: YearApiResponse;
}) {
  const pathname = usePathname();

  const { selectedYear, setSelectedYear } = useInventory();

  return (
    <>
      <InventoryAndWarehouseFormLayout
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        yearRecords={yearRecords}
      >
        <div className="px-10 py-6">
            {selectedYear ? (
                <>
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
                </>
            ) : (
                <div className="py-6 text-gray-500">
                Please select a year first.
                </div>
            )}
        </div>

      </InventoryAndWarehouseFormLayout>

    </>
  );
}