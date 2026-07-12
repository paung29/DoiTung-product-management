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
  type PodProductionTrendItem,
  type PodProductionTrendResponse,
} from "@/lib/types/model/type";
import { getPodProductionTrend } from "@/lib/server-actions/admin/dashboard-client";
import { chartPalette } from "./chart-palette";

type PodTrendPoint = {
  year: string;
  remainingPods: number;
  lostPods: number;
  totalPods: number;
};

const chartConfig = {
  remainingPods: { label: "Remaining Pods", color: chartPalette.leafGreen },
  lostPods: { label: "Lost Pods", color: chartPalette.terracotta },
  totalPods: { label: "Total Pods", color: chartPalette.vanillaBrown },
} satisfies ChartConfig;

// Reusable mapping: API items -> chart points. No hardcoded values.
function mapPodTrend(items: PodProductionTrendItem[]): PodTrendPoint[] {
  return items.map((item) => ({
    year: String(item.year),
    remainingPods: item.remainingPods ?? 0,
    lostPods: item.lostPods ?? 0,
    totalPods: item.totalPods ?? 0,
  }));
}

const formatCount = (value?: number) => (value ?? 0).toLocaleString();

const CustomTooltip = (props: CustomTooltipProps) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const point = payload[0]?.payload as PodTrendPoint | undefined;

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
 * Pod Production Trend — combined Bar + Line chart.
 *
 * Stacked bars show pod outcome composition (remaining + lost), whose height
 * equals total pods; the line tracks total pods across years.
 *
 * `year` is optional: the endpoint returns the full multi-year range, so the
 * chart works standalone. When a parent passes a changing year, the effect
 * dependency makes the chart refetch/update automatically.
 */
export function PodProductionTrendChart({
  year,
}: {
  year?: string | number;
}) {
  const [points, setPoints] = useState<PodTrendPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);

      try {
        const res: PodProductionTrendResponse = await getPodProductionTrend();
        if (!active) return;

        setPoints(mapPodTrend(res?.items ?? []));
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
      (p) => p.remainingPods > 0 || p.lostPods > 0 || p.totalPods > 0,
    );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Pod Production Trend
        </h3>
        <p className="text-sm text-gray-600">
          Yearly comparison of total, remaining, and lost pod production.
        </p>
      </div>

      {loading ? (
        <div className="flex min-h-96 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-500">
          Loading pod production data…
        </div>
      ) : !hasData ? (
        <div className="flex min-h-96 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-600">
          No pod production data is available yet.
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
              dataKey="lostPods"
              name={chartConfig.lostPods.label}
              stackId="pods"
              fill={chartConfig.lostPods.color}
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
          </ComposedChart>
        </ChartContainer>
      )}
    </div>
  );
}
