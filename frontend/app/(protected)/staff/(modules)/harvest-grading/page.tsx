"use client";

import { useState } from "react";
import HarvestGradingRecordingCard from "@/components/custom/staff/harvest-grading-recording-card";
import HarvestAndGradingSearch from "@/components/custom/staff/harvest-grading-search";
import HarvestGradingRecordingForm from "@/components/custom/staff/form/harvest-grading-recording-form";
import type { HarvestGradingRecord } from "@/components/custom/staff/harvest-grading-recording-card";

export default function HarvestGradingEntryPage() {
  const [selectedRecord, setSelectedRecord] =
    useState<HarvestGradingRecord | null>(null);
  const [showForm, setShowForm] = useState(false);

  const mockRecords: HarvestGradingRecord[] = [
    {
      id: "1",
      no: 1,
      location: "Phamee Zone 1, Phase 1",
      poleNumber: "P-00001",
      recordedDate: "15/01/2026",
      editedDate: "20/01/2026",
      status: "complete",
    },
    {
      id: "2",
      no: 2,
      location: "Phamee Zone 2, Phase 1",
      poleNumber: "P-00002",
      recordedDate: "14/01/2026",
      editedDate: "19/01/2026",
      status: "complete",
    },
    {
      id: "3",
      no: 3,
      location: "Phamee Zone 3, Phase 1",
      poleNumber: "P-00003",
      recordedDate: "13/01/2026",
      editedDate: "18/01/2026",
      status: "incomplete",
    },
    {
      id: "4",
      no: 4,
      location: "Phamee Zone 4, Phase 1",
      poleNumber: "P-00004",
      recordedDate: "12/01/2026",
      editedDate: "00/00/0000",
      status: "complete",
    },
    {
      id: "5",
      no: 5,
      location: "Phamee Zone 5, Phase 1",
      poleNumber: "P-00005",
      recordedDate: "11/01/2026",
      editedDate: "16/01/2026",
      status: "pending",
    },
  ];

  const handleEditRecord = (record: HarvestGradingRecord) => {
    setSelectedRecord(record);
    setShowForm(true);
  };

  const handleBackToList = () => {
    setShowForm(false);
    setSelectedRecord(null);
  };

  if (showForm) {
    return (
      <div className="px-2 py-4 sm:px-4">
        <HarvestGradingRecordingForm
          record={selectedRecord}
          onBack={handleBackToList}
        />
      </div>
    );
  }

  return (
    <>
      <div className="px-2 py-4 sm:px-4">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Harvest Grading Entry Page
        </h1>
        <HarvestAndGradingSearch />

        <div className="mt-6 space-y-2">
          {mockRecords.map((record) => (
            <div key={record.id} onClick={() => handleEditRecord(record)}>
              <HarvestGradingRecordingCard
                records={[record]}
                onEdit={handleEditRecord}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
