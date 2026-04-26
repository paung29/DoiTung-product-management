"use client";

import {
  Box,
  Scale,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

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

interface MovementItemProps {
  label: string;
  value: number;
  isPositive: boolean;
}

function MovementItem({ label, value, isPositive }: MovementItemProps) {
  const textColor = isPositive ? "text-green-600" : "text-red-600";
  const bgColor = isPositive ? "bg-green-50" : "bg-red-50";
  const Icon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className={`${bgColor} rounded-lg p-2`}>
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${textColor}`} />
        <span className="text-xs text-gray-600">{label}</span>
      </div>
      <p className={`mt-0.5 text-sm font-bold ${textColor}`}>
        {isPositive ? "+" : "-"}
        {Math.abs(value).toLocaleString()}
      </p>
    </div>
  );
}

function StockMovementCard() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-xs text-gray-600">Monthly Stock Movement</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <MovementItem label="Stock In" value={1245} isPositive={true} />
        <MovementItem label="Stock Out" value={892} isPositive={false} />
      </div>
    </div>
  );
}

export default function StockOverviewCards() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StockCard
          title="Total Pods in Stock"
          value="9,700"
          label="pods"
          icon={<Box className="h-6 w-6 text-blue-600" />}
          iconBgColor="bg-blue-50"
        />

        <StockCard
          title="Total Weight"
          value="3,468"
          label="kg"
          icon={<Scale className="h-6 w-6 text-purple-600" />}
          iconBgColor="bg-purple-50"
        />

        <StockCard
          title="Low Stock Items"
          value="2"
          label="Critical"
          icon={<AlertCircle className="h-6 w-6 text-red-600" />}
          iconBgColor="bg-red-50"
        />

        <StockMovementCard />
      </div>
    </div>
  );
}
