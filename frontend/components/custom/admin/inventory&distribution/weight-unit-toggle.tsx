"use client";

import { WeightUnit } from "@/lib/types/model/type";

const units: WeightUnit[] = ["g", "kg"];

export default function WeightUnitToggle({
  unit,
  onChange,
}: {
  unit: WeightUnit;
  onChange: (unit: WeightUnit) => void;
}) {
  return (
    <div className="border-primary inline-flex rounded-lg border bg-amber-50 p-1">
      {units.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={`rounded-md px-5 py-1.5 text-sm font-semibold transition-all ${
            unit === item
              ? "bg-primary text-white shadow-sm"
              : "text-primary hover:bg-amber-100"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
