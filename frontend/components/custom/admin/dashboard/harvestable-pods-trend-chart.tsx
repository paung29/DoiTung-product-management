"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  type CustomTooltipProps,
  type HarvestablePodsTrendItem,
  type HarvestablePodsTrendResponse,
} from "@/lib/types/model/type";
import { getHarvestablePodsTrend } from "@/lib/server-actions/admin/dashboard-client";
import { chartPalette } from "./chart-palette";

type HarvestablePodsPoint = {
  year: string;
  remainingPods: number;
  lostPodsBeforeHarvest: number;
  removedPods: number;
  secondRoundPods: number;
  totalPods: number;
};

const chartConfig = {
  remainingPods: {
    label: "Remaining (Harvestable)",
    color: chartPalette.leafGreen,
  },
  lostPodsBeforeHarvest: {
    label: "Lost Before Harvest",
    color: chartPalette.terracotta,
  },
  removedPods: { label: "Removed Pods", color: chartPalette.goldenOchre },
  secondRoundPods: {
    label: "Second-Round Pods",
    color: chartPalette.sageOlive,
  },
  totalPods: { label: "Total Pods", color: chartPalette.vanillaBrown },
} satisfies ChartConfig;

// Reusable mapping: API items -> chart points. No hardcoded values.
function mapHarvestablePods(
  items: HarvestablePodsTrendItem[],
): HarvestablePodsPoint[] {
  return items.map((item) => ({
    year: String(item.year),
    remainingPods: item.remainingPods ?? 0,
    lostPodsBeforeHarvest: item.lostPodsBeforeHarvest ?? 0,
    removedPods: item.removedPods ?? 0,
    secondRoundPods: item.secondRoundPods ?? 0,
    totalPods: item.totalPods ?? 0,
  }));
}

const formatCount = (value?: number) => (value ?? 0).toLocaleString();

const CustomTooltip = (props: CustomTooltipProps) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const point = payload[0]?.payload as HarvestablePodsPoint | undefined;

    return (
      <div className="rounded-lg border border-gray-300 bg-white p-3 shadow-lg">
        <p className="font-semibold text-gray-900">{point?.year}</p>
        <div className="mt-2 space-y-1 text-sm">
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatCount(entry.value)}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

/**
 * Harvestable Pods Trend — combined Bar + Line chart.
 *
 * Stacked bars show pod disposition (remaining + lost-before-harvest +
 * removed); the lines track total pods and second-round pods across years.
 *
 * `year` is optional: the endpoint returns the full multi-year range, so the
 * chart works standalone. When a parent passes a changing year, the effect
 * dependency makes the chart refetch/update automatically.
 */
export function HarvestablePodsTrendChart({
  year,
}: {
  year?: string | number;
}) {
  const [points, setPoints] = useState<HarvestablePodsPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);

      try {
        const res: HarvestablePodsTrendResponse =
          await getHarvestablePodsTrend();
        if (!active) return;

        setPoints(mapHarvestablePods(res?.items ?? []));
      } catch {
        if (active) setPoints([]);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [year]);

  const hasData =
    points.length > 0 &&
    points.some(
      (p) =>
        p.remainingPods > 0 ||
        p.lostPodsBeforeHarvest > 0 ||
        p.removedPods > 0 ||
        p.secondRoundPods > 0 ||
        p.totalPods > 0,
    );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Harvestable Pods Trend
        </h3>
        <p className="text-sm text-gray-600">
          Yearly breakdown of total, remaining, second-round, lost, and removed
          pods.
        </p>
      </div>

      {loading ? (
        <div className="flex min-h-96 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-500">
          Loading harvestable pod data…
        </div>
      ) : !hasData ? (
        <div className="flex min-h-96 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-600">
          No harvestable pod data is available yet.
        </div>
      ) : (
        <ChartContainer config={chartConfig} className="min-h-96 w-full">
          <ComposedChart
            data={points}
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
              tickFormatter={(value: number) => value.toLocaleString()}
              label={{
                value: "Number of Pods",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" },
              }}
            />
            <ChartTooltip content={<CustomTooltip />} />
            <ChartLegend
              content={<ChartLegendContent verticalAlign="bottom" />}
            />

            <Bar
              dataKey="remainingPods"
              name={chartConfig.remainingPods.label}
              stackId="pods"
              fill={chartConfig.remainingPods.color}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="lostPodsBeforeHarvest"
              name={chartConfig.lostPodsBeforeHarvest.label}
              stackId="pods"
              fill={chartConfig.lostPodsBeforeHarvest.color}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="removedPods"
              name={chartConfig.removedPods.label}
              stackId="pods"
              fill={chartConfig.removedPods.color}
              radius={[4, 4, 0, 0]}
            />
            <Line
              type="monotone"
              dataKey="totalPods"
              name={chartConfig.totalPods.label}
              stroke={chartConfig.totalPods.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.totalPods.color, r: 5 }}
              activeDot={{ r: 7 }}
            />
            <Line
              type="monotone"
              dataKey="secondRoundPods"
              name={chartConfig.secondRoundPods.label}
              stroke={chartConfig.secondRoundPods.color}
              strokeWidth={2}
              strokeDasharray="5 4"
              dot={{ fill: chartConfig.secondRoundPods.color, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ChartContainer>
      )}
    </div>
  );
}
