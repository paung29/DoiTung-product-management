import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateOrEditZoneButton } from "../create-new-zone-button";

export type PreharvestTableDataType = {
  preharvestId: number;
  poleNo: string;
  clusterId: string;
  gradeARound1: number;
  numberOfPodsRound2: number;
  lostPodsBeforeHarvest: number;
  podRemoved: number;
  plantWithPodRemoved: number;
  recordedBy: string;
  recordedDate: string;
  condition: string;
};

export function PreharvestTable({
  preharvestTableData,
}: {
  preharvestTableData: PreharvestTableDataType[];
}) {
  return (
    <div className="border-primary overflow-hidden rounded-3xl border bg-[#f8f3e8]">
      <div className="border-primary border-b px-8 py-4">
        <h2 className="text-primary text-xl font-bold">
          Pre-Harvest Pod Monitoring Form Data (Round 2)
        </h2>
      </div>
      <div className="scrollbar-thin scrollbar-thumb-primary-button scrollbar-track-gray-100 overflow-x-auto">
        <Table className="w-full min-w-max">
          <TableHeader>
            <TableRow className="[&_th]:text-primary-button hover:bg-secondary bg-secondary border-primary-button [&_th]:px-6 [&_th]:py-4 [&_th]:text-center [&_th]:font-semibold [&_th]:whitespace-nowrap">
              <TableHead>Date</TableHead>
              <TableHead>Pole ID</TableHead>
              <TableHead>Clusters ID</TableHead>
              <TableHead>Grade(A) (Round 1)</TableHead>
              <TableHead>Number of Pods (Round 2)</TableHead>
              <TableHead>Lost Pods Before Harvest</TableHead>
              <TableHead>Pod Removed</TableHead>
              <TableHead>Plant with Pod Removed</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Recorded By</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {preharvestTableData.map((item) => (
              <TableRow
                className="bg-white text-center [&_td]:px-6 [&_td]:py-3 [&_td]:whitespace-nowrap"
                key={item.recordedBy + item.recordedDate}
              >
                <TableCell className="font-medium">
                  {item.recordedDate}
                </TableCell>
                <TableCell>{item.poleNo}</TableCell>
                <TableCell>{item.clusterId}</TableCell>
                <TableCell>{item.gradeARound1}</TableCell>
                <TableCell>{item.numberOfPodsRound2}</TableCell>
                <TableCell>{item.lostPodsBeforeHarvest}</TableCell>
                <TableCell>{item.podRemoved}</TableCell>
                <TableCell>{item.plantWithPodRemoved}</TableCell>
                <TableCell>{item.condition}</TableCell>
                <TableCell>{item.recordedBy}</TableCell>
                <TableCell>
                  <div className="flex flex-row justify-center gap-2">
                    <CreateOrEditZoneButton isEdit={true} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
