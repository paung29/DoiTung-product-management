"use client"

import ClusterSearch from "@/components/custom/staff/cluster-search";
import StaffContent from "../cluster/layout";
import ClusterRecordingCard from "@/components/custom/staff/cluster-recording-card";
import { useParams, useRouter } from "next/navigation";

export default function PreHarvestEntryPage() {

  const router = useRouter();
  const params = useParams();
  const year = params.year as string;
  const Id = params.formId as string;

  const onClick = () => {
    router.push(`/staff/${year}/pre-harvest/1/pre-harvest-form`)
  }
    return(
        <div className="space-y-4 sm:space-y-6">
          <StaffContent>
            <ClusterSearch />
          </StaffContent>
    
          <StaffContent>
            <div className="space-y-4">
              <ClusterRecordingCard onEdit={onClick} />
              <ClusterRecordingCard onEdit={onClick} />
              <ClusterRecordingCard onEdit={onClick} />
              <ClusterRecordingCard onEdit={onClick} />
              <ClusterRecordingCard onEdit={onClick} />
              <ClusterRecordingCard onEdit={onClick} />
            </div>
          </StaffContent>   
        </div>
    )
}