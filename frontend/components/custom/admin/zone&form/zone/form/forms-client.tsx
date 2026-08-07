/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import AdminCustomTabs from "@/components/custom/admin/admin-custom-tabs";
import { TabsContent } from "@/components/ui/tabs";
import { ClusterTable } from "@/components/custom/admin/zone&form/zone/form/cluster-table";
import { FlowerTable } from "@/components/custom/admin/zone&form/zone/form/flower-table";
import { PollinationTable } from "@/components/custom/admin/zone&form/zone/form/pollination-table";
import { PodTable } from "@/components/custom/admin/zone&form/zone/form/pod-table";
import { PreharvestTable } from "@/components/custom/admin/zone&form/zone/form/preharvest-table";
import { HarvestGradingTable } from "@/components/custom/admin/zone&form/zone/form/harvest-grading-table";

import { FlowerTableDataType } from "./flower-table";
import { PollinationTableDataType } from "./pollination-table";
import { PodTableDataType } from "./pod-table";
import { PreharvestTableDataType } from "./preharvest-table";
import { HarvestGradingTableDataType } from "./harvest-grading-table";

interface FormsClientProps {
  clusterForms: any[];
  flowerForms: any[];
  pollinationForms: any[];
  podForms: any[];
  preHarvestForms: any[];
  harvestGradingForms: any[];
}

export default function FormsClient({
  clusterForms,
  flowerForms,
  pollinationForms,
  podForms,
  preHarvestForms,
  harvestGradingForms,
}: FormsClientProps) {
  const [activeTab, setActiveTab] = useState("cluster");

  // 1. Cluster Data Mapper
  const clusterTableData =
    clusterForms?.map((item) => ({
      clusterId: item.clusterId,
      clusterNo: item.clusterNo,
      poleNo: item.poleNo,
      recordedBy: item.recordedBy ?? "N/A",
      recordedDate: item.date ?? "",
      condition: item.condition ?? "",
    })) ?? [];

  // 2. Flower Data Mapper
  const flowerTableData: FlowerTableDataType[] =
    flowerForms?.map((item) => ({
      flowerId: Number(item.no ?? 0),
      clusterId: String(item.clusterId ?? ""),
      poleNo: String(item.poleNo ?? ""),
      totalFlower: Number(item.totalFlowers ?? 0),
      condition: item.condition ?? "",
      recordedBy:
        item.recordedBy && item.recordedBy !== "" ? item.recordedBy : "N/A",
      recordedDate: item.date ?? "",
    })) ?? [];

  // 3. Pollination Data Mapper
  const pollinationTableData: PollinationTableDataType[] =
    pollinationForms?.map((item) => ({
      pollinationId: Number(item.no ?? 0),
      poleNo: String(item.poleNo ?? ""),
      clusterId: String(item.clusterId ?? ""),
      totalFlower: Number(item.totalFlowers ?? 0),
      numberOfPod: Number(item.numberPods ?? 0),
      unsuccessfulPollination: Number(item.unsuccessfulPollination ?? 0),
      goodFlowers: Number(item.goodFlowers ?? 0),
      badDroppedFlowers: Number(item.badFlowers ?? 0),
      condition: item.condition ?? "",
      recordedBy:
        item.recordedBy && item.recordedBy !== "" ? item.recordedBy : "N/A",
      recordedDate: item.date ?? item.Date ?? "",
    })) ?? [];

  // 4. Pod Data Mapper
  const podTableData: PodTableDataType[] =
    podForms?.map((item) => ({
      podId: Number(item.no ?? 0),
      poleNo: String(item.poleNo ?? ""),
      clusterId: String(item.clusterId ?? ""),
      totalFlower: Number(item.totalFlowers ?? 0),
      numberOfPod: Number(item.numberPods ?? 0),
      lostPods: Number(item.lostPods ?? 0),
      remainingPod: Number(item.remainingPods ?? 0),
      recordedBy:
        item.recordedBy && item.recordedBy !== "" ? item.recordedBy : "N/A",
      recordedDate: item.date ?? "",
      condition: item.condition ?? "",
    })) ?? [];

  // 5. Preharvest Data Mapper
  const preharvestTableData: PreharvestTableDataType[] =
    preHarvestForms?.map((item) => ({
      preharvestId: Number(item.no ?? 0),
      poleNo: String(item.poleNo ?? ""),
      clusterId: String(item.clusterId ?? ""),
      gradeARound1: Number(item.remainingPods ?? 0), // maps backend calculation value
      numberOfPodsRound2: Number(item.numberPodsSecondRound ?? 0),
      lostPodsBeforeHarvest: Number(item.lostPodsBeforeHarvest ?? 0),
      podRemoved: Number(item.removedPods ?? 0),
      plantWithPodRemoved: Number(item.plantsRemoved ?? 0),
      recordedBy:
        item.recordedBy && item.recordedBy !== "" ? item.recordedBy : "N/A",
      recordedDate: item.date ?? "",
      condition: item.condition ?? "",
    })) ?? [];

  // 6. Harvest & Grading Data Mapper
  const harvestGradingTableData: HarvestGradingTableDataType[] =
    harvestGradingForms?.map((item) => ({
      harvestId: Number(item.no ?? 0),
      poleNo: String(item.poleNo ?? ""),
      recordedDate: item.date ?? "",
      gradeAPlus_noPod: Number(item.gradeAPlusCount ?? 0),
      gradeAPlus_weight: Number(item.gradeAPlusWeight ?? 0),
      gradeA_noPod: Number(item.gradeACount ?? 0),
      gradeA_weight: Number(item.gradeAWeight ?? 0),
      gradeB_noPod: Number(item.gradeBCount ?? 0),
      gradeB_weight: Number(item.gradeBWeight ?? 0),
      gradeC_noPod: Number(item.gradeCCount ?? 0),
      gradeC_weight: Number(item.gradeCWeight ?? 0),
      gradeDPlus_noPod: Number(item.gradeDPlusCount ?? 0),
      gradeDPlus_weight: Number(item.gradeDPlusWeight ?? 0),
      rejectedUndersize_noPod: Number(item.undersizedCount ?? 0),
      rejectedUndersize_weight: Number(item.undersizedWeight ?? 0),
      recordedBy:
        item.recordedBy && item.recordedBy !== "" ? item.recordedBy : "N/A",
      rottenCount: Number(item.rottenCount ?? 0),
      rottenWeight: Number(item.rottenWeight ?? 0),
    })) ?? [];

  return (
    <AdminCustomTabs
      tabs={[
        { id: "cluster", value: "Cluster" },
        { id: "flower", value: "Flower" },
        { id: "pollination", value: "Pollination" },
        { id: "pod", value: "Pod" },
        { id: "preharvest", value: "Preharvest" },
        { id: "harvestGrading", value: "Harvest & Grading" },
      ]}
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
  );
}
