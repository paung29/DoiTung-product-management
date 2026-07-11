"use client";

import { useEffect, useState } from "react";

import GradeGraph from "@/components/custom/admin/inventory&distribution/grade-graph";
import GradeSummary from "@/components/custom/admin/inventory&distribution/grade-summary-card";
import StockMovementGraph from "@/components/custom/admin/inventory&distribution/stock-movement-graph";
import StockOverviewCards from "@/components/custom/admin/inventory&distribution/stock-overview-card";
import WeightUnitToggle from "@/components/custom/admin/inventory&distribution/weight-unit-toggle";
import ApiErrorUI from "@/components/custom/common/error-handle";

import { StockOverview, WeightUnit } from "@/lib/types/model/type";
import { getStockOverviewByYear } from "@/lib/server-actions/admin/stock-overview-client";
import { useInventory } from "./inventory-context";

export default function InventoryAndWarehouses() {
  const { selectedYear } = useInventory();

  const [data, setData] = useState<StockOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<WeightUnit>("g");

  // Refetch the stock overview whenever the selected year changes.
  useEffect(() => {
    if (!selectedYear) return;

    let active = true;

    (async () => {
      setError(null);

      try {
        const res = await getStockOverviewByYear(selectedYear);
        if (!active) return;

        if (res && res.success === false) {
          setError(res.message || "Failed to load stock overview");
          setData(null);
        } else {
          setData(res as StockOverview);
        }
      } catch {
        if (active) {
          setError("Failed to connect to server");
          setData(null);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [selectedYear]);

  const grades = data?.grade_summary ?? [];

  return (
    <>
      <ApiErrorUI message={error} />

      {/* Weight unit switch, applied to every weight on this screen */}
      <div className="mb-6 flex justify-end">
        <WeightUnitToggle unit={unit} onChange={setUnit} />
      </div>

      <StockOverviewCards data={data} unit={unit} />

      <div className="my-6 grid grid-cols-2 gap-6">
        <GradeGraph grades={grades} unit={unit} />

        <GradeSummary grades={grades} unit={unit} />
      </div>

      <StockMovementGraph months={data?.monthly_summary ?? []} unit={unit} />
    </>
  );
}
