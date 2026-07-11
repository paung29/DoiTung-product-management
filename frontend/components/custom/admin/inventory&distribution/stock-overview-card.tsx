"use client";

import { Box, Scale, TrendingUp, TrendingDown } from "lucide-react";

import { formatWeight } from "@/lib/types/model/function";
import { StockOverview, WeightUnit } from "@/lib/types/model/type";

interface StockCardProps {
  title: string;
  value: string | number;
  label: string;
  icon: React.ReactNode;
  iconBgColor: string;
}

function StockCard({ title, value, label, icon, iconBgColor }: StockCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-6">
        <div className={`${iconBgColor} rounded-lg p-2`}>{icon}</div>
        <div className="flex-1">
          <p className="text-xs text-gray-600">{title}</p>
          <p className="mt-1 text-lg font-bold text-gray-900">{value}</p>
          <p className="mt-0.5 text-xs text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

export default function StockOverviewCards({
  data,
  unit,
}: {
  data: StockOverview | null;
  unit: WeightUnit;
}) {
  const weight = (gram: number | undefined) => formatWeight(gram ?? 0, unit);
  const pods = (count: number | undefined) => (count ?? 0).toLocaleString();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StockCard
          title="Total Pods in Stock"
          value={pods(data?.total_pod_in_stock)}
          label="pods"
          icon={<Box className="h-6 w-6 text-blue-600" />}
          iconBgColor="bg-blue-50"
        />

        <StockCard
          title="Total Weight"
          value={weight(data?.total_gram_in_stock)}
          label={unit}
          icon={<Scale className="h-6 w-6 text-purple-600" />}
          iconBgColor="bg-purple-50"
        />

        <StockCard
          title="Incoming Stock"
          value={weight(data?.incoming_stock_gram)}
          label={`${unit} · ${pods(data?.incoming_stock_pod)} pods`}
          icon={<TrendingUp className="h-6 w-6 text-green-600" />}
          iconBgColor="bg-green-50"
        />

        <StockCard
          title="Issued Stock"
          value={weight(data?.issued_stock_gram)}
          label={`${unit} · ${pods(data?.issued_stock_pod)} pods`}
          icon={<TrendingDown className="h-6 w-6 text-red-600" />}
          iconBgColor="bg-red-50"
        />
      </div>
    </div>
  );
}
