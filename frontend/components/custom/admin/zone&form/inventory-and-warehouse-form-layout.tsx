"use client";
import { ChevronDown, Layers } from "lucide-react";
import React, { ReactNode, useState } from "react";
import YearPickerDialog from "./year/year-pick-dialogue";
import { usePathname, useRouter } from "next/navigation";
import { YearApiResponse } from "@/lib/types/model/type";

type Props = {
  children?: ReactNode;
  selectedYear?: string;
  setSelectedYear?: (year: string) => void;
  isYearTab?: boolean;
  yearRecords : YearApiResponse
};

function InventoryAndWarehouseFormLayout({
  children,
  selectedYear,
  setSelectedYear,
  isYearTab,
  yearRecords
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(selectedYear);

  const handleConfirmYear = (year: string) => {
    setOpen(false);
    setYear(year);
    setSelectedYear && setSelectedYear(year);

    const currentTab = pathname.includes("/warehouse")
    ? "warehouse"
    : pathname.includes("/distribution")
    ? "distribution"
    : pathname.includes("/history")
    ? "history"
    : pathname.includes("/customer")
    ? "customer"
    : "";

    router.push(currentTab ? `/admin/inventory-distribution/${year}/${currentTab}`
                            : `/admin/inventory-distribution/${year}/warehouse`);
  };

  return (
    <div className="min-h-screen w-full px-20 py-10">
      <div className="bg-secondary flex h-[160px] w-full flex-col items-center justify-between rounded-2xl p-5 drop-shadow-2xl md:flex-row md:pr-30 md:pl-10">
        <div className="text-primary-button flex flex-col lg:gap-2">
          <div className="flex flex-row items-center gap-2">
            <Layers className="size-10" />
            <p className="text-xl font-semibold lg:text-2xl">
              Management Center
            </p>
          </div>

          <p className="hidden lg:flex">
            Inventory And Warehouse
          </p>
        </div>

        {isYearTab || (
          <div className="bg-primary-button flex h-[120px] w-[180px] flex-col items-center justify-between rounded-2xl p-4">
            <p className="text-lg font-semibold text-white">Active Year</p>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-[50px] w-full items-center justify-center rounded-2xl bg-white px-4 text-lg font-semibold text-black shadow-md"
            >
              <div className="flex items-center gap-2">
                {year || "Select"}
                <ChevronDown className="size-6 items-end" />
              </div>
            </button>
          </div>
        )}
      </div>
      <div className="mt-6">
        {children}
        <YearPickerDialog
          yearRecords={yearRecords}
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={handleConfirmYear}
          defaultYear={year}
        />
      </div>
    </div>
  );
}

export default InventoryAndWarehouseFormLayout;

;
