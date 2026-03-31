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

// Mock data for difference between fresh and dried pods
const chartData = [
  {
    year: "2020-2021",
    freshPodBeforeProcessing: 800,
    driedPodAfterProcessing: 200,
  },
  {
    year: "2021-2022",
    freshPodBeforeProcessing: 6200,
    driedPodAfterProcessing: 5800,
  },
  {
    year: "2022-2023",
    freshPodBeforeProcessing: 1800,
    driedPodAfterProcessing: 14500,
  },
  {
    year: "2023-2024",
    freshPodBeforeProcessing: 3000,
    driedPodAfterProcessing: 6700,
  },
  {
    year: "2024-2025",
    freshPodBeforeProcessing: 1500,
    driedPodAfterProcessing: 1200,
  },
];

const chartConfig = {
  driedPodAfterProcessing: {
    label: "Dried Pod After Processing",
    color: "#dc2626",
  },
  freshPodBeforeProcessing: {
    label: "Fresh Pod Before Processing",
    color: "#10b981",
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
          <p style={{ color: chartConfig.driedPodAfterProcessing.color }}>
            Dried Pod After Processing:{" "}
            {(data.driedPodAfterProcessing || 0).toLocaleString()} kg
          </p>
          <p style={{ color: chartConfig.freshPodBeforeProcessing.color }}>
            Fresh Pod Before Processing:{" "}
            {(data.freshPodBeforeProcessing || 0).toLocaleString()} kg
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export function DriedVsFreshChart() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Difference Between Fresh Pods and Dried Pods
        </h3>
        <p className="text-sm text-gray-600">
          Comparison of fresh pod quantities before processing and dried pod
          quantities after processing
        </p>
      </div>

      <ChartContainer config={chartConfig} className="min-h-64 w-full">
        <BarChart
          data={chartData}
          margin={{ top: 15, right: 20, left: 0, bottom: 0 }}
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
              value: "Quantity (kg)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />
          <ChartTooltip content={<CustomTooltip />} />
          <ChartLegend content={<ChartLegendContent />} />

          <Bar
            dataKey="driedPodAfterProcessing"
            fill={chartConfig.driedPodAfterProcessing.color}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="freshPodBeforeProcessing"
            fill={chartConfig.freshPodBeforeProcessing.color}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
