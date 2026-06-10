"use client"

import YearManagementTab from "@/components/custom/admin/zone&form/year/year-management-tab";
import ZoneManagementTab from "@/components/custom/admin/zone&form/zone/zone-management-tab";
import { useZoneForm } from "../../zone-form-context";
import ZoneAndFormLayoutComponent from "@/components/custom/admin/zone&form/zone-and-form-layout";
import { YearApiResponse } from "@/lib/types/model/type";
import { ZoneTableDataType } from "@/components/custom/admin/zone&form/zone/zone-table";

export default function ZoneManagement({zoneRecords, totalZones, totalPlants }: {zoneRecords : ZoneTableDataType[], totalZones : number, totalPlants : number}) {

    const { selectedYear, setSelectedYear } = useZoneForm();

    console.log("Provider Selected Year : ", selectedYear)
   
    return(
        < ZoneManagementTab totalPlants={totalPlants} totalZones={totalZones} zoneRecords={zoneRecords} selectedYear={selectedYear}  />
    )
}