"use client";

import { formatGrade, formatWeight } from "@/lib/types/model/function";
import { StockGradeSummary, WeightUnit } from "@/lib/types/model/type";

interface GradeSummaryCardProps {
  grade: string;
  percent: number;
  pods: number;
  weight: string;
  unit: WeightUnit;
}

function GradeCard({
  grade,
  percent,
  pods,
  weight,
  unit,
}: GradeSummaryCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-linear-to-br from-amber-50 to-white p-6 shadow-sm">
      {/* Top Row: Badge and Percentage */}
      <div className="mb-4 flex items-start justify-between">
        <div className="rounded-full bg-[#8a6752] px-4 py-1">
          <span className="text-sm font-semibold text-white">
            Grade {grade}
          </span>
        </div>
        <span className="text-sm font-semibold text-[#8a6752]">{percent}%</span>
      </div>

      {/* Middle: Number of Pods */}
      <p className="mb-3 text-sm text-gray-600">{pods.toLocaleString()} pods</p>

      {/* Bottom: Weight */}
      <p className="text-2xl font-bold text-[#8a6752]">
        {weight} {unit}
      </p>
    </div>
  );
}

export default function GradeSummary({
  grades,
  unit,
}: {
  grades: StockGradeSummary[];
  unit: WeightUnit;
}) {
  return (
    <div className="space-y-6">
      {/* Title */}
      <h2 className="text-lg font-normal text-gray-900">Grade Summary</h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {grades.map((item) => (
          <GradeCard
            key={item.grade}
            grade={formatGrade(item.grade)}
            percent={item.percentage}
            pods={item.total_pod}
            weight={formatWeight(item.total_gram, unit)}
            unit={unit}
          />
        ))}
      </div>
    </div>
  );
}
