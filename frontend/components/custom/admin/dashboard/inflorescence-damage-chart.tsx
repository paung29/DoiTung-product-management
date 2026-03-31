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

// Mock data for inflorescence damage rate
const chartData = [
  {
    year: "2021-2022",
    totalFlowerCluster: 12500,
    rottenFlowerCluster: 1875,
    damagedFlowerCluster: 1250,
    remainingFlowerCluster: 9375,
  },
  {
    year: "2022-2023",
    totalFlowerCluster: 14200,
    rottenFlowerCluster: 1704,
    damagedFlowerCluster: 1278,
    remainingFlowerCluster: 11218,
  },
  {
    year: "2023-2024",
    totalFlowerCluster: 15800,
    rottenFlowerCluster: 1580,
    damagedFlowerCluster: 1264,
    remainingFlowerCluster: 12956,
  },
];

const chartConfig = {
  totalFlowerCluster: {
    label: "Total Flower Cluster %",
    color: "#8b6f47",
  },
  rottenFlowerCluster: {
    label: "Rotten Flower Cluster %",
    color: "#7f1d1d",
  },
  damagedFlowerCluster: {
    label: "Damaged Flower Cluster %",
    color: "#f97316",
  },
  remainingFlowerCluster: {
    label: "Remaining Flower Cluster %",
    color: "#22c55e",
  },
} satisfies ChartConfig;

// Custom tooltip to show values and percentages
const CustomTooltip = (props: CustomTooltipProps) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const data = payload[0].payload as ChartDataPoint;
    const total =
      (data.totalFlowerCluster || 0) +
      (data.rottenFlowerCluster || 0) +
      (data.damagedFlowerCluster || 0) +
      (data.remainingFlowerCluster || 0);

    return (
      <div className="rounded-lg border border-gray-300 bg-white p-3 shadow-lg">
        <p className="font-semibold text-gray-900">{data.year}</p>
        <div className="mt-2 space-y-1 text-sm">
          {payload.map((entry: TooltipPayloadItem, index: number) => {
            const value = entry.value;
            const percentage = ((value / total) * 100).toFixed(1);
            return (
              <p key={index} style={{ color: entry.color }}>
                {entry.name}: {value.toLocaleString()} ({percentage}%)
              </p>
            );
          })}
        </div>
        <p className="mt-2 border-t border-gray-200 pt-2 font-semibold text-gray-900">
          Total: {total.toLocaleString()}
        </p>
      </div>
    );
  }

  return null;
};

export function InflorescenceDamageChart() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Inflorescence Damage Rate
        </h3>
        <p className="text-sm text-gray-600">
          Comparison of flower cluster health and damage rates across years
        </p>
      </div>

      <ChartContainer config={chartConfig} className="min-h-72 w-full">
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
              value: "Total Flower Clusters",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />
          <ChartTooltip content={<CustomTooltip />} />
          <ChartLegend content={<ChartLegendContent />} />

          <Bar
            dataKey="totalFlowerCluster"
            stackId="a"
            fill={chartConfig.totalFlowerCluster.color}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="rottenFlowerCluster"
            stackId="a"
            fill={chartConfig.rottenFlowerCluster.color}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="damagedFlowerCluster"
            stackId="a"
            fill={chartConfig.damagedFlowerCluster.color}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="remainingFlowerCluster"
            stackId="a"
            fill={chartConfig.remainingFlowerCluster.color}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
