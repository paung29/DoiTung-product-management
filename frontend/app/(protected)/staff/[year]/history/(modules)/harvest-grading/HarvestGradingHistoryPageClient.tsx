"use client";

import { useRouter } from "next/navigation";
import HarvestGradingRecordingCard from "@/components/custom/staff/harvest-grading-recording-card";
import { HarvestGradingRecord } from "@/lib/types/model/type";

type Props = {
  records: HarvestGradingRecord[];
  year: string;
};

export default function HarvestGradingHistoryPageClient({ records, year }: Props) {
  const router = useRouter();

  const handleEditRecord = (record: HarvestGradingRecord) => {
    router.push(`/staff/${year}/harvest-grading/${record.poleid}/harvest-grading-form?from=history`);
  };

  return (
    <div className="px-2 py-2 sm:px-4">
      <HarvestGradingRecordingCard records={records} onEdit={handleEditRecord} />
    </div>
  );
}
