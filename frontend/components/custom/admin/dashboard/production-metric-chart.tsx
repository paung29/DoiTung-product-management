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

// Mockdata
const chartData = [
  {
    year: "2021-2022",
    totalPods: 15200,
    abnormalPods: 1520,
  },
  {
    year: "2022-2023",
    totalPods: 18500,
    abnormalPods: 1480,
  },
  {
    year: "2023-2024",
    totalPods: 21800,
    abnormalPods: 1310,
  },
];

const chartConfig = {
  totalPods: {
    label: "Total Pods",
    color: "#8b6f47",
  },
  abnormalPods: {
    label: "Abnormal Pods",
    color: "#ef4444",
  },
} satisfies ChartConfig;

const CustomTooltip = (props: CustomTooltipProps) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const data = payload[0].payload as ChartDataPoint;
    const total = (data.totalPods || 0) + (data.abnormalPods || 0);

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

export function ProductionMetricChart() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Pod Overview</h3>
        <p className="text-sm text-gray-600">
          Stacked comparison of total pods and abnormal pods across years
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
              value: "Total Pods",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />
          <ChartTooltip content={<CustomTooltip />} />
          <ChartLegend content={<ChartLegendContent />} />

          <Bar
            dataKey="totalPods"
            stackId="a"
            fill={chartConfig.totalPods.color}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="abnormalPods"
            stackId="a"
            fill={chartConfig.abnormalPods.color}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
