"use client"
import { useParams, useRouter } from "next/navigation";
import StaffContent from "../cluster/layout";
import ClusterSearch from "@/components/custom/staff/cluster-search";

export default function PollinationEntryPage() {

  const router = useRouter();
  const params = useParams();
  const year = params.year as string;
  const Id = params.formId as string;

  const onClick = () => {
    router.push(`/staff/${year}/pollination/1/pollination-form`)
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