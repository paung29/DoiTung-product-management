import DistributionHistory from "@/components/custom/admin/inventory&distribution/distribution-history";
import DistributionTable from "@/components/custom/admin/inventory&distribution/distribution-tabel";

export default function HistoryPage() {
  return (
    <div className="space-y-6 px-10 py-6">
      <DistributionHistory />
      <DistributionTable />
    </div>
  );
}