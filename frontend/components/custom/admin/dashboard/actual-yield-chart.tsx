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
  type CustomTooltipProps,
} from "@/lib/types/model/type";

// Mock data for actual yield per pole
const chartData = [
  {
    year: "64/65",
    freshYield: 450,
    driedYield: 180,
  },
  {
    year: "65/66",
    freshYield: 520,
    driedYield: 210,
  },
  {
    year: "66/67",
    freshYield: 580,
    driedYield: 235,
  },
  {
    year: "67/68",
    freshYield: 620,
    driedYield: 250,
  },
];

const chartConfig = {
  freshYield: {
    label: "Fresh Yield",
    color: "#8b6f47",
  },
  driedYield: {
    label: "Dried Yield",
    color: "#f97316",
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
          <p style={{ color: chartConfig.freshYield.color }}>
            Fresh Yield: {(data.freshYield || 0).toLocaleString()} g
          </p>
          <p style={{ color: chartConfig.driedYield.color }}>
            Dried Yield: {(data.driedYield || 0).toLocaleString()} g
          </p>
        </div>
      </div>
    );
  }

  return null;
};

// Custom label component for displaying values on top of bars
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderLabel = (props: any) => {
  const { x, y, width, value } = props;
  return (
    <text
      x={x + width / 2}
      y={y - 5}
      fill="#374151"
      textAnchor="middle"
      fontSize="12"
      fontWeight="500"
    >
      {value}g
    </text>
  );
};

export function ActualYieldChart() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Actual Yield per Pole
        </h3>
        <p className="text-sm text-gray-600">
          Fresh and dried yield production across fiscal years
        </p>
      </div>

      <ChartContainer config={chartConfig} className="min-h-96 w-full">
        <BarChart
          data={chartData}
          margin={{ top: 40, right: 30, left: 0, bottom: 0 }}
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
              value: "Yield per pole (grams)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />
          <ChartTooltip content={<CustomTooltip />} />
          <ChartLegend content={<ChartLegendContent />} />

          <Bar
            dataKey="freshYield"
            fill={chartConfig.freshYield.color}
            radius={[4, 4, 0, 0]}
            label={renderLabel}
          />
          <Bar
            dataKey="driedYield"
            fill={chartConfig.driedYield.color}
            radius={[4, 4, 0, 0]}
            label={renderLabel}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
