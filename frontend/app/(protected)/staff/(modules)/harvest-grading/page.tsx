import HarvestGradingRecordingCard from "@/components/custom/staff/harvest-grading-recording-card";
import HarvestAndGradingSearch from "@/components/custom/staff/harvest-grading-search";

export default function HarvestGradingEntryPage() {
  return (
    <>
      <h1>Harvest Grading Entry Page</h1>
      <HarvestAndGradingSearch />

      <div>
        <HarvestGradingRecordingCard />
        <HarvestGradingRecordingCard />
        <HarvestGradingRecordingCard />
        <HarvestGradingRecordingCard />
        <HarvestGradingRecordingCard />
      </div>
    </>
  );
}
