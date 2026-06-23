"use client";

import ReportExportCard from "@/components/custom/admin/report&export/report-export-card";
import SuccessToast from "@/components/custom/admin/report&export/success-message-box";
import React, { useState } from "react";

function ReportsAndExportPage() {
  const years = ["2023", "2024", "2025"];
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [clusterYear, setClusterYear] = useState("");
  const [clusterFormat, setClusterFormat] = useState("xlsx");

  const [harvestYear, setHarvestYear] = useState("");
  const [harvestFormat, setHarvestFormat] = useState("xlsx");

  const [gradingYear, setGradingYear] = useState("");
  const [gradingFormat, setGradingFormat] = useState("xlsx");

  const [stockMovementYear, setStockMovementYear] = useState("");
  const [stockMovementFormat, setStockMovementFormat] = useState("xlsx");

  const [stockSummaryYear, setStockSummaryYear] = useState("");
  const [stockSummaryFormat, setStockSummaryFormat] = useState("xlsx");

  function handleExport(name: string, year: string, format: string) {
    showToast(
      `${name} exported\nYear ${year} · ${format.toUpperCase()} format`,
    );
  }
  function showToast(message: string) {
    setToastMessage(message);
    setToastVisible(true);

    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-10">
      {/* Centered container */}
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="mb-6 text-xl font-semibold sm:text-2xl">
          Reports & Export
        </h1>

        {/* Card stack */}
        <div className="space-y-6 sm:space-y-8">
          <ReportExportCard
            title="Cluster Form Report"
            description="Export cluster registration and production information."
            years={years}
            selectedYear={clusterYear}
            format={clusterFormat}
            onYearChange={setClusterYear}
            onFormatChange={setClusterFormat}
            disabled={!clusterYear}
            onExport={() =>
              handleExport("Cluster Form Report", clusterYear, clusterFormat)
            }
          />

          <ReportExportCard
            title="Harvest Grading Report"
            description="Export harvest grading records and quality assessment results."
            years={years}
            selectedYear={harvestYear}
            format={harvestFormat}
            onYearChange={setHarvestYear}
            onFormatChange={setHarvestFormat}
            disabled={!harvestYear}
            onExport={() =>
              handleExport("Harvest Grading Report", harvestYear, harvestFormat)
            }
          />

          <ReportExportCard
            title="Grading Summary Report"
            description="Export summarized grading performance and yearly statistics."
            years={years}
            selectedYear={gradingYear}
            format={gradingFormat}
            onYearChange={setGradingYear}
            onFormatChange={setGradingFormat}
            disabled={!gradingYear}
            onExport={() =>
              handleExport("Grading Summary Report", gradingYear, gradingFormat)
            }
          />

          <ReportExportCard
            title="Stock Movement Report"
            description="Export inventory movement transactions for the selected year."
            years={years}
            selectedYear={stockMovementYear}
            format={stockMovementFormat}
            onYearChange={setStockMovementYear}
            onFormatChange={setStockMovementFormat}
            disabled={!stockMovementYear}
            onExport={() =>
              handleExport(
                "Stock Movement Report",
                stockMovementYear,
                stockMovementFormat,
              )
            }
          />

          <ReportExportCard
            title="Stock Summary Report"
            description="Export annual inventory balances and stock overview."
            years={years}
            selectedYear={stockSummaryYear}
            format={stockSummaryFormat}
            onYearChange={setStockSummaryYear}
            onFormatChange={setStockSummaryFormat}
            disabled={!stockSummaryYear}
            onExport={() =>
              handleExport(
                "Stock Summary Report",
                stockSummaryYear,
                stockSummaryFormat,
              )
            }
          />
        </div>
        <SuccessToast message={toastMessage} visible={toastVisible} />
      </div>
    </div>
  );
}

export default ReportsAndExportPage;
