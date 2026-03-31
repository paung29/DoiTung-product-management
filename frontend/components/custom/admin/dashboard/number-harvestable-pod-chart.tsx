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

// Mock data for number of harvestable pods
const chartData = [
  {
    year: "2021-2022",
    totalPods: 18000,
    goodPods: 12000,
    harvestedPods: 10500,
  },
  {
    year: "2022-2023",
    totalPods: 62000,
    goodPods: 52000,
    harvestedPods: 45000,
  },
  {
    year: "2023-2024",
    totalPods: 175000,
    goodPods: 168000,
    harvestedPods: 150000,
  },
  {
    year: "2024-2025",
    totalPods: 100000,
    goodPods: 95000,
    harvestedPods: 55000,
  },
];

const chartConfig = {
  totalPods: {
    label: "Total Pods",
    color: "#1e3a8a",
  },
  goodPods: {
    label: "Good Pods",
    color: "#fbbf24",
  },
  harvestedPods: {
    label: "Harvested Pods",
    color: "#e9d5ff",
  },
} satisfies ChartConfig;

const CustomTooltip = (props: CustomTooltipProps) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const data = payload[0].payload as ChartDataPoint;

    return (
      <div className="rounded-lg border border-gray-300 bg-white p-3 shadow-lg">
        <p className="font-semibold text-gray-900">{data.year}</p>
        <div className="mt-2 space-y-1 text-sm">
          {payload.map((entry: TooltipPayloadItem, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value?.toLocaleString() || 0}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export function NumberHarvestablePodChart() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Number of Harvestable Pods
        </h3>
        <p className="text-sm text-gray-600">
          Grouped comparison of total, good, and harvested pods across years
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
              value: "Number of Pods",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />
          <ChartTooltip content={<CustomTooltip />} />
          <ChartLegend content={<ChartLegendContent />} />

          <Bar
            dataKey="totalPods"
            fill={chartConfig.totalPods.color}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="goodPods"
            fill={chartConfig.goodPods.color}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="harvestedPods"
            fill={chartConfig.harvestedPods.color}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
