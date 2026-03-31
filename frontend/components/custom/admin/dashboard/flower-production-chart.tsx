"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/components/ui/chart";
import { type CustomTooltipProps } from "@/lib/types/model/type";

// Chart configuration with meaningful colors
const chartConfig = {
  totalFlowers: { label: "Total Flowers", color: "#8b6f47" },
  goodFlowers: { label: "Good Flowers", color: "#22c55e" },
  deadFlowers: { label: "Dead Flowers", color: "#ef4444" },
  damageFlowers: { label: "Damage Flowers", color: "#f97316" },
};

// Mock data for flower production trend
const chartData = [
  {
    year: "2021-2022",
    totalFlowers: 34200,
    goodFlowers: 28000,
    deadFlowers: 3200,
    damageFlowers: 3000,
  },
  {
    year: "2022-2023",
    totalFlowers: 38500,
    goodFlowers: 31200,
    deadFlowers: 4100,
    damageFlowers: 3200,
  },
  {
    year: "2023-2024",
    totalFlowers: 42100,
    goodFlowers: 35000,
    deadFlowers: 4200,
    damageFlowers: 2900,
  },
];

const CustomTooltip = (props: CustomTooltipProps) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-md">
        <p className="font-semibold text-gray-900">
          {payload[0]?.payload?.year}
        </p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value?.toLocaleString() || 0}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export function FlowerProductionChart() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Flower Production Trend
        </h3>
        <p className="text-sm text-gray-600">
          Grouped comparison of flower production categories across years
        </p>
      </div>

      <ChartContainer config={chartConfig} className="min-h-96 w-full">
        <BarChart
          data={chartData}
          margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="year"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis
            label={{
              value: "Total Flowers",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />
          <ChartTooltip content={<CustomTooltip />} />
          <ChartLegend content={<ChartLegendContent />} />

          <Bar
            dataKey="totalFlowers"
            fill={chartConfig.totalFlowers.color}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="goodFlowers"
            fill={chartConfig.goodFlowers.color}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="deadFlowers"
            fill={chartConfig.deadFlowers.color}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="damageFlowers"
            fill={chartConfig.damageFlowers.color}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
