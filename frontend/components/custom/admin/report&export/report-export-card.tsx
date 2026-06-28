"use client";

import { Clock, Download } from "lucide-react";
import CustomButton from "../../common/custom-button";

export type ReportExportCardProps = {
  title: string;
  description: string;
  years: string[];
  selectedYear?: string;
  isAllYears?: boolean;
  lastExport?: string;
  disabled?: boolean;
  onYearChange: (year: string) => void;
  onExport: () => void;
};

export default function ReportExportCard({
  title,
  description,
  years,
  selectedYear,
  isAllYears = false,
  lastExport,
  disabled = false,
  onYearChange,
  onExport,
}: ReportExportCardProps) {
  return (
    <div className="border-border bg-secondary overflow-hidden rounded-2xl border shadow-sm">
      <div className="border-primary border-t-4 px-6 py-4">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
            <Download className="h-5 w-5 text-green-700" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>

        {/* Form */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {/* Year */}
          <div>
            <label className="text-muted-foreground mb-2 block text-sm font-medium uppercase">
              Year
            </label>

            {isAllYears ? (
              <div className="bg-muted flex h-10 items-center rounded-xl border px-4 text-xs font-medium">
                All Years
              </div>
            ) : (
              <select
                value={selectedYear ?? ""}
                onChange={(e) => onYearChange(e.target.value)}
                className="bg-background h-10 w-full rounded-xl border px-4 text-xs"
              >
                <option value="">Select Year</option>

                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Format */}
          <div>
            <label className="text-muted-foreground mb-2 block text-sm font-medium uppercase">
              Format
            </label>

            <div className="bg-muted flex h-10 items-center rounded-xl border px-4 text-xs font-medium">
              Excel (.xlsx)
            </div>
          </div>
        </div>

        {/* Last Export */}
        {lastExport && (
          <div className="text-muted-foreground mt-5 flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>Last export:</span>
            <span className="font-medium">{lastExport}</span>
          </div>
        )}

        <div className="my-6 border-t" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          {!isAllYears && !selectedYear ? (
            <p className="text-xs text-orange-500">Select a year to export</p>
          ) : (
            <div />
          )}

          <CustomButton
            label="Export"
            icon={Download}
            onClick={onExport}
            disabled={isAllYears ? disabled : disabled || !selectedYear}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm hover:bg-green-700"
          />
        </div>
      </div>
    </div>
  );
}
