import CreateYearButton from "@/components/custom/admin/zone&form/year/create-year-button";
import YearTable, {
  YearTableDataType,
} from "@/components/custom/admin/zone&form/year/year-table";
import StatusCard from "../../statusCard";
import { Calendar } from "lucide-react";

function YearManagementTab({ records }: { records: YearTableDataType[] }) {
  const { years } = YearApiResponse({
    records: records,
  });

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Title */}
      <h1 className="text-primary-button text-2xl font-bold">
        Year Management
      </h1>

      {/* Toolbar Area: Status Card + Create Button */}
      <div className="flex items-center justify-between">
        <div className="w-full max-w-62.5">
          <StatusCard
            icon={<Calendar size={36} />}
            value={years.length}
            label="Total Year"
          />
        </div>

        <CreateYearButton />
      </div>

      {/* Data Table */}
      <div className="w-full">
        <YearTable yearTableData={records} />
      </div>
    </div>
  );
}

export default YearManagementTab;

function YearApiResponse(arg0: { records: YearTableDataType[] }) {
  return {
    years: arg0.records.map((record) => record.year),
  };
}
