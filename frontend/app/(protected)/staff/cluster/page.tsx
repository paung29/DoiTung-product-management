import ClusterRecordingCard from "@/components/custom/staff/cluster-recording-card";
import ClusterSearch from "@/components/custom/staff/cluster-search";

export default function ClusterEntryPage() {
  return (
    <>
      <h1>Cluster Entry Page</h1>

      <ClusterSearch />

      <ClusterRecordingCard />
      <ClusterRecordingCard />
      <ClusterRecordingCard />
    </>
  );
}

