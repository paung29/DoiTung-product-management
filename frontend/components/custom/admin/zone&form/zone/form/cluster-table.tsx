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
import { DeleteZoneButton } from "../../delete-zone-button";
import { EditClusterButton } from "../edit-cluster-button";

export type ClusterTableDataType = {
  clusterId: number;
  clusterNo: number;
  poleNo: number;
  recordedBy: string;
  recordedDate: string;
  condition: string;
};

export function ClusterTable({
  clusterTableData,
}: {
  clusterTableData: ClusterTableDataType[];
}) {
  return (
    <div className="border-primary overflow-hidden rounded-3xl border bg-[#f8f3e8]">
      <div className="border-primary border-b px-8 py-4">
        <h2 className="text-primary text-xl font-bold">Cluster Form Data</h2>
      </div>
      <Table className="gap-20">
        <TableHeader>
          <TableRow className="[&_th]:text-primary-button hover:bg-secondary bg-secondary border-primary-button [&_th]:py-4 [&_th]:text-center [&_th]:font-semibold">
            <TableHead>Date</TableHead>
            <TableHead>Pole Id</TableHead>
            <TableHead>Cluster Id</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>RecordedBy</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clusterTableData.map((item) => (
            <TableRow
              className="bg-white text-center [&_td]:py-3"
              key={item.clusterId}
            >
              <TableCell className="font-medium">{item.recordedDate}</TableCell>
              <TableCell>{item.poleNo}</TableCell>
              <TableCell>{item.clusterNo}</TableCell>
              <TableCell>{item.condition}</TableCell>

              <TableCell>{item.recordedBy}</TableCell>
              <TableCell>
                <div className="flex flex-row justify-center gap-2">
                  <EditClusterButton clusterData={item} />
                  <DeleteZoneButton />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
