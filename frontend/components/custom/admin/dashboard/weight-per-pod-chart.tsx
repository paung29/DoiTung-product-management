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

// Mock data for weight per pod comparison
const chartData = [
  {
    year: "2021-2022",
    estimatedWeightPerPod: 28,
    actualWeightPerPod: 26,
  },
  {
    year: "2022-2023",
    estimatedWeightPerPod: 30,
    actualWeightPerPod: 32,
  },
  {
    year: "2023-2024",
    estimatedWeightPerPod: 32,
    actualWeightPerPod: 30,
  },
  {
    year: "2024-2025",
    estimatedWeightPerPod: 35,
    actualWeightPerPod: 36,
  },
];

const chartConfig = {
  estimatedWeightPerPod: {
    label: "Estimated Weight per Pod",
    color: "#fed7aa",
  },
  actualWeightPerPod: {
    label: "Actual Weight per Pod",
    color: "#ea580c",
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
          <p style={{ color: chartConfig.estimatedWeightPerPod.color }}>
            Estimated Weight per Pod:{" "}
            {(data.estimatedWeightPerPod || 0).toLocaleString()} g
          </p>
          <p style={{ color: chartConfig.actualWeightPerPod.color }}>
            Actual Weight per Pod:{" "}
            {(data.actualWeightPerPod || 0).toLocaleString()} g
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
      {value.toLocaleString()}g
    </text>
  );
};

export function WeightPerPodChart() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Weight per Pod Comparison (Yearly)
        </h3>
        <p className="text-sm text-gray-600">
          Comparison of estimated and actual weight per pod over years
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
              value: "Weight (grams)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />
          <ChartTooltip content={<CustomTooltip />} />
          <ChartLegend content={<ChartLegendContent />} />

          <Bar
            dataKey="estimatedWeightPerPod"
            fill={chartConfig.estimatedWeightPerPod.color}
            radius={[4, 4, 0, 0]}
            label={renderLabel}
          />
          <Bar
            dataKey="actualWeightPerPod"
            fill={chartConfig.actualWeightPerPod.color}
            radius={[4, 4, 0, 0]}
            label={renderLabel}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
