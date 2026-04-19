"use client";
import AdminCustomTabs from "@/components/custom/admin/admin-custom-tabs";
import FormManagementTab from "@/components/custom/admin/zone&form/form/form-management-tab";
import YearManagementTab from "@/components/custom/admin/zone&form/year/year-management-tab";
import ZoneAndFormLayoutComponent from "@/components/custom/admin/zone&form/zone-and-form-layout";
import ZoneManagementTab from "@/components/custom/admin/zone&form/zone/zone-management-tab";
import { TabsContent } from "@/components/ui/tabs";
import { Calendar, FileText, Icon, MapPin } from "lucide-react";
import { useState } from "react";

const zoneAndFormTabs = [
  { id: "year", value: "Year Management", icon: Calendar },
  { id: "zone", value: "Zone Management", icon: MapPin },
  { id: "form", value: "Form Management", icon: FileText },
];

function ZoneAndFormManagementPage() {
  var [activeTab, setActiveTab] = useState("year");
  const [selectedYear, setSelectedYear] = useState("");
  var isYearTab = activeTab === "year";

  return (
    <ZoneAndFormLayoutComponent
      selectedYear={selectedYear}
      setSelectedYear={setSelectedYear}
      isYearTab={isYearTab}
    >
      <AdminCustomTabs
        tabs={zoneAndFormTabs}
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsContent value="year">
          <YearManagementTab />
        </TabsContent>
        <TabsContent value="zone">
          <ZoneManagementTab selectedYear={selectedYear} />
        </TabsContent>
        <TabsContent value="form">
          <FormManagementTab selectedYear={selectedYear} />
        </TabsContent>
      </AdminCustomTabs>
    </ZoneAndFormLayoutComponent>
  );
}

export default ZoneAndFormManagementPage;
