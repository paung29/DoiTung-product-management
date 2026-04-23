"use client";

import { Card } from "@/components/ui/card";
import CustomButton from "../common/custom-button";
import { Edit } from "lucide-react";
import ProgressLight from "../common/progress-light";

export interface ClusterRecord {
  id: string;
  no: number;
  location: string;
  poleNumber: string;
  clusterId: string;
  recordedDate: string;
  progressDone: number;
}

interface ClusterRecordingCardProps {
  record: ClusterRecord;
  onEdit?: (record: ClusterRecord) => void;
}

export default function ClusterRecordingCard({
  record,
  onEdit = () => {},
}: ClusterRecordingCardProps) {
  return (
    <Card className="card-vanilla mt-4 overflow-hidden rounded-lg p-3 shadow-sm sm:p-4">
      <div className="grid grid-cols-2 items-center gap-2 text-xs md:grid-cols-5 md:gap-4 md:text-sm">
        <div>
          <p className="text-muted-foreground text-xs">No.</p>
          <p className="text-sm font-medium">{record.no}</p>
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
          <p className="text-muted-foreground text-xs">Cluster Number</p>
          <p className="text-sm font-medium">{record.clusterId}</p>
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

      <div className="my-0 border-t" />

      <div className="flex flex-col items-start justify-between gap-2 text-xs sm:flex-row sm:items-center">
        <p className="text-muted-foreground">
          Recorded: {record.recordedDate}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Progress</span>
          <ProgressLight total={5} current={record.progressDone} />
        </div>
      </div>
    </Card>
  );
}