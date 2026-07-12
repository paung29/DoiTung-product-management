"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  type ActualYieldTrendItem,
  type ActualYieldTrendResponse,
  type CustomTooltipProps,
} from "@/lib/types/model/type";
import { getActualYieldTrend } from "@/lib/server-actions/admin/dashboard-client";
import { chartPalette } from "./chart-palette";

// The backend returns a raw number with no unit field. Yields across this app
// are tracked in grams, so display in grams. Change here if that ever changes.
const WEIGHT_UNIT = "g";

type ActualYieldPoint = {
  year: string;
  actualYield: number;
};

const chartConfig = {
  actualYield: { label: "Actual Yield", color: chartPalette.goldenOchre },
} satisfies ChartConfig;

// Reusable mapping: API items -> chart points. No hardcoded values.
function mapActualYield(items: ActualYieldTrendItem[]): ActualYieldPoint[] {
  return items.map((item) => ({
    year: String(item.year),
    actualYield: item.actualYieldPerPole ?? 0,
  }));
}

const formatWeight = (value?: number) =>
  `${(value ?? 0).toLocaleString()} ${WEIGHT_UNIT}`;

const CustomTooltip = (props: CustomTooltipProps) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const point = payload[0]?.payload as ActualYieldPoint | undefined;

    return (
      <div className="rounded-lg border border-gray-300 bg-white p-3 shadow-lg">
        <p className="font-semibold text-gray-900">{point?.year}</p>
        <p
          className="mt-2 text-sm"
          style={{ color: chartConfig.actualYield.color }}
        >
          {chartConfig.actualYield.label}: {formatWeight(point?.actualYield)}
        </p>
      </div>
    );
  }

  return null;
};

// Value label rendered above each bar.
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
      {formatWeight(value)}
    </text>
  );
};

/**
 * Actual Yield Trend — single-metric bar chart.
 *
 * `year` is optional: the endpoint returns the full multi-year range, so the
 * chart works standalone. When a parent passes a changing year, the effect
 * dependency makes the chart refetch/update automatically.
 */
export function TargetVsActualYieldChart({
  year,
}: {
  year?: string | number;
}) {
  const [points, setPoints] = useState<ActualYieldPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);

      try {
        const res: ActualYieldTrendResponse = await getActualYieldTrend();
        if (!active) return;

        setPoints(mapActualYield(res?.items ?? []));
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

  const hasData = points.length > 0;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Actual Yield Trend
        </h3>
        <p className="text-sm text-gray-600">
          Historical trend analysis of actual yields per pole over time
        </p>
      </div>

      {loading ? (
        <div className="flex min-h-96 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-500">
          Loading actual yield data…
        </div>
      ) : !hasData ? (
        <div className="flex min-h-96 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-600">
          No actual yield data is available yet.
        </div>
      ) : (
        <ChartContainer config={chartConfig} className="min-h-96 w-full">
          <BarChart
            data={points}
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
              domain={[0, (dataMax: number) => (dataMax > 0 ? dataMax : 1)]}
              tickFormatter={(value: number) => value.toLocaleString()}
              label={{
                value: `Actual Yield per Pole (${WEIGHT_UNIT})`,
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
              dataKey="actualYield"
              name={chartConfig.actualYield.label}
              fill={chartConfig.actualYield.color}
              radius={[4, 4, 0, 0]}
              label={renderBarLabel}
            />
          </BarChart>
        </ChartContainer>
      )}
    </div>
  );
}
