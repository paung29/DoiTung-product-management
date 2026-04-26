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

const data = [
  { grade: "A+", pods: 2800, weight: 600 },
  { grade: "A", pods: 4500, weight: 900 },
  { grade: "B", pods: 3500, weight: 700 },
  { grade: "C", pods: 2000, weight: 500 },
  { grade: "D+", pods: 1500, weight: 400 },
  { grade: "D", pods: 800, weight: 300 },
  { grade: "Rejected", pods: 1200, weight: 280 },
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

export default function GradeGraph() {
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
            <XAxis type="number" domain={[0, 6000]} stroke="#9ca3af" />
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
              name="Weight (kg)"
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
