import ClusterRecordingCard from "@/components/custom/staff/cluster-recording-card";
import HarvestGradingRecordingCard from "@/components/custom/staff/harvest-grading-recording-card";
import HarvestAndGradingSearch from "@/components/custom/staff/harvest-grading-search";
import React from "react";

function StaffHistory() {
  return (
    <div>
      StaffHistory
      <div>
        <HarvestAndGradingSearch />
      </div>
      <div>
        <HarvestGradingRecordingCard />
        <HarvestGradingRecordingCard />
        <ClusterRecordingCard />
      </div>
    </div>
  );
}

export default StaffHistory;
