"use client";

import { CheckCircle, Package, TrendingUp, Weight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  label: string;
  icon: React.ReactNode;
  iconWrapperClassName: string;
}

function StatCard({
  title,
  value,
  label,
  icon,
  iconWrapperClassName,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-6">
        <div className={` ${iconWrapperClassName} rounded-lg p-2`}>{icon}</div>

        <div className="flex-1">
          <p className="text-xs text-gray-600">{title}</p>
          <p className="mt-1 text-lg font-bold text-gray-900">{value}</p>
          <p className="mt-0.5 text-xs text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

export type WarehouseCardData = {
  totalWarehouse: number;
  remainingStockPods: number;
  remainingStockWeights: number;
  activeWarehouse: number;
};

type Props = {
  data: WarehouseCardData;
};

export default function WarehouseCard({ data }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Warehouse"
          value={data.totalWarehouse.toLocaleString()}
          label="locations"
          icon={<Package className="h-6 w-6 text-blue-600" />}
          iconWrapperClassName="bg-blue-50"
        />

        <StatCard
          title="Total Remaining Pods"
          value={data.remainingStockPods.toLocaleString()}
          label="pods"
          icon={<TrendingUp className="h-6 w-6 text-violet-600" />}
          iconWrapperClassName="bg-violet-50"
        />

        <StatCard
          title="Total Remaining Weight"
          value={data.remainingStockWeights.toLocaleString()}
          label="g"
          icon={<Weight className="h-6 w-6 text-amber-600" />}
          iconWrapperClassName="bg-amber-50"
        />

        <StatCard
          title="Active Warehouse"
          value={data.activeWarehouse.toLocaleString()}
          label={`of ${data.totalWarehouse.toLocaleString()} currently active`}
          icon={<CheckCircle className="h-6 w-6 text-emerald-600" />}
          iconWrapperClassName="bg-emerald-50"
        />
      </div>
    </div>
  );
}
