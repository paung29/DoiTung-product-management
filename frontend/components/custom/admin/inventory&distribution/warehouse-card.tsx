"use client";

import { Package, TrendingUp, CheckCircle, Weight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className: string;
}

function StatCard({ title, value, icon, className }: StatCardProps) {
  return (
    <div
      className={`group relative flex h-32 w-60 items-center justify-between rounded-2xl px-8 py-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      {/* Left: Title and Value */}
      <div className="flex flex-col justify-center">
        <p className="text-opacity-90 text-sm font-medium text-white">
          {title}
        </p>
        <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      </div>

      {/* Right: Icon */}
      <div className="bg-opacity-25 flex items-center justify-center rounded-2xl bg-white p-4 backdrop-blur-md">
        <div className="text-white">{icon}</div>
      </div>
    </div>
  );
}

export type WarehouseCardData = {
  totalWarehouse: string;
  totalStockPods: string;
  totalWeightPods: string;
  activeWarehouse: string;
};

type Props = {
  data: WarehouseCardData;
};

export default function WarehouseCard({ data }: Props) {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Warehouse"
          value={data.totalWarehouse}
          icon={<Package className="h-6 w-6 text-black" />}
          className="bg-linear-to-br from-amber-950 to-amber-900"
        />

        <StatCard
          title="Total Stock Pods"
          value={data.totalStockPods}
          icon={<TrendingUp className="h-6 w-6 text-black" />}
          className="bg-linear-to-br from-amber-950 to-amber-900"
        />

        <StatCard
          title="Total Weight Pods"
          value={data.totalWeightPods + " g"}
          icon={<Weight className="h-6 w-6 text-black" />}
          className="bg-linear-to-br from-amber-950 to-amber-900"
        />

        <StatCard
          title="Active Warehouse"
          value={data.activeWarehouse}
          icon={<CheckCircle className="h-6 w-6 text-black" />}
          className="bg-linear-to-br from-amber-950 to-amber-900"
        />
      </div>
    </div>
  );
}
