import DistributionHistory from "@/components/custom/admin/inventory&distribution/distribution-history";
import DistributionTable, { DistributionRecord } from "@/components/custom/admin/inventory&distribution/distribution-tabel";

export default function HistoryPageClient({records} : {records : DistributionRecord[]}) {
  return (
    <div className="space-y-6 px-10 py-6">
        <DistributionHistory />
        <DistributionTable records={records}/>
    </div>
  );
}