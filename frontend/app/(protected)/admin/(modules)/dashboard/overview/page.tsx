"use client";

import { useEffect, useState } from "react";
import {
  Flower,
  Package,
  AlertTriangle,
  CheckCircle2,
  Scale,
  Sprout,
} from "lucide-react";

import { ProductionMetricChart } from "@/components/custom/admin/dashboard/production-metric-chart";
import { FlowerProductionChart } from "@/components/custom/admin/dashboard/flower-production-chart";
import { InflorescenceDamageChart } from "@/components/custom/admin/dashboard/inflorescence-damage-chart";
import KPICard from "@/components/custom/admin/dashboard/kpi-card";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ApiErrorUI from "@/components/custom/common/error-handle";

import { PerformanceOverview } from "@/lib/types/model/type";
import {
  getAllYears,
  getPerformanceOverview,
} from "@/lib/server-actions/admin/dashboard-client";

function OverviewPage() {
  const currentYear = new Date().getFullYear();

  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [data, setData] = useState<PerformanceOverview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load available years from the year data source.
  useEffect(() => {
    (async () => {
      try {
        const res = await getAllYears();
        // The endpoint returns years as strings (e.g. ["2020","2021"]);
        // tolerate object shapes too and coerce to numbers.
        const list: number[] = (res?.years ?? [])
          .map((y: unknown) =>
            Number(
              typeof y === "object" && y !== null
                ? (y as { year: number }).year
                : y,
            ),
          )
          .filter((y: number) => !Number.isNaN(y))
          .sort((a: number, b: number) => b - a);

        setYears(list);

        // Default to the current year when available, else the most recent year.
        const target = list.includes(currentYear)
          ? currentYear
          : (list[0] ?? currentYear);
        setSelectedYear(String(target));
      } catch {
        // Fall back to the current year if the year list cannot be loaded.
        setSelectedYear(String(currentYear));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refetch KPI data whenever the selected year changes.
  useEffect(() => {
    if (!selectedYear) return;

    let active = true;

    (async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await getPerformanceOverview(selectedYear);
        if (!active) return;

        if (res && res.success === false) {
          setError(res.message || "Failed to load KPI data");
          setData(null);
        } else {
          setData(res as PerformanceOverview);
        }
      } catch {
        if (active) {
          setError("Failed to connect to server");
          setData(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [selectedYear]);

  const show = (value: number | undefined) =>
    loading ? "…" : (value ?? 0);

  const kpis = [
    { title: "Total Flowers", value: show(data?.totalFlowers), icon: Flower },
    { title: "Total Pods", value: show(data?.totalPods), icon: Package },
    {
      title: "Flower Loss Rate",
      value: show(data?.flowerLossRate),
      unit: "%",
      icon: AlertTriangle,
    },
    {
      title: "Pod Success Rate",
      value: show(data?.podSuccessRate),
      unit: "%",
      icon: CheckCircle2,
    },
    {
      title: "Total Harvest Weight",
      value: show(data?.totalHarvestWeight),
      unit: "g",
      icon: Scale,
    },
    {
      title: "Total Harvest Pods",
      value: show(data?.totalHarvestPods),
      icon: Sprout,
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Section with Header + Year Selector */}
      <Card className="border-primary-button/20 bg-secondary shadow-sm">
        <div className="p-4">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedYear} Performance
              </h3>
              <p className="text-sm text-gray-600">
                Key metrics for the selected year
              </p>
            </div>

            {/* Year Selector */}
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-40 bg-white">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.length > 0 ? (
                  years.map((y) => (
                    <SelectItem key={y} value={String(y)}>
                      {y}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value={String(currentYear)}>
                    {currentYear}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <ApiErrorUI message={error} />

          {/* KPI Cards - horizontally scrollable single row */}
          <div className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-2">
            {kpis.map((kpi) => (
              <div key={kpi.title} className="w-56 shrink-0">
                <KPICard
                  title={kpi.title}
                  value={kpi.value}
                  unit={kpi.unit}
                  icon={kpi.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Charts Section */}
      <div className="mt-8 space-y-8">
        {/* Inflorescence Damage Chart - Full Width */}
        <Card className="border-primary-button/20 shadow-sm">
          <div className="p-6">
            <InflorescenceDamageChart />
          </div>
        </Card>

        {/* Flower Production and Pod Overview - Side by Side */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="border-primary-button/20 bg-secondary shadow-sm">
            <div className="p-6">
              <FlowerProductionChart />
            </div>
          </Card>

          <Card className="border-primary-button/20 bg-secondary shadow-sm">
            <div className="p-6">
              <ProductionMetricChart />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
