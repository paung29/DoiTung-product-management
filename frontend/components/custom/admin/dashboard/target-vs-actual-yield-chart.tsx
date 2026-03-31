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
  type CustomTooltipProps,
} from "@/lib/types/model/type";

// Mock data
const chartData = [
  {
    year: "64/65",
    driedYield: 180,
    targetYield: 200,
  },
  {
    year: "65/66",
    driedYield: 210,
    targetYield: 215,
  },
  {
    year: "66/67",
    driedYield: 235,
    targetYield: 230,
  },
  {
    year: "67/68",
    driedYield: 250,
    targetYield: 260,
  },
];

const chartConfig = {
  driedYield: {
    label: "Actual Yield",
    color: "#f97316",
  },
  targetYield: {
    label: "Target Yield",
    color: "#dc2626",
  },
} satisfies ChartConfig;

const CustomTooltip = (props: CustomTooltipProps) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const data = payload[0].payload as ChartDataPoint;
    const actualYield = data.driedYield || 0;
    const targetYield = data.targetYield || 0;

    let percentageDiff = 0;
    let status = "On track";

    if (targetYield > 0) {
      percentageDiff = ((actualYield - targetYield) / targetYield) * 100;
      if (actualYield >= targetYield) {
        status = `+${percentageDiff.toFixed(1)}% (Above target)`;
      } else {
        status = `${percentageDiff.toFixed(1)}% (Below target)`;
      }
    }

    return (
      <div className="rounded-lg border border-gray-300 bg-white p-3 shadow-lg">
        <p className="font-semibold text-gray-900">{data.year}</p>
        <div className="mt-2 space-y-1 text-sm">
          <p style={{ color: chartConfig.driedYield.color }}>
            Actual Yield: {actualYield.toLocaleString()} g
          </p>
          <p style={{ color: chartConfig.targetYield.color }}>
            Target Yield: {targetYield.toLocaleString()} g
          </p>
        </div>
        <p className="mt-2 border-t border-gray-200 pt-2 text-sm font-semibold text-gray-900">
          {status}
        </p>
      </div>
    );
  }

  return null;
};

// Custom label component for displaying values on bar and line
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderBarLabel = (props: any) => {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderLineLabel = (props: any) => {
  const { x, y, value } = props;
  return (
    <text
      x={x}
      y={y - 10}
      fill="#dc2626"
      textAnchor="middle"
      fontSize="12"
      fontWeight="500"
    >
      {value}g
    </text>
  );
};

export function TargetVsActualYieldChart() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Target vs Actual Yield
        </h3>
        <p className="text-sm text-gray-600">
          Comparison of actual yield performance against target yields
        </p>
      </div>

      <ChartContainer config={chartConfig} className="min-h-96 w-full">
        <ComposedChart
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
            dataKey="driedYield"
            fill={chartConfig.driedYield.color}
            radius={[4, 4, 0, 0]}
            label={renderBarLabel}
          />
          <Line
            type="monotone"
            dataKey="targetYield"
            stroke={chartConfig.targetYield.color}
            strokeWidth={2}
            dot={{ fill: chartConfig.targetYield.color, r: 5 }}
            activeDot={{ r: 7 }}
            label={renderLineLabel}
          />
        </ComposedChart>
      </ChartContainer>
    </div>
  );
}
