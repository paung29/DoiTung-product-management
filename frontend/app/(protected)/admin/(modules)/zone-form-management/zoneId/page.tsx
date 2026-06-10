"use client";
import AdminCustomTabs from "@/components/custom/admin/admin-custom-tabs";
import {
  ClusterTable,
  ClusterTableDataType,
} from "@/components/custom/admin/zone&form/zone/form/cluster-table";
import {
  FlowerTable,
  FlowerTableDataType,
} from "@/components/custom/admin/zone&form/zone/form/flower-table";
import {
  PollinationTable,
  PollinationTableDataType,
} from "@/components/custom/admin/zone&form/zone/form/pollination-table";
import {
  PodTable,
  PodTableDataType,
} from "@/components/custom/admin/zone&form/zone/form/pod-table";
import {
  PreharvestTable,
  PreharvestTableDataType,
} from "@/components/custom/admin/zone&form/zone/form/preharvest-table";
import {
  HarvestGradingTable,
  HarvestGradingTableDataType,
} from "@/components/custom/admin/zone&form/zone/form/harvest-grading-table";
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

const flowerTableData: FlowerTableDataType[] = [
  {
    flowerId: 1,
    clusterId: "C-001",
    poleNo: "P-001",
    totalFlower: 10,
    recordedBy: "Staff A",
    recordedDate: "2026-03-15",
    condition: "Good",
  },
];

const pollinationTableData: PollinationTableDataType[] = [
  {
    pollinationId: 1,
    poleNo: "P-001",
    clusterId: "C-001",
    totalFlower: 10,
    numberOfPod: 3,
    unsuccessfulPollination: 3,
    goodFlowers: 6,
    badDroppedFlowers: 4,
    condition: "Good",
    recordedBy: "Staff A",
    recordedDate: "2026-03-15",
  },
];

const podTableData: PodTableDataType[] = [
  {
    podId: 1,
    poleNo: "P-001",
    clusterId: "C-001",
    totalFlower: 10,
    numberOfPod: 3,
    lostPods: 3,
    remainingPod: 6,
    recordedBy: "Staff A",
    recordedDate: "2026-03-15",
    condition: "Good",
  },
];

const preharvestTableData: PreharvestTableDataType[] = [
  {
    preharvestId: 1,
    poleNo: "P-001",
    clusterId: "C-001",
    gradeARound1: 6,
    numberOfPodsRound2: 3,
    lostPodsBeforeHarvest: 3,
    podRemoved: 0,
    plantWithPodRemoved: 0,
    recordedBy: "Staff A",
    recordedDate: "2026-03-15",
    condition: "Insect",
  },
];

const harvestGradingTableData: HarvestGradingTableDataType[] = [
  {
    harvestId: 1,
    poleNo: "P-001",
    recordedDate: "2026-03-15",
    gradeAPlus_noPod: 1,
    gradeAPlus_weight: 14.1,
    gradeA_noPod: 3,
    gradeA_weight: 33.06,
    gradeB_noPod: 2,
    gradeB_weight: 18.3,
    gradeC_noPod: 1,
    gradeC_weight: 11.0,
    gradeDPlus_noPod: 0,
    gradeDPlus_weight: 0.0,
    rejectedUndersize_noPod: 4,
    rejectedUndersize_weight: 22.89,
    recordedBy: "Staff A",
  },
];

function FormsInZonePage() {
  // eslint-disable-next-line no-var
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
        <TabsContent value="flower">
          <FlowerTable flowerTableData={flowerTableData} />
        </TabsContent>
        <TabsContent value="pollination">
          <PollinationTable pollinationTableData={pollinationTableData} />
        </TabsContent>
        <TabsContent value="pod">
          <PodTable podTableData={podTableData} />
        </TabsContent>
        <TabsContent value="preharvest">
          <PreharvestTable preharvestTableData={preharvestTableData} />
        </TabsContent>
        <TabsContent value="harvestGrading">
          <HarvestGradingTable
            harvestGradingTableData={harvestGradingTableData}
          />
        </TabsContent>
      </AdminCustomTabs>
    </div>
  );
}

export default FormsInZonePage;
