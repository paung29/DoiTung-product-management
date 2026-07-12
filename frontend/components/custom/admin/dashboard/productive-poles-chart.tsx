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
  type ProductivePolesTrendItem,
  type ProductivePolesTrendResponse,
} from "@/lib/types/model/type";
import { getProductivePolesTrend } from "@/lib/server-actions/admin/dashboard-client";
import { chartPalette } from "./chart-palette";

type ProductivePolesPoint = {
  year: string;
  productivePoles: number;
  nonProductivePoles: number;
  totalPoles: number;
};

const chartConfig = {
  productivePoles: { label: "Productive Poles", color: chartPalette.leafGreen },
  nonProductivePoles: {
    label: "Non-Productive Poles",
    color: chartPalette.terracotta,
  },
  totalPoles: { label: "Total Poles", color: chartPalette.vanillaBrown },
} satisfies ChartConfig;

// Reusable mapping: API items -> chart points. No hardcoded values.
function mapProductivePoles(
  items: ProductivePolesTrendItem[],
): ProductivePolesPoint[] {
  return items.map((item) => ({
    year: String(item.year),
    productivePoles: item.productivePoles ?? 0,
    nonProductivePoles: item.nonProductivePoles ?? 0,
    totalPoles: item.totalPoles ?? 0,
  }));
}

const formatCount = (value?: number) => (value ?? 0).toLocaleString();

const CustomTooltip = (props: CustomTooltipProps) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const point = payload[0]?.payload as ProductivePolesPoint | undefined;

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
 * Productive Poles Trend — combined Bar + Line chart.
 *
 * Stacked bars show pole productivity (productive + non-productive), whose
 * height equals total poles; the line tracks total poles across years.
 *
 * `year` is optional: the endpoint returns the full multi-year range, so the
 * chart works standalone. When a parent passes a changing year, the effect
 * dependency makes the chart refetch/update automatically.
 */
export function ProductivePolesTrendChart({
  year,
}: {
  year?: string | number;
}) {
  const [points, setPoints] = useState<ProductivePolesPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);

      try {
        const res: ProductivePolesTrendResponse =
          await getProductivePolesTrend();
        if (!active) return;

        setPoints(mapProductivePoles(res?.items ?? []));
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
        p.productivePoles > 0 ||
        p.nonProductivePoles > 0 ||
        p.totalPoles > 0,
    );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Productive Poles Trend
        </h3>
        <p className="text-sm text-gray-600">
          Yearly comparison of productive and non-productive poles.
        </p>
      </div>

      {loading ? (
        <div className="flex min-h-96 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-500">
          Loading productive poles data…
        </div>
      ) : !hasData ? (
        <div className="flex min-h-96 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-600">
          No productive poles data is available yet.
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
              allowDecimals={false}
              tickFormatter={(value: number) => value.toLocaleString()}
              label={{
                value: "Number of Poles",
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
              dataKey="productivePoles"
              name={chartConfig.productivePoles.label}
              stackId="poles"
              fill={chartConfig.productivePoles.color}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="nonProductivePoles"
              name={chartConfig.nonProductivePoles.label}
              stackId="poles"
              fill={chartConfig.nonProductivePoles.color}
              radius={[4, 4, 0, 0]}
            />
            <Line
              type="monotone"
              dataKey="totalPoles"
              name={chartConfig.totalPoles.label}
              stroke={chartConfig.totalPoles.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.totalPoles.color, r: 5 }}
              activeDot={{ r: 7 }}
            />
          </ComposedChart>
        </ChartContainer>
      )}
    </div>
  );
}
