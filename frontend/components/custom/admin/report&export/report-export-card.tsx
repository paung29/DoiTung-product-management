"use client";

import { Download, Clock } from "lucide-react";
import CustomButton from "../../common/custom-button";
import SuccessToast from "./success-message-box";

export type ReportExportCardProps = {
  title: string;
  description: string;
  years: string[];
  selectedYear?: string;
  format: string;
  lastExport?: string;
  disabled?: boolean;
  onYearChange: (year: string) => void;
  onFormatChange: (format: string) => void;
  onExport: () => void;
};

export default function ReportExportCard({
  title,
  description,
  years,
  selectedYear,
  format,
  lastExport,
  disabled = false,
  onYearChange,
  onFormatChange,
  onExport,
}: ReportExportCardProps) {
  return (
    <div className="border-border overflow-hidden rounded-2xl border bg-white shadow-sm">
      {/* Header */}
      <div className="border-primary border-t-4 px-6 py-4">
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
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {/* Year */}
          <div>
            <label className="text-muted-foreground mb-2 block text-sm font-medium uppercase">
              Year
            </label>

            <select
              value={selectedYear ?? ""}
              onChange={(e) => onYearChange(e.target.value)}
              className="bg-background h-10 w-full rounded-xl border px-4 text-xs"
            >
              <option value="" className="text-sm">
                Select Year
              </option>

              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Format */}
          <div>
            <label className="text-muted-foreground mb-2 block text-sm font-medium uppercase">
              Format
            </label>

            <select
              value={format}
              onChange={(e) => onFormatChange(e.target.value)}
              className="bg-background h-10 w-full rounded-xl border px-4 text-xs"
            >
              <option value="xlsx">Excel (.xlsx)</option>
              <option value="csv">CSV (.csv)</option>
              <option value="pdf">PDF (.pdf)</option>
            </select>
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

        <div className="flew">
          {/* Footer */}
          <div className="flex items-center justify-between pt-4">
            {!selectedYear ? (
              <p className="text-xs text-orange-500">Select a year to export</p>
            ) : (
              <div />
            )}

            <CustomButton
              label="Export"
              icon={Download}
              onClick={onExport}
              disabled={disabled || !selectedYear}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm hover:bg-green-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
