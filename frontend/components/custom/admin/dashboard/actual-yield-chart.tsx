"use client";

import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  type CustomTooltipProps,
  type WeightPerPodTrendItem,
  type WeightPerPodTrendResponse,
} from "@/lib/types/model/type";
import { getWeightPerPodTrend } from "@/lib/server-actions/admin/dashboard-client";
import { chartPalette } from "./chart-palette";

// The backend returns a raw number with no unit field. Weights across this app
// are tracked in grams, so display in grams. Change here if that ever changes.
const WEIGHT_UNIT = "g";

type WeightPerPodPoint = {
  year: string;
  averageWeightPerPod: number;
};

const chartConfig = {
  averageWeightPerPod: {
    label: "Average Pod Weight",
    color: chartPalette.vanillaBrown,
  },
} satisfies ChartConfig;

// Reusable mapping: API items -> chart points. No hardcoded values.
function mapWeightPerPod(items: WeightPerPodTrendItem[]): WeightPerPodPoint[] {
  return items.map((item) => ({
    year: String(item.year),
    averageWeightPerPod: item.averageWeightPerPod ?? 0,
  }));
}

const formatWeight = (value?: number) =>
  `${(value ?? 0).toLocaleString()} ${WEIGHT_UNIT}`;

const CustomTooltip = (props: CustomTooltipProps) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const point = payload[0]?.payload as WeightPerPodPoint | undefined;

    return (
      <div className="rounded-lg border border-gray-300 bg-white p-3 shadow-lg">
        <p className="font-semibold text-gray-900">{point?.year}</p>
        <p
          className="mt-2 text-sm"
          style={{ color: chartConfig.averageWeightPerPod.color }}
        >
          {chartConfig.averageWeightPerPod.label}:{" "}
          {formatWeight(point?.averageWeightPerPod)}
        </p>
      </div>
    );
  }

  return null;
};

// Value label rendered above each data point.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderValueLabel = (props: any) => {
  const { x, y, value } = props;
  if (x === undefined || y === undefined) return null;

  return (
    <text
      x={x}
      y={y - 10}
      fill="#374151"
      textAnchor="middle"
      fontSize="12"
      fontWeight="600"
    >
      {formatWeight(value)}
    </text>
  );
};

/**
 * Average Pod Weight Trend — single-metric line chart.
 *
 * `year` is optional: the endpoint returns the full multi-year range, so the
 * chart works standalone. When a parent passes a changing year, the effect
 * dependency makes the chart refetch/update automatically.
 */
export function ActualYieldChart({ year }: { year?: string | number }) {
  const [points, setPoints] = useState<WeightPerPodPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);

      try {
        const res: WeightPerPodTrendResponse = await getWeightPerPodTrend();
        if (!active) return;

        setPoints(mapWeightPerPod(res?.items ?? []));
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

  const hasData = points.some((p) => p.averageWeightPerPod > 0);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Average Pod Weight Trend
        </h3>
        <p className="text-sm text-gray-600">
          Yearly trend of average vanilla pod weight across production seasons.
        </p>
      </div>

      {loading ? (
        <div className="flex min-h-96 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-500">
          Loading average pod weight…
        </div>
      ) : !hasData ? (
        <div className="flex min-h-96 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-600">
          No pod weight data available.
        </div>
      ) : (
        <ChartContainer config={chartConfig} className="min-h-96 w-full">
          <LineChart
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
                value: `Average Weight per Pod (${WEIGHT_UNIT})`,
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" },
              }}
            />
            <ChartTooltip content={<CustomTooltip />} />
            <ChartLegend
              content={<ChartLegendContent verticalAlign="bottom" />}
            />

            <Line
              type="monotone"
              dataKey="averageWeightPerPod"
              name={chartConfig.averageWeightPerPod.label}
              stroke={chartConfig.averageWeightPerPod.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.averageWeightPerPod.color, r: 5 }}
              activeDot={{ r: 7 }}
              label={renderValueLabel}
            />
          </LineChart>
        </ChartContainer>
      )}
    </div>
  );
}
