"use client";

import { useRouter } from "next/navigation";
import HarvestGradingRecordingCard from "@/components/custom/staff/harvest-grading-recording-card";
import {
  HarvestAndGradingItem,
  HarvestGradingRecord,
} from "@/lib/types/model/type";
import HarvestAndGradingSearch from "@/components/custom/staff/harvest-grading-search";
import { Option } from "@/lib/types/model/option";

type Props = {
  zoneNo: string
  poles: HarvestAndGradingItem[];
  year: string;
  zones : Option[]
};

export function mapToHarvestGradingRecord(
  item: HarvestAndGradingItem
): HarvestGradingRecord {
  return {
    poleid: item.poleId,
    location: item.location,
    poleNumber: item.poleNo.toString(),
    recordedDate: item.createdAt,
    editedDate: item.updatedAt,
    status: item.harvestGradingFormDone ? "complete" : "incomplete",
  };
}

export default function HarvestGradingList({ poles, year,zoneNo, zones }: Props) {
  const router = useRouter();

  const handleEditRecord = (record: HarvestGradingRecord) => {
    router.replace(`/staff/${year}/harvest-grading/${record.poleid}/harvest-grading-form?zoneNo=${zoneNo}`);
  };

  const records = poles.map(mapToHarvestGradingRecord);

  return (
    <div className="mt-6 space-y-2">

      <HarvestAndGradingSearch locations={zones} defaultZone={zoneNo}/>
      
      {records.map((record) => (
        <HarvestGradingRecordingCard
          key={record.poleNumber}
          records={[record]}
          onEdit={handleEditRecord}
        />
      ))}
    </div>
  );
}