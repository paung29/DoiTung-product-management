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
import { getConditionByStage } from "@/lib/server-actions/admin/dashboard-client";

type ProductionStageKey =
  | "cluster"
  | "flower"
  | "pollination"
  | "pod"
  | "preHarvest";

type ProductionStageItem = {
  stage: ProductionStageKey;
  good: number;
  insect: number;
  rotten: number;
};

type ProductionStageResponse = {
  year: number;
  stages: ProductionStageItem[];
};

type StageChartPoint = {
  stage: string;
  good: number;
  insect: number;
  rotten: number;
};

type StageTooltipPayload = {
  name: string;
  value: number;
  color: string;
  payload?: StageChartPoint;
};

type StageTooltipProps = {
  active?: boolean;
  payload?: StageTooltipPayload[];
};

const stageOrder: Array<{
  key: ProductionStageKey;
  label: string;
}> = [
  { key: "cluster", label: "Cluster" },
  { key: "flower", label: "Flower" },
  { key: "pollination", label: "Pollination" },
  { key: "pod", label: "Pod" },
  { key: "preHarvest", label: "Pre-Harvest" },
];

const chartConfig = {
  good: {
    label: "Good",
    color: "#7f9c7a",
  },
  insect: {
    label: "Insect Damage",
    color: "#b58b5c",
  },
  rotten: {
    label: "Rotten",
    color: "#8b5e52",
  },
} satisfies ChartConfig;

function getStageChartData(
  response?: ProductionStageResponse | null,
): StageChartPoint[] {
  // Always render one point per stage in a fixed order. Missing/absent values
  // (including a null response before data loads) map to 0 so the stacks render
  // at zero height rather than breaking.
  const stages = response?.stages ?? [];

  return stageOrder.map(({ key, label }) => {
    const record = stages.find((item) => item.stage === key);

    return {
      stage: label,
      good: record?.good ?? 0,
      insect: record?.insect ?? 0,
      rotten: record?.rotten ?? 0,
    };
  });
}

function formatCount(value: number) {
  return value.toLocaleString();
}

const CustomTooltip = (props: StageTooltipProps) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const total = (data?.good || 0) + (data?.insect || 0) + (data?.rotten || 0);
    const payloadOrder: Array<keyof typeof chartConfig> = [
      "good",
      "insect",
      "rotten",
    ];

    return (
      <div className="rounded-xl border border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur-sm">
        <p className="font-semibold text-gray-900">{data?.stage}</p>
        <div className="mt-2 space-y-1 text-sm">
          {payloadOrder.map((key) => {
            const entry = payload.find((item) => item.name === key);
            const value = Number(entry?.value ?? 0);
            const percentage =
              total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";

            return (
              <p key={key} style={{ color: entry?.color ?? "#6b7280" }}>
                {chartConfig[key].label}: {formatCount(value)} ({percentage}%)
              </p>
            );
          })}
        </div>
        <p className="mt-2 border-t border-gray-200 pt-2 font-semibold text-gray-900">
          Total: {formatCount(total)}
        </p>
      </div>
    );
  }

  return null;
};

export function InflorescenceDamageChart({
  year,
}: {
  year?: string | number;
}) {
  const [data, setData] = useState<ProductionStageResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // Refetch whenever the active year changes.
  useEffect(() => {
    if (year === undefined || year === "") return;

    let active = true;

    (async () => {
      setLoading(true);

      try {
        const res = await getConditionByStage(year);
        if (!active) return;

        // Bind on success; ignore the standard { success:false } error shape.
        setData(res && res.success === false ? null : (res as ProductionStageResponse));
      } catch {
        if (active) setData(null);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [year]);

  const chartData = getStageChartData(data);
  const hasNonZeroData = chartData.some(
    (item) => item.good > 0 || item.insect > 0 || item.rotten > 0,
  );
  const displayYear = data?.year ?? year ?? "—";

  return (
    <div className="space-y-5 rounded-xl bg-white p-4 shadow-sm md:p-6">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-900">
            Production Stage Health Analysis
          </h3>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            Year {displayYear}
          </span>
          {loading && (
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              Loading…
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600">
          Comparison of healthy, insect-damaged, and rotten items across
          production stages
        </p>
      </div>

      {loading ? (
        <div className="flex min-h-88 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-500">
          Loading stage data…
        </div>
      ) : (
        <>
          {!hasNonZeroData && (
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
              No stage production data is available for {displayYear} yet. The
              chart remains ready for live data.
            </div>
          )}

          <ChartContainer config={chartConfig} className="min-h-88 w-full">
            <BarChart
              data={chartData}
              margin={{ top: 16, right: 16, left: 8, bottom: 20 }}
              barCategoryGap="28%"
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="stage"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                width={70}
                tickLine={false}
                axisLine={false}
                tickMargin={14}
                tickFormatter={(value: number) => value.toLocaleString()}
                label={{
                  value: "Total Flower Count",
                  angle: -90,
                  position: "insideLeft",
                  dx: -10,
                  style: { textAnchor: "middle" },
                }}
              />
              <ChartTooltip content={<CustomTooltip />} />
              <ChartLegend
                content={
                  <ChartLegendContent verticalAlign="bottom" className="pb-2" />
                }
              />

              <Bar
                dataKey="good"
                stackId="production"
                fill={chartConfig.good.color}
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="insect"
                stackId="production"
                fill={chartConfig.insect.color}
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="rotten"
                stackId="production"
                fill={chartConfig.rotten.color}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </>
      )}
    </div>
  );
}
