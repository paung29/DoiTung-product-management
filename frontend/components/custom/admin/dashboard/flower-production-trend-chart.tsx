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
  type FlowerProductionTrendResponse,
  type FlowerTrendItem,
} from "@/lib/types/model/type";
import { getFlowerProductionTrend } from "@/lib/server-actions/admin/dashboard-client";
import { chartPalette } from "./chart-palette";

type FlowerTrendPoint = {
  year: string;
  totalFlowers: number;
  goodFlowers: number;
  badFlowers: number;
};

const chartConfig = {
  totalFlowers: { label: "Total Flowers", color: chartPalette.tan },
  goodFlowers: { label: "Good Flowers", color: chartPalette.leafGreen },
  badFlowers: { label: "Bad Flowers", color: chartPalette.terracotta },
} satisfies ChartConfig;

// Reusable mapping: API items -> chart points. No hardcoded values.
function mapTrendData(items: FlowerTrendItem[]): FlowerTrendPoint[] {
  return items.map((item) => ({
    year: String(item.year),
    totalFlowers: item.totalFlowers ?? 0,
    goodFlowers: item.goodFlowers ?? 0,
    badFlowers: item.badFlowers ?? 0,
  }));
}

const formatCount = (value?: number) => (value ?? 0).toLocaleString();

const CustomTooltip = (props: CustomTooltipProps) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const year = payload[0]?.payload?.year;

    return (
      <div className="rounded-lg border border-gray-300 bg-white p-3 shadow-lg">
        <p className="font-semibold text-gray-900">{year}</p>
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
 * Combined Bar + Line chart for the yearly flower production trend.
 *
 * `year` is optional: the endpoint returns the full multi-year range, so the
 * chart works standalone. When a parent passes a changing year (e.g. a global
 * year-range selector), the effect dependency makes the chart refetch/update
 * automatically.
 */
export function FlowerProductionTrendChart({
  year,
}: {
  year?: string | number;
}) {
  const [points, setPoints] = useState<FlowerTrendPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);

      try {
        const res: FlowerProductionTrendResponse = await getFlowerProductionTrend();
        if (!active) return;

        setPoints(mapTrendData(res?.items ?? []));
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
      (p) => p.totalFlowers > 0 || p.goodFlowers > 0 || p.badFlowers > 0,
    );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Flower Production Trend
        </h3>
        <p className="text-sm text-gray-600">
          Yearly comparison of total, good, and bad flower production.
        </p>
      </div>

      {loading ? (
        <div className="flex min-h-96 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-500">
          Loading flower production data…
        </div>
      ) : !hasData ? (
        <div className="flex min-h-96 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-600">
          No flower production data is available yet.
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
                value: "Number of Flowers",
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
              dataKey="totalFlowers"
              name={chartConfig.totalFlowers.label}
              fill={chartConfig.totalFlowers.color}
              radius={[4, 4, 0, 0]}
            />
            <Line
              type="monotone"
              dataKey="goodFlowers"
              name={chartConfig.goodFlowers.label}
              stroke={chartConfig.goodFlowers.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.goodFlowers.color, r: 5 }}
              activeDot={{ r: 7 }}
            />
            <Line
              type="monotone"
              dataKey="badFlowers"
              name={chartConfig.badFlowers.label}
              stroke={chartConfig.badFlowers.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.badFlowers.color, r: 5 }}
              activeDot={{ r: 7 }}
            />
          </ComposedChart>
        </ChartContainer>
      )}
    </div>
  );
}
