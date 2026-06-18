/* eslint-disable no-var */
"use client";
import AdminCustomTabs from "@/components/custom/admin/admin-custom-tabs";
import FormManagementTab from "@/components/custom/admin/zone&form/form/form-management-tab";
import YearManagementTab from "@/components/custom/admin/zone&form/year/year-management-tab";
import { YearTableDataType } from "@/components/custom/admin/zone&form/year/year-table";
import ZoneAndFormLayoutComponent from "@/components/custom/admin/zone&form/zone-and-form-layout";
import ZoneManagementTab from "@/components/custom/admin/zone&form/zone/zone-management-tab";
import { TabsContent } from "@/components/ui/tabs";
import { YearApiResponse } from "@/lib/types/model/type";
import { Calendar, FileText, Icon, MapPin } from "lucide-react";

const zoneAndFormTabs = [
  { id: "year", value: "Year Management", icon: Calendar },
  { id: "zone", value: "Zone Management", icon: MapPin },
  { id: "form", value: "Form Management", icon: FileText },
];

function YearManagementPage({
  yearsRecords,
  yearTables,
}: {
  yearsRecords: YearApiResponse;
  yearTables: YearTableDataType[];
}) {
  return (
    <div className="">
      <YearManagementTab records={yearTables} />
    </div>
  );
}

export default YearManagementPage;
