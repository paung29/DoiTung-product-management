"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { formatGrade, toWeight } from "@/lib/types/model/function";
import { StockGradeSummary, WeightUnit } from "@/lib/types/model/type";

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-md">
        {payload.map((entry, index) => (
          <p
            key={index}
            style={{ color: entry.color }}
            className="text-sm font-medium"
          >
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function GradeGraph({
  grades,
  unit,
}: {
  grades: StockGradeSummary[];
  unit: WeightUnit;
}) {
  const data = grades.map((item) => ({
    grade: formatGrade(item.grade),
    pods: item.total_pod,
    weight: toWeight(item.total_gram, unit),
  }));

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Title */}
      <h2 className="mb-6 text-lg font-normal text-gray-900">
        Stock Distribution by Grade
      </h2>

      {/* Chart Container */}
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#d4a574"
              opacity={0.5}
              horizontal={false}
            />
            <XAxis type="number" domain={[0, "auto"]} stroke="#9ca3af" />
            <YAxis dataKey="grade" type="category" stroke="#9ca3af" />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ paddingTop: "24px" }}
              iconType="square"
            />
            <Bar
              dataKey="pods"
              fill="#8a6752"
              name="Number of Pods"
              radius={[0, 8, 8, 0]}
            />
            <Bar
              dataKey="weight"
              fill="#d4a574"
              name={`Weight (${unit})`}
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
