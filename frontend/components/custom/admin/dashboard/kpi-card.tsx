"use client";

import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

export default function KPICard({
  title,
  value,
  unit = "",
  icon: Icon,
  trend,
  description,
}: KPICardProps) {
  return (
    <Card className="border-primary-button/20 overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="p-4">
        {/* Header with Icon and Title */}
        <div className="mb-2 flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-600">{title}</p>
          </div>
          {Icon && (
            <div className="bg-primary-button/10 ml-3 flex h-8 w-8 items-center justify-center rounded-lg">
              <Icon className="text-primary-button h-4 w-4" />
            </div>
          )}
        </div>

        {/* Value Section */}
        <div className="mb-2">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            {unit && (
              <span className="text-sm font-semibold text-gray-600">
                {unit}
              </span>
            )}
          </div>
        </div>

        {/* Trend or Description */}
        {trend ? (
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold ${
                trend.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-gray-500">from last year</span>
          </div>
        ) : description ? (
          <p className="text-xs text-gray-500">{description}</p>
        ) : null}
      </div>
    </Card>
  );
}
