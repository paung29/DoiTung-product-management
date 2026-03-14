import FormTable, {
  FormTableDataType,
} from "@/components/custom/admin/zone&form/form-table";
import YearTable, {
  YearTableDataType,
} from "@/components/custom/admin/zone&form/year-table";
import React from "react";

function FormManagementPage() {
  const formTableData: FormTableDataType[] = [
    {
      form_id: 1,
      form_name: "Cluster Form",
      active_status: true,
    },
    {
      form_id: 2,
      form_name: "Flower Form",
      active_status: false,
    },
    { form_id: 3, form_name: "Pollination Form", active_status: false },
    {
      form_id: 4,
      form_name: "Pod Form",
      active_status: false,
    },
    {
      form_id: 5,
      form_name: "Pre-harvest Form",
      active_status: false,
    },
    {
      form_id: 6,
      form_name: "Harvest Form",
      active_status: false,
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-4">
        <button className="bg-primary-button m-4 w-60 rounded-lg px-4 py-2 text-white">
          Add New Form +
        </button>
        <FormTable formTableData={formTableData} />
      </div>
    </>
  );
}

export default FormManagementPage;
