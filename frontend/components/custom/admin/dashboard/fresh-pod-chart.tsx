"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  type ChartDataPoint,
  type TooltipPayloadItem,
  type CustomTooltipProps,
} from "@/lib/types/model/type";

// Mock data for fresh pod quantity
const chartData = [
  {
    year: "2021-2022",
    gradeD: 15000,
    gradeD_plus: 28000,
    gradeA: 42000,
    gradeA_plus: 12000,
    gradeB: 2000,
    gradeC: 1000,
  },
  {
    year: "2022-2023",
    gradeD: 22000,
    gradeD_plus: 38000,
    gradeA: 58000,
    gradeA_plus: 18000,
    gradeB: 3000,
    gradeC: 1500,
  },
  {
    year: "2023-2024",
    gradeD: 32000,
    gradeD_plus: 52000,
    gradeA: 85000,
    gradeA_plus: 28000,
    gradeB: 5000,
    gradeC: 2000,
  },
  {
    year: "2024-2025",
    gradeD: 28000,
    gradeD_plus: 45000,
    gradeA: 72000,
    gradeA_plus: 22000,
    gradeB: 4000,
    gradeC: 1500,
  },
];

const chartConfig = {
  gradeD: {
    label: "Grade D",
    color: "#1e40af",
  },
  gradeD_plus: {
    label: "Grade D+",
    color: "#0ea5e9",
  },
  gradeA: {
    label: "Grade A",
    color: "#10b981",
  },
  gradeA_plus: {
    label: "Grade A+",
    color: "#34d399",
  },
  gradeB: {
    label: "Grade B",
    color: "#f59e0b",
  },
  gradeC: {
    label: "Grade C",
    color: "#ef4444",
  },
} satisfies ChartConfig;

const CustomTooltip = (props: CustomTooltipProps) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const data = payload[0].payload as ChartDataPoint;
    const total =
      (data.gradeD || 0) +
      (data.gradeD_plus || 0) +
      (data.gradeA || 0) +
      (data.gradeA_plus || 0) +
      (data.gradeB || 0) +
      (data.gradeC || 0);

    return (
      <div className="rounded-lg border border-gray-300 bg-white p-3 shadow-lg">
        <p className="font-semibold text-gray-900">{data.year}</p>
        <div className="mt-2 space-y-1 text-sm">
          {payload.map((entry: TooltipPayloadItem, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value?.toLocaleString() || 0} kg
            </p>
          ))}
        </div>
        <p className="mt-2 border-t border-gray-200 pt-2 font-semibold text-gray-900">
          Total: {total.toLocaleString()} kg
        </p>
      </div>
    );
  }

  return null;
};

export function FreshPodChart() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Fresh Pod Quantity (kg)
        </h3>
        <p className="text-sm text-gray-600">
          Stacked comparison of pod grades by weight across years
        </p>
      </div>

      <ChartContainer config={chartConfig} className="min-h-96 w-full">
        <BarChart
          data={chartData}
          margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
          barCategoryGap="20%"
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
              value: "Weight (kg)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />
          <ChartTooltip content={<CustomTooltip />} />
          <ChartLegend content={<ChartLegendContent />} />

          <Bar
            dataKey="gradeD"
            stackId="a"
            fill={chartConfig.gradeD.color}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="gradeD_plus"
            stackId="a"
            fill={chartConfig.gradeD_plus.color}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="gradeA"
            stackId="a"
            fill={chartConfig.gradeA.color}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="gradeA_plus"
            stackId="a"
            fill={chartConfig.gradeA_plus.color}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="gradeB"
            stackId="a"
            fill={chartConfig.gradeB.color}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="gradeC"
            stackId="a"
            fill={chartConfig.gradeC.color}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
