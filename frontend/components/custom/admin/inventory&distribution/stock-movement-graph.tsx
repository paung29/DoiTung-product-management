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

const data = [
  { month: "Jan", stockIn: 200, stockOut: 150, totalStock: 3000 },
  { month: "Feb", stockIn: 250, stockOut: 180, totalStock: 3100 },
  { month: "Mar", stockIn: 220, stockOut: 170, totalStock: 3050 },
  { month: "Apr", stockIn: 300, stockOut: 200, totalStock: 3200 },
  { month: "May", stockIn: 280, stockOut: 190, totalStock: 3300 },
  { month: "Jun", stockIn: 320, stockOut: 210, totalStock: 3400 },
  { month: "Jul", stockIn: 350, stockOut: 220, totalStock: 3500 },
  { month: "Aug", stockIn: 330, stockOut: 200, totalStock: 3600 },
  { month: "Sep", stockIn: 370, stockOut: 230, totalStock: 3700 },
  { month: "Oct", stockIn: 400, stockOut: 250, totalStock: 3800 },
  { month: "Nov", stockIn: 420, stockOut: 260, totalStock: 3900 },
  { month: "Dec", stockIn: 450, stockOut: 280, totalStock: 4000 },
];

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

export default function StockMovementGraph() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-linear-to-br from-amber-50 to-white p-6 shadow-sm">
      {/* Title */}
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        Stock Movement Over Time
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
