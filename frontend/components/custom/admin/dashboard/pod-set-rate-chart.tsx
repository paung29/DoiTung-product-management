"use client";

import {
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  ComposedChart,
} from "recharts";
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

// Mock data for pod set rate
const chartData = [
  {
    year: "2021-2022",
    goodPods: 4500,
    unsuccessfulPollination: 2000,
    defectivePods: 1200,
    totalPollinated: 5800,
  },
  {
    year: "2022-2023",
    goodPods: 6000,
    unsuccessfulPollination: 2500,
    defectivePods: 1800,
    totalPollinated: 9100,
  },
  {
    year: "2023-2024",
    goodPods: 10500,
    unsuccessfulPollination: 7000,
    defectivePods: 5200,
    totalPollinated: 22000,
  },
  {
    year: "2024-2025",
    goodPods: 5500,
    unsuccessfulPollination: 3000,
    defectivePods: 2000,
    totalPollinated: 12500,
  },
];

const chartConfig = {
  unsuccessfulPollination: {
    label: "Unsuccessful Pollination",
    color: "#fb923c",
  },
  defectivePods: {
    label: "Defective Pods",
    color: "#d946ef",
  },
  goodPods: {
    label: "Good Pods",
    color: "#1e3a8a",
  },
  totalPollinated: {
    label: "Total Pollinated",
    color: "#dc2626",
  },
} satisfies ChartConfig;

const CustomTooltip = (props: CustomTooltipProps) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const data = payload[0].payload as ChartDataPoint;
    const total =
      (data.goodPods || 0) +
      (data.unsuccessfulPollination || 0) +
      (data.defectivePods || 0);

    return (
      <div className="rounded-lg border border-gray-300 bg-white p-3 shadow-lg">
        <p className="font-semibold text-gray-900">{data.year}</p>
        <div className="mt-2 space-y-1 text-sm">
          {payload.map((entry: TooltipPayloadItem, index: number) => {
            const value = entry.value;
            let displayValue = value;

            // Check if this is the line chart value (totalPollinated)
            if (entry.name === "Total Pollinated") {
              displayValue = data.totalPollinated || 0;
            }

            return (
              <p key={index} style={{ color: entry.color }}>
                {entry.name}: {displayValue?.toLocaleString() || 0}
              </p>
            );
          })}
        </div>
        <p className="mt-2 border-t border-gray-200 pt-2 font-semibold text-gray-900">
          Total Bar: {total.toLocaleString()}
        </p>
      </div>
    );
  }

  return null;
};

export function PodSetRateChart() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Pod-Set Rate</h3>
        <p className="text-sm text-gray-600">
          Comparison of pod quality and pollination success across years
        </p>
      </div>

      <ChartContainer config={chartConfig} className="min-h-96 w-full">
        <ComposedChart
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
            dataKey="unsuccessfulPollination"
            stackId="a"
            fill={chartConfig.unsuccessfulPollination.color}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="defectivePods"
            stackId="a"
            fill={chartConfig.defectivePods.color}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="goodPods"
            stackId="a"
            fill={chartConfig.goodPods.color}
            radius={[4, 4, 0, 0]}
          />
          <Line
            type="monotone"
            dataKey="totalPollinated"
            stroke={chartConfig.totalPollinated.color}
            strokeWidth={2}
            dot={{ fill: chartConfig.totalPollinated.color, r: 5 }}
            activeDot={{ r: 7 }}
          />
        </ComposedChart>
      </ChartContainer>
    </div>
  );
}
