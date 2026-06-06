"use client";

import { Card } from "@/components/ui/card";
import CustomButton from "../common/custom-button";
import { Edit } from "lucide-react";
import { HarvestGradingRecord } from "@/lib/types/model/type";

interface HarvestGradingRecordingCardProps {
  records?: HarvestGradingRecord[];
  onEdit?: (record: HarvestGradingRecord) => void;
}

export default function HarvestGradingRecordingCard({
  records = [],
  onEdit = () => {},
}: HarvestGradingRecordingCardProps) {
  // Default
  const defaultRecords: HarvestGradingRecord[] = [
    {
      poleid: 0,
      location: "Phamee Zone 1, Phase 1",
      poleNumber: "P-00001",
      recordedDate: "15/01/2026",
      editedDate: "20/01/2026",
      status: "complete",
    },
  ];

  const displayRecords = records.length > 0 ? records : defaultRecords;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-green-100 text-green-700";
      case "incomplete":
        return "bg-orange-100 text-orange-700";
      case "pending":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "complete":
        return "Complete";
      case "incomplete":
        return "Incomplete";
      case "pending":
        return "Pending";
      default:
        return status;
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-2 sm:px-4">
      {displayRecords.map((record) => (
        <Card
          key={record.poleNumber}
          className="card-vanilla mt-4 overflow-hidden rounded-lg p-3 shadow-sm sm:p-4"
        >
          {/* Top Section */}
          <div className="grid grid-cols-2 items-center gap-2 text-xs md:grid-cols-5 md:gap-4 md:text-sm">
            <div>
              <p className="text-muted-foreground text-xs">No.</p>
              <p className="text-sm font-medium">{record.poleid}</p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Location</p>
              <p className="text-sm font-medium">{record.location}</p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Pole Number</p>
              <p className="text-sm font-medium">{record.poleNumber}</p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Record Date</p>
              <p className="text-sm font-medium">{record.recordedDate}</p>
            </div>

            <div className="flex justify-end">
              <CustomButton
                label="Edit"
                icon={Edit}
                onClick={() => onEdit(record)}
                className="w-20 py-1 text-xs"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="my-0 border-t" />

          {/* Bottom Section */}
          <div className="flex flex-col items-start justify-between gap-2 text-xs sm:flex-row sm:items-center">
            <p className="text-muted-foreground">Edited:{record.editedDate}</p>

            <div className="flex items-center gap-4">
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(
                  record.status,
                )}`}
              >
                {getStatusLabel(record.status)}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
