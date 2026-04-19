"use client";
import AdminCustomTabs from "@/components/custom/admin/admin-custom-tabs";
import {
  ClusterTable,
  ClusterTableDataType,
} from "@/components/custom/admin/zone&form/zone/form/cluster-table";
import { TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

const zoneAndFormTabs = [
  { id: "cluster", value: "Cluster" },
  { id: "flower", value: "Flower" },
  { id: "pollination", value: "Pollination" },
  { id: "pod", value: "Pod" },
  { id: "preharvest", value: "Preharvest" },
  { id: "harvestGrading", value: "Harvest & Grading" },
];

const clusterTableData: ClusterTableDataType[] = [
  {
    clusterId: 1,
    clusterNo: 1,
    poleNo: 1,
    recordedBy: "Kit",
    recordedDate: "13.3.2026",
    condition: "Good",
  },
];
function FormsInZonePage() {
  var [activeTab, setActiveTab] = useState("cluster");

  return (
    <div className="">
      <AdminCustomTabs
        tabs={zoneAndFormTabs}
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsContent value="cluster">
          <ClusterTable clusterTableData={clusterTableData} />
        </TabsContent>
        <TabsContent value="flower"></TabsContent>
        <TabsContent value="pollination"></TabsContent>
        <TabsContent value="pod"></TabsContent>
        <TabsContent value="preharvest"></TabsContent>
        <TabsContent value="harvestGrading"></TabsContent>
      </AdminCustomTabs>
    </div>
  );
}

export default FormsInZonePage;
