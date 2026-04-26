"use client"

import ClusterSearch from "@/components/custom/staff/cluster-search";
import StaffContent from "../cluster/layout";
import ClusterRecordingCard from "@/components/custom/staff/cluster-recording-card";
import { useParams, useRouter } from "next/navigation";

export default function PodEntryPage() {

    const router = useRouter();
    const params = useParams();
    const year = params.year as string;
    const Id = params.formId as string;
  
    const onClick = () => {
      router.push(`/staff/${year}/pod/1/pod-form`)
    }
  
    return(
        <div className="space-y-4 sm:space-y-6">
                      
                
                      <StaffContent>
                        <ClusterSearch />
                      </StaffContent>
                
                      <StaffContent>
                        <div className="space-y-4">
                          
                        </div>
                      </StaffContent>
                </div>
    )
}