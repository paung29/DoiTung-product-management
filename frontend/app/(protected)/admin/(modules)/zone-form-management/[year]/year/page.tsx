import CreateYearButton from "@/components/custom/admin/zone&form/create-year-button";
import YearTable, {
  YearTableDataType,
} from "@/components/custom/admin/zone&form/year-table";
import CustomButton from "@/components/custom/common/custom-button";
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
      <div className="flex flex-col">
        <div className="flex h-[80px] flex-row items-end justify-end p-4">
          <CreateYearButton />
        </div>
        <YearTable yearTableData={yearData} />
      </div>
    </>
  );
}

export default YearManagementPage;
