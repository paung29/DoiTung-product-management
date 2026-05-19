import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditPodButton } from "../edit-pod-button";
import { DeleteZoneButton } from "../../delete-zone-button";

export type PodTableDataType = {
  podId: number;
  poleNo: string;
  clusterId: string;
  totalFlower: number;
  numberOfPod: number;
  lostPods: number;
  remainingPod: number;
  recordedBy: string;
  recordedDate: string;
  condition: string;
};

export function PodTable({
  podTableData,
}: {
  podTableData: PodTableDataType[];
}) {
  return (
    <div className="border-primary overflow-hidden rounded-3xl border bg-[#f8f3e8]">
      <div className="border-primary border-b px-8 py-4">
        <h2 className="text-primary text-xl font-bold">
          Pod Form Data (Round 1)
        </h2>
      </div>
      <div className="scrollbar-thin scrollbar-thumb-primary-button scrollbar-track-gray-100 overflow-x-auto">
        <Table className="w-full min-w-max">
          <TableHeader>
            <TableRow className="[&_th]:text-primary-button hover:bg-secondary bg-secondary border-primary-button [&_th]:px-6 [&_th]:py-4 [&_th]:text-center [&_th]:font-semibold [&_th]:whitespace-nowrap">
              <TableHead>Date</TableHead>
              <TableHead>Pole ID</TableHead>
              <TableHead>Clusters ID</TableHead>
              <TableHead>Total Flower</TableHead>
              <TableHead>Number of Pod</TableHead>
              <TableHead>Lost Pods</TableHead>
              <TableHead>Remaining Pod</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Recorded By</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {podTableData.map((item) => (
              <TableRow
                className="bg-white text-center [&_td]:px-6 [&_td]:py-3 [&_td]:whitespace-nowrap"
                key={item.recordedBy + item.recordedDate}
              >
                <TableCell className="font-medium">
                  {item.recordedDate}
                </TableCell>
                <TableCell>{item.poleNo}</TableCell>
                <TableCell>{item.clusterId}</TableCell>
                <TableCell>{item.totalFlower}</TableCell>
                <TableCell>{item.numberOfPod}</TableCell>
                <TableCell>{item.lostPods}</TableCell>
                <TableCell>{item.remainingPod}</TableCell>
                <TableCell>{item.condition}</TableCell>
                <TableCell>{item.recordedBy}</TableCell>
                <TableCell>
                  <div className="flex flex-row justify-center gap-2">
                    <EditPodButton
                      podData={{
                        recordedDate: item.recordedDate,
                        poleNo: item.poleNo,
                        clusterId: item.clusterId,
                        totalFlower: item.totalFlower,
                        numberOfPod: item.numberOfPod,
                        lostPods: item.lostPods,
                        remainingPod: item.remainingPod,
                        condition: item.condition,
                        recordedBy: item.recordedBy,
                      }}
                    />
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
