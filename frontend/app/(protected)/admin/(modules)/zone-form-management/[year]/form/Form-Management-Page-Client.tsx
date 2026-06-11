"use client"

import FormManagementTab from "@/components/custom/admin/zone&form/form/form-management-tab";
import YearManagementTab from "@/components/custom/admin/zone&form/year/year-management-tab";
import ZoneAndFormLayoutComponent from "@/components/custom/admin/zone&form/zone-and-form-layout";
import { useZoneForm } from "../../zone-form-context";
import { YearSettingApiResponse } from "@/lib/types/model/type";

export default function FormManagement({data} : {data : YearSettingApiResponse}) {

  const { selectedYear, setSelectedYear } = useZoneForm();

  return (
    <FormManagementTab data={data} selectedYear={selectedYear}/>
  )
}