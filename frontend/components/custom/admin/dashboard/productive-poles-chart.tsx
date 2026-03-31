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

// Mock data for number of productive poles
const chartData = [
  {
    year: "2021-2022",
    nonproductivePoles: 897,
    productivePoles: 4299,
  },
  {
    year: "2022-2023",
    nonproductivePoles: 1752,
    productivePoles: 3404,
  },
  {
    year: "2023-2024",
    nonproductivePoles: 3350,
    productivePoles: 1806,
  },
  {
    year: "2024-2025",
    nonproductivePoles: 3249,
    productivePoles: 1907,
  },
];

const chartConfig = {
  nonproductivePoles: {
    label: "Non-productive Poles",
    color: "#84cc16",
  },
  productivePoles: {
    label: "Productive Poles",
    color: "#10b981",
  },
} satisfies ChartConfig;

const CustomTooltip = (props: CustomTooltipProps) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const data = payload[0].payload as ChartDataPoint;
    const total = (data.nonproductivePoles || 0) + (data.productivePoles || 0);

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
        <p className="mt-2 border-t border-gray-200 pt-2 font-semibold text-gray-900">
          Total: {total.toLocaleString()}
        </p>
      </div>
    );
  }

  return null;
};

export function ProductivePolesChart() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Number of Productive Poles
        </h3>
        <p className="text-sm text-gray-600">
          Stacked comparison of productive and non-productive poles across years
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
              value: "Number of Poles",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />
          <ChartTooltip content={<CustomTooltip />} />
          <ChartLegend content={<ChartLegendContent />} />

          <Bar
            dataKey="nonproductivePoles"
            stackId="a"
            fill={chartConfig.nonproductivePoles.color}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="productivePoles"
            stackId="a"
            fill={chartConfig.productivePoles.color}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
