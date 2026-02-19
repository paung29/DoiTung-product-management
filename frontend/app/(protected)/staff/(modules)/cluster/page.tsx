import ClusterRecordingCard from "@/components/custom/staff/cluster-recording-card";
import ClusterSearch from "@/components/custom/staff/cluster-search";
import StaffContent from "./layout";

export default function ClusterEntryPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      

      <StaffContent>
        <ClusterSearch />
      </StaffContent>

      <StaffContent>
        <div className="space-y-4">
          <ClusterRecordingCard />
          <ClusterRecordingCard />
          <ClusterRecordingCard />
          <ClusterRecordingCard />
          <ClusterRecordingCard />
          <ClusterRecordingCard />
        </div>
      </StaffContent>
    </div>
  );
}

