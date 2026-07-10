"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { toWeight } from "@/lib/types/model/function";
import { StockMonthlySummary, WeightUnit } from "@/lib/types/model/type";

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

export default function StockMovementGraph({
  months,
  unit,
}: {
  months: StockMonthlySummary[];
  unit: WeightUnit;
}) {
  const data = months.map((item) => ({
    month: item.month_name,
    stockIn: toWeight(item.stock_in_weight, unit),
    stockOut: toWeight(item.stock_out_weight, unit),
    totalStock: toWeight(item.total_weight, unit),
  }));

  return (
    <div className="rounded-2xl border border-gray-200 bg-linear-to-br from-amber-50 to-white p-6 shadow-sm">
      {/* Title */}
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        Stock Movement Over Time ({unit})
      </h2>

      {/* Chart Container */}
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#d4a574"
              opacity={0.3}
            />
            <XAxis
              dataKey="month"
              stroke="#9ca3af"
              style={{ fontSize: "12px" }}
            />
            <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ paddingTop: "24px" }}
            />
            <Line
              type="monotone"
              dataKey="stockIn"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ fill: "#22c55e", r: 4 }}
              activeDot={{ r: 6 }}
              name="Stock In"
            />
            <Line
              type="monotone"
              dataKey="stockOut"
              stroke="#f97316"
              strokeWidth={2}
              dot={{ fill: "#f97316", r: 4 }}
              activeDot={{ r: 6 }}
              name="Stock Out"
            />
            <Line
              type="monotone"
              dataKey="totalStock"
              stroke="#8a6752"
              strokeWidth={3}
              dot={{ fill: "#8a6752", r: 4 }}
              activeDot={{ r: 6 }}
              name="Total Stock"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
