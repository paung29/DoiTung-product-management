"use client";

import { YearApiResponse } from "@/lib/types/model/type";
import { useInventory } from "./inventory-context";
import InventoryAndWarehouseFormLayout from "@/components/custom/admin/zone&form/inventory-and-warehouse-form-layout";
import BackButton from "@/components/custom/common/back-button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const inventoryRoot = "/admin/inventory-distribution";

const tabs = (year: string) => [
  { href: "/admin/inventory-distribution", label: "Stock Overview" },
  {
    href: `/admin/inventory-distribution/${year}/warehouse`,
    label: "Warehouse",
  },
  {
    href: `/admin/inventory-distribution/${year}/distribution`,
    label: "Stock Distribution",
  },
  {
    href: `/admin/inventory-distribution/${year}/history`,
    label: "Distribution History",
  },
  { href: `/admin/inventory-distribution/${year}/customer`, label: "Customer" },
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
              {pathname !== inventoryRoot && (
                <div className="mb-4 flex justify-end">
                  <BackButton fallbackHref={inventoryRoot} />
                </div>
              )}

              <div className="border-primary mb-6 flex rounded-xl border bg-amber-50 p-1">
                {tabs(selectedYear).map((tab) => {
                  const active = pathname === tab.href;

                  return (
                    <Link
                      key={tab.href}
                      href={tab.href}
                      className={`flex-1 rounded-lg px-6 py-3 text-center font-semibold transition-all ${
                        active
                          ? "bg-primary text-white shadow-sm"
                          : "text-primary hover:bg-amber-100"
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
