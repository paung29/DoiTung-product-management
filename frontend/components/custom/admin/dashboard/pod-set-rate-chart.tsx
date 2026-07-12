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
  type PodSetRateTrendItem,
  type PodSetRateTrendResponse,
} from "@/lib/types/model/type";
import { getPodSetRateTrend } from "@/lib/server-actions/admin/dashboard-client";
import { chartPalette } from "./chart-palette";

type PollinationTrendPoint = {
  year: string;
  goodFlowers: number;
  badFlowers: number;
  numberPods: number;
  unsuccessfulPollination: number;
  totalFlowers: number;
};

const chartConfig = {
  goodFlowers: { label: "Good Flowers", color: chartPalette.leafGreen },
  badFlowers: { label: "Bad Flowers", color: chartPalette.terracotta },
  numberPods: { label: "Number of Pods", color: chartPalette.vanillaBrown },
  unsuccessfulPollination: {
    label: "Unsuccessful Pollination",
    color: chartPalette.goldenOchre,
  },
} satisfies ChartConfig;

// Reusable mapping: API items -> chart points. No hardcoded values.
function mapPollinationTrend(
  items: PodSetRateTrendItem[],
): PollinationTrendPoint[] {
  return items.map((item) => ({
    year: String(item.year),
    goodFlowers: item.goodFlowers ?? 0,
    badFlowers: item.badFlowers ?? 0,
    numberPods: item.numberPods ?? 0,
    unsuccessfulPollination: item.unsuccessfulPollination ?? 0,
    totalFlowers: item.totalFlowers ?? 0,
  }));
}

const formatCount = (value?: number) => (value ?? 0).toLocaleString();

const CustomTooltip = (props: CustomTooltipProps) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const point = payload[0]?.payload as PollinationTrendPoint | undefined;

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
        <p className="mt-2 border-t border-gray-200 pt-2 font-semibold text-gray-900">
          Total Flowers: {formatCount(point?.totalFlowers)}
        </p>
      </div>
    );
  }

  return null;
};

/**
 * Pollination Performance Trend — combined Bar + Line chart.
 *
 * Bars (stacked) show flower quality (good + bad = total flowers); the lines
 * track pod production and unsuccessful pollination across years.
 *
 * `year` is optional: the endpoint returns the full multi-year range, so the
 * chart works standalone. When a parent passes a changing year, the effect
 * dependency makes the chart refetch/update automatically.
 */
export function PodSetRateChart({ year }: { year?: string | number }) {
  const [points, setPoints] = useState<PollinationTrendPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);

      try {
        const res: PodSetRateTrendResponse = await getPodSetRateTrend();
        if (!active) return;

        setPoints(mapPollinationTrend(res?.items ?? []));
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
        p.goodFlowers > 0 ||
        p.badFlowers > 0 ||
        p.numberPods > 0 ||
        p.unsuccessfulPollination > 0 ||
        p.totalFlowers > 0,
    );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Pollination Performance Trend
        </h3>
        <p className="text-sm text-gray-600">
          Comparison of pollination outcomes, flower quality, and pod production
          across years.
        </p>
      </div>

      {loading ? (
        <div className="flex min-h-96 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-500">
          Loading pollination data…
        </div>
      ) : !hasData ? (
        <div className="flex min-h-96 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-600">
          No pollination data is available yet.
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
                value: "Count",
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
              dataKey="goodFlowers"
              name={chartConfig.goodFlowers.label}
              stackId="flowers"
              fill={chartConfig.goodFlowers.color}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="badFlowers"
              name={chartConfig.badFlowers.label}
              stackId="flowers"
              fill={chartConfig.badFlowers.color}
              radius={[4, 4, 0, 0]}
            />
            <Line
              type="monotone"
              dataKey="numberPods"
              name={chartConfig.numberPods.label}
              stroke={chartConfig.numberPods.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.numberPods.color, r: 5 }}
              activeDot={{ r: 7 }}
            />
            <Line
              type="monotone"
              dataKey="unsuccessfulPollination"
              name={chartConfig.unsuccessfulPollination.label}
              stroke={chartConfig.unsuccessfulPollination.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.unsuccessfulPollination.color, r: 5 }}
              activeDot={{ r: 7 }}
            />
          </ComposedChart>
        </ChartContainer>
      )}
    </div>
  );
}
