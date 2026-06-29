"use client";

import { YearApiResponse } from "@/lib/types/model/type";
import InventoryAndWarehouseFormLayout from "@/components/custom/admin/zone&form/inventory-and-warehouse-form-layout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ZoneAndFormLayoutComponent from "@/components/custom/admin/zone&form/zone-and-form-layout";
import { useZoneForm } from "../zone-form-context";

export function ZoneFormLayoutContent({
  children,
  yearRecords,
}: {
  children: React.ReactNode;
  yearRecords: YearApiResponse;
}) {
  const pathname = usePathname();

  const { selectedYear, setSelectedYear } = useZoneForm();

  const tabs = [
    { href: `/admin/zone-form-management/${selectedYear}/zone`, label: "Zone" },
    { href: `/admin/zone-form-management/${selectedYear}/form`, label: "Form" },
  ];

  return (
    <>
      <ZoneAndFormLayoutComponent
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        yearRecords={yearRecords}
      >
        <div className="px-10 py-6">
          {selectedYear ? (
            <>
              <div className="border-primary mb-6 flex rounded-xl border bg-amber-50 p-1">
                {tabs.map((tab) => {
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
      </ZoneAndFormLayoutComponent>
    </>
  );
}
