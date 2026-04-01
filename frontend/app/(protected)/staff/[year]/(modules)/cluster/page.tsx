"use client"

import ClusterRecordingCard from "@/components/custom/staff/cluster-recording-card";
import ClusterSearch from "@/components/custom/staff/cluster-search";
import StaffContent from "./layout";
import { useParams, useRouter } from "next/navigation";

export default function ClusterEntryPage() {

  const router = useRouter();
  const params = useParams();

  const year = params.year as string

  const onEdit = () => {
    router.push(`/staff/${year}/cluster/1/cluster-form-edit`)
  }
  return (
    <div className="space-y-4 sm:space-y-6">
      

      <StaffContent>
        <ClusterSearch />
      </StaffContent>

      <StaffContent>
        <div className="space-y-4">
          <ClusterRecordingCard onEdit={onEdit}/>
          <ClusterRecordingCard onEdit={onEdit}/>
          <ClusterRecordingCard onEdit={onEdit}/>
          <ClusterRecordingCard onEdit={onEdit}/>
          <ClusterRecordingCard onEdit={onEdit}/>
          <ClusterRecordingCard onEdit={onEdit}/>
        </div>
      </StaffContent>
    </div>
  );
}

