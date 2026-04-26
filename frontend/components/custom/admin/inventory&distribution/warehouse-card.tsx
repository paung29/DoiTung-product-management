"use client";

import { Package, TrendingUp, CheckCircle } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className: string;
}

function StatCard({ title, value, icon, className }: StatCardProps) {
  return (
    <div
      className={`group relative flex h-32 w-72 items-center justify-between rounded-xl px-6 py-4 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${className}`}
    >
      {/* Left: Title and Value */}
      <div>
        <p className="text-opacity-75 text-xs font-medium text-white">
          {title}
        </p>
        <p className="mt-1 text-3xl font-bold text-white">{value}</p>
      </div>

      {/* Right: Icon */}
      <div className="bg-opacity-30 flex items-center justify-center rounded-lg bg-white p-3 backdrop-blur-sm">
        <div className="text-white">{icon}</div>
      </div>
    </div>
  );
}

export default function WarehouseCard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-3">
        <StatCard
          title="Total Warehouse"
          value="4"
          icon={<Package className="h-6 w-6" />}
          className="bg-slate-900"
        />

        <StatCard
          title="Total Stock"
          value="700 kg"
          icon={<TrendingUp className="h-6 w-6" />}
          className="bg-linear-to-br from-amber-700 to-amber-900"
        />

        <StatCard
          title="Active Warehouse"
          value="3"
          icon={<CheckCircle className="h-6 w-6" />}
          className="bg-blue-600"
        />
      </div>
    </div>
  );
}
