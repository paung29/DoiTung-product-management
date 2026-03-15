import YearTable, {
  YearTableDataType,
} from "@/components/custom/admin/zone&form/year-table";
import React from "react";

function YearManagementPage() {
  const yearData: YearTableDataType[] = [
    {
      year: "2023",
      totalZone: 5,
      totalPole: 10,
    },
    {
      year: "2024",
      totalZone: 8,
      totalPole: 15,
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-4">
        <button className="bg-success m-4 w-60 self-end rounded-lg px-4 py-2 text-white">
          Add New Year +
        </button>
        <YearTable yearTableData={yearData} />
      </div>
    </>
  );
}

export default YearManagementPage;
