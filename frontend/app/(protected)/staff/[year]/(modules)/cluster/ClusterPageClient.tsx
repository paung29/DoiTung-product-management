"use client";

import { useRouter } from "next/navigation";
import ClusterSearch from "@/components/custom/staff/cluster-search";
import ClusterRecordingCard from "@/components/custom/staff/cluster-recording-card";
import StaffContent from "@/app/(protected)/staff/[year]/(modules)/cluster/layout";
import { Option } from "@/lib/types/model/option";

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
  zones,
  showSearch = true,
}: {
  link : string;
  editLink : string;
  year: string;
  defaultZoneNo?: string;
  records: ClusterRecord[];
  zones?: Option[];
  showSearch?: boolean;
}) {
  const router = useRouter();

  const onEdit = (record: ClusterRecord) => {
    // showSearch is false only for the History cluster list right now, so the
    // edit form knows to return to History instead of the live list on submit.
    const from = showSearch ? "" : "?from=history";
    router.push(`/staff/${year}/${link}/${record.id}/${editLink}${from}`);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <StaffContent>
        {showSearch && (
          <ClusterSearch defaultZoneNo={defaultZoneNo ?? ""} locations={zones ?? []}/>
        )}

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