"use client";

import ReportExportCard from "@/components/custom/admin/report&export/report-export-card";
import SuccessToast from "@/components/custom/admin/report&export/success-message-box";
import { exportExcelFile } from "@/lib/server-actions/admin/export-form-client";
import { exportConfigs } from "@/lib/utl";
import React, { useState } from "react";


function ReportsAndExportPage({ years }: { years: string[] }) {
  const [error, setError] = useState<string | null>(null);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastDescription, setToastDescription] = useState("");

  const [clusterYear, setClusterYear] = useState("");
  const [harvestYear, setHarvestYear] = useState("");
  const [gradingYear, setGradingYear] = useState("");
  const [stockMovementYear, setStockMovementYear] = useState("");
  const [stockSummaryYear, setStockSummaryYear] = useState("");

  function handleExport(name: string, year: string) {
    setToastTitle(`${name} exported`);
    setToastDescription(`Year ${year} · EXCEL format`);
    setToastVisible(true);

    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  }

  async function downloadExcelFile(
    path: string,
    year: string,
    reportName: string
  ) {
    setError(null);

    try {
      const result = await exportExcelFile(path, year);

      if (!result.success) {
        setError(result.message ?? "Cannot download file.");
        return;
      }

      const byteCharacters = atob(result.file ?? "");
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: result.contentType });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = result.filename ?? `${reportName}-${year}.xlsx`;
      a.click();

      window.URL.revokeObjectURL(url);

      handleExport(reportName, year);
    } catch {
      setError("Cannot download file. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="mb-6 text-xl font-semibold sm:text-2xl">
          Reports & Export
        </h1>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-6 sm:space-y-8">
          <ReportExportCard
            title="Cluster Form Report"
            description="Export cluster registration and production information."
            years={years}
            selectedYear={clusterYear}
            onYearChange={setClusterYear}
            disabled={!clusterYear}
            onExport={() =>
              downloadExcelFile(
                exportConfigs.cluster.path,
                clusterYear,
                exportConfigs.cluster.name
              )
            }
          />

          <ReportExportCard
            title="Harvest Grading Report"
            description="Export harvest grading records and quality assessment results."
            years={years}
            selectedYear={harvestYear}
            onYearChange={setHarvestYear}
            disabled={!harvestYear}
            onExport={() =>
              downloadExcelFile(
                exportConfigs.harvest.path,
                harvestYear,
                exportConfigs.harvest.name
              )
            }
          />

          <ReportExportCard
            title="Grading Summary Report"
            description="Export summarized grading performance and yearly statistics."
            years={years}
            selectedYear={gradingYear}
            onYearChange={setGradingYear}
            disabled={!gradingYear}
            onExport={() =>
              downloadExcelFile(
                exportConfigs.grading.path,
                gradingYear,
                exportConfigs.grading.name
              )
            }
          />

          <ReportExportCard
            title="Stock Movement Report"
            description="Export inventory movement transactions for the selected year."
            years={years}
            selectedYear={stockMovementYear}
            onYearChange={setStockMovementYear}
            disabled={!stockMovementYear}
            onExport={() =>
              downloadExcelFile(
                exportConfigs.stockMovement.path,
                stockMovementYear,
                exportConfigs.stockMovement.name
              )
            }
          />

          <ReportExportCard
            title="Stock Summary Report"
            description="Export annual inventory balances and stock overview."
            years={years}
            selectedYear={stockSummaryYear}
            onYearChange={setStockSummaryYear}
            disabled={!stockSummaryYear}
            onExport={() =>
              downloadExcelFile(
                exportConfigs.stockSummary.path,
                stockSummaryYear,
                exportConfigs.stockSummary.name
              )
            }
          />
        </div>

        <SuccessToast
          visible={toastVisible}
          title={toastTitle}
          description={toastDescription}
        />
      </div>
    </div>
  );
}

export default ReportsAndExportPage;