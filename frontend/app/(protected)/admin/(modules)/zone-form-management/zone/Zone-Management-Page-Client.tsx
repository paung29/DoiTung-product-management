"use client"

import YearManagementTab from "@/components/custom/admin/zone&form/year/year-management-tab";
import ZoneManagementTab from "@/components/custom/admin/zone&form/zone/zone-management-tab";
import { useZoneForm } from "../zone-form-context";
import ZoneAndFormLayoutComponent from "@/components/custom/admin/zone&form/zone-and-form-layout";
import { YearApiResponse } from "@/lib/types/model/type";

export default function ZoneManagement({yearRecords} : {yearRecords : YearApiResponse}) {

    const { selectedYear, setSelectedYear } = useZoneForm();

    console.log("Provider Selected Year : ", selectedYear)
   
    return(
        <>
            <ZoneAndFormLayoutComponent yearRecords={yearRecords} setSelectedYear={setSelectedYear} selectedYear={selectedYear}>
                < ZoneManagementTab selectedYear={selectedYear}  />
            </ZoneAndFormLayoutComponent>
            
        </>
    )
}