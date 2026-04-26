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
      className={`group relative flex h-32 w-72 items-center justify-between rounded-2xl px-8 py-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      {/* Left: Title and Value */}
      <div className="flex flex-col justify-center">
        <p className="text-opacity-90 text-sm font-medium text-white">
          {title}
        </p>
        <p className="mt-2 text-4xl font-bold text-white">{value}</p>
      </div>

      {/* Right: Icon */}
      <div className="bg-opacity-25 flex items-center justify-center rounded-2xl bg-white p-4 backdrop-blur-md">
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
          icon={<Package className="h-6 w-6 text-black" />}
          className="bg-slate-900"
        />

        <StatCard
          title="Total Stock"
          value="700 kg"
          icon={<TrendingUp className="h-6 w-6 text-black" />}
          className="bg-linear-to-br from-amber-700 to-amber-900"
        />

        <StatCard
          title="Active Warehouse"
          value="3"
          icon={<CheckCircle className="h-6 w-6 text-black" />}
          className="bg-blue-600"
        />
      </div>
    </div>
  );
}
