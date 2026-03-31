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

// Mock data for dried pod quantity by grade
const chartData = [
  {
    year: "2020-2021",
    gradeA: 10,
    gradeB: 15,
    gradeBPlus: 5,
    gradeC: 2,
  },
  {
    year: "2021-2022",
    gradeA: 35,
    gradeB: 30,
    gradeBPlus: 10,
    gradeC: 5,
  },
  {
    year: "2022-2023",
    gradeA: 80,
    gradeB: 60,
    gradeBPlus: 40,
    gradeC: 20,
  },
  {
    year: "2023-2024",
    gradeA: 70,
    gradeB: 35,
    gradeBPlus: 15,
    gradeC: 5,
  },
  {
    year: "2024-2025",
    gradeA: 0,
    gradeB: 0,
    gradeBPlus: 0,
    gradeC: 0,
  },
];

const chartConfig = {
  gradeA: {
    label: "Grade A",
    color: "#0f766e",
  },
  gradeB: {
    label: "Grade B",
    color: "#10b981",
  },
  gradeBPlus: {
    label: "Grade B+",
    color: "#34d399",
  },
  gradeC: {
    label: "Grade C",
    color: "#fcd34d",
  },
} satisfies ChartConfig;

const CustomTooltip = (props: CustomTooltipProps) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const data = payload[0].payload as ChartDataPoint;
    const gradeA = data.gradeA || 0;
    const gradeB = data.gradeB || 0;
    const gradeBPlus = data.gradeBPlus || 0;
    const gradeC = data.gradeC || 0;
    const total = gradeA + gradeB + gradeBPlus + gradeC;

    return (
      <div className="rounded-lg border border-gray-300 bg-white p-3 shadow-lg">
        <p className="font-semibold text-gray-900">{data.year}</p>
        <div className="mt-2 space-y-1 text-sm">
          <p style={{ color: chartConfig.gradeA.color }}>
            Grade A: {gradeA.toLocaleString()} kg
          </p>
          <p style={{ color: chartConfig.gradeB.color }}>
            Grade B: {gradeB.toLocaleString()} kg
          </p>
          <p style={{ color: chartConfig.gradeBPlus.color }}>
            Grade B+: {gradeBPlus.toLocaleString()} kg
          </p>
          <p style={{ color: chartConfig.gradeC.color }}>
            Grade C: {gradeC.toLocaleString()} kg
          </p>
          <p className="border-t border-gray-200 pt-1 font-semibold text-gray-900">
            Total: {total.toLocaleString()} kg
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export function DriedQuantityChart() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Dried Pod Quantity (kg)
        </h3>
        <p className="text-sm text-gray-600">
          Distribution of dried pods by grade across years
        </p>
      </div>

      <ChartContainer config={chartConfig} className="min-h-96 w-full">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
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
            dataKey="gradeA"
            stackId="a"
            fill={chartConfig.gradeA.color}
            radius={0}
          />
          <Bar
            dataKey="gradeB"
            stackId="a"
            fill={chartConfig.gradeB.color}
            radius={0}
          />
          <Bar
            dataKey="gradeBPlus"
            stackId="a"
            fill={chartConfig.gradeBPlus.color}
            radius={0}
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
