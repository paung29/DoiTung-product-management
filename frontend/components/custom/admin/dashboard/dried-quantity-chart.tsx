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
  type CustomTooltipProps,
  type FreshPodGradeTrendItem,
  type FreshPodGradeTrendResponse,
} from "@/lib/types/model/type";
import { getFreshPodGradeTrend } from "@/lib/server-actions/admin/dashboard-client";
import { chartPalette } from "./chart-palette";

type GradeKey =
  | "gradeAPlus"
  | "gradeA"
  | "gradeB"
  | "gradeC"
  | "gradeDPlus"
  | "undersized"
  | "rotten";

type FreshPodGradePoint = { year: string } & Record<GradeKey, number>;

// Ordered best -> worst, coloured as a nature-toned quality gradient
// (deep green -> olive -> ochre -> brown -> terracotta).
const chartConfig = {
  gradeAPlus: { label: "Grade A+", color: chartPalette.deepMoss },
  gradeA: { label: "Grade A", color: chartPalette.leafGreen },
  gradeB: { label: "Grade B", color: chartPalette.sageOlive },
  gradeC: { label: "Grade C", color: chartPalette.goldenOchre },
  gradeDPlus: { label: "Grade D+", color: chartPalette.tan },
  undersized: { label: "Undersized", color: chartPalette.vanillaBrown },
  rotten: { label: "Rotten", color: chartPalette.terracotta },
} satisfies ChartConfig;

const gradeKeys = Object.keys(chartConfig) as GradeKey[];

// Reusable mapping: API items -> chart points. No hardcoded values.
function mapGradeTrend(items: FreshPodGradeTrendItem[]): FreshPodGradePoint[] {
  return items.map((item) => ({
    year: String(item.year),
    gradeAPlus: item.gradeAPlus ?? 0,
    gradeA: item.gradeA ?? 0,
    gradeB: item.gradeB ?? 0,
    gradeC: item.gradeC ?? 0,
    gradeDPlus: item.gradeDPlus ?? 0,
    undersized: item.undersized ?? 0,
    rotten: item.rotten ?? 0,
  }));
}

const formatCount = (value?: number) => (value ?? 0).toLocaleString();

const CustomTooltip = (props: CustomTooltipProps) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const point = payload[0]?.payload as FreshPodGradePoint | undefined;
    const total = gradeKeys.reduce((sum, key) => sum + (point?.[key] ?? 0), 0);

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
          Total: {formatCount(total)}
        </p>
      </div>
    );
  }

  return null;
};

/**
 * Fresh Pod Grade Trend — stacked bar chart of grade distribution per year.
 *
 * `year` is optional: the endpoint returns the full multi-year range, so the
 * chart works standalone. When a parent passes a changing year, the effect
 * dependency makes the chart refetch/update automatically.
 */
export function DriedQuantityChart({ year }: { year?: string | number }) {
  const [points, setPoints] = useState<FreshPodGradePoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);

      try {
        const res: FreshPodGradeTrendResponse = await getFreshPodGradeTrend();
        if (!active) return;

        setPoints(mapGradeTrend(res?.items ?? []));
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
    points.some((p) => gradeKeys.some((key) => p[key] > 0));

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Fresh Pod Grade Trend
        </h3>
        <p className="text-sm text-gray-600">
          Historical analysis of fresh vanilla pod quality distributions by
          grade over time
        </p>
      </div>

      {loading ? (
        <div className="flex min-h-96 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-500">
          Loading fresh pod grade data…
        </div>
      ) : !hasData ? (
        <div className="flex min-h-96 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-600">
          No fresh pod grade data is available yet.
        </div>
      ) : (
        <ChartContainer config={chartConfig} className="min-h-96 w-full">
          <BarChart
            data={points}
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
              allowDecimals={false}
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

            {gradeKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                name={chartConfig[key].label}
                stackId="grades"
                fill={chartConfig[key].color}
                radius={index === gradeKeys.length - 1 ? [4, 4, 0, 0] : 0}
              />
            ))}
          </BarChart>
        </ChartContainer>
      )}
    </div>
  );
}
