"use client";

import ReportExportCard from "@/components/custom/admin/report&export/report-export-card";
import SuccessToast from "@/components/custom/admin/report&export/success-message-box";
import React, { useState } from "react";

function ReportsAndExportPage() {
  const years = ["2023", "2024", "2025"];
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
            onYearChange={setClusterYear}
            disabled={!clusterYear}
            onExport={() => handleExport("Cluster Form Report", clusterYear)}
          />

          <ReportExportCard
            title="Harvest Grading Report"
            description="Export harvest grading records and quality assessment results."
            years={years}
            selectedYear={harvestYear}
            onYearChange={setHarvestYear}
            disabled={!harvestYear}
            onExport={() => handleExport("Harvest Grading Report", harvestYear)}
          />

          <ReportExportCard
            title="Grading Summary Report"
            description="Export summarized grading performance and yearly statistics."
            years={years}
            selectedYear={gradingYear}
            onYearChange={setGradingYear}
            disabled={!gradingYear}
            onExport={() => handleExport("Grading Summary Report", gradingYear)}
          />

          <ReportExportCard
            title="Stock Movement Report"
            description="Export inventory movement transactions for the selected year."
            years={years}
            selectedYear={stockMovementYear}
            onYearChange={setStockMovementYear}
            disabled={!stockMovementYear}
            onExport={() =>
              handleExport("Stock Movement Report", stockMovementYear)
            }
          />

          <ReportExportCard
            title="Stock Summary Report"
            description="Export annual inventory balances and stock overview."
            years={years}
            isAllYears
            onYearChange={() => {}}
            onExport={() => handleExport("Stock Summary Report", "All Years")}
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
