import YearTable, {
  YearTableDataType,
} from "@/components/custom/admin/zone&form/yearTable";
import React from "react";

function FormManagementPage() {
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
        <button className="bg-primary-button m-4 w-60 rounded-lg px-4 py-2 text-white">
          Add New Year +
        </button>
        <YearTable yearTableData={yearData} />
      </div>
    </>
  );
}

export default FormManagementPage;
