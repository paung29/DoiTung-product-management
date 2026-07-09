import DistributionHistory from "@/components/custom/admin/inventory&distribution/distribution-history";
import DistributionTable, { DistributionRecord } from "@/components/custom/admin/inventory&distribution/distribution-tabel";
import { Option } from "@/lib/types/model/option";

export default function HistoryPageClient({records, plantationYearOptions, plantationAreaOptions} : {records : DistributionRecord[], plantationYearOptions : Option[], plantationAreaOptions: Option[]}) {
  return (
    <div className="space-y-6 px-10 py-6">
        <DistributionHistory plantationYearOptions={plantationYearOptions} plantationAreaOptions={plantationAreaOptions}/>
        <DistributionTable records={records}/>
    </div>
  );
}