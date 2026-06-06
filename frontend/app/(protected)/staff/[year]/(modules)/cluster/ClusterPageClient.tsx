"use client";

import { useRouter } from "next/navigation";
import ClusterSearch from "@/components/custom/staff/cluster-search";
import ClusterRecordingCard from "@/components/custom/staff/cluster-recording-card";
import StaffContent from "@/app/(protected)/staff/[year]/(modules)/cluster/layout";

interface ClusterRecord {
  id: string;
  no: number;
  location: string;
  poleNumber: string;
  clusterId: string;
  recordedDate: string;
  progressDone: number;
}

export default function ClusterPageClient({
  link,
  editLink,
  year,
  defaultZoneNo,
  records,
}: {
  link : string;
  editLink : string;
  year: string;
  defaultZoneNo: string;
  records: ClusterRecord[];
}) {
  const router = useRouter();

  const handleSearch = (newZoneNo: string) => {
    router.push(`/staff/${year}/cluster?zoneNo=${newZoneNo}`);
  };

  const onEdit = (record: ClusterRecord) => {
    router.replace(`/staff/${year}/${link}/${record.id}/${editLink}`);
  };

  return (
    <div className="space-y-4 sm:space-y-6">


      <StaffContent>
        <div className="space-y-4">
          {records.map((record, index) => (
            <ClusterRecordingCard
              key={record.id ?? index}
              record={record}
              onEdit={onEdit}
            />
          ))}
        </div>
      </StaffContent>
    </div>
  );
}