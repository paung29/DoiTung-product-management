import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditFlowerButton } from "../edit-flower-button";

export type FlowerTableDataType = {
  flowerId: number;
  clusterId: string;
  poleNo: string;
  totalFlower: number;
  condition: string;
  recordedBy: string;
  recordedDate: string;
};

export function FlowerTable({
  flowerTableData,
}: {
  flowerTableData: FlowerTableDataType[];
}) {
  return (
    <div className="border-primary overflow-hidden rounded-3xl border bg-[#f8f3e8]">
      <div className="border-primary border-b px-8 py-4">
        <h2 className="text-primary text-xl font-bold">Flower Form Data</h2>
      </div>
      <Table className="gap-20">
        <TableHeader>
          <TableRow className="[&_th]:text-primary-button hover:bg-secondary bg-secondary border-primary-button [&_th]:py-4 [&_th]:text-center [&_th]:font-semibold">
            <TableHead>Date</TableHead>
            <TableHead>Pole ID</TableHead>
            <TableHead>Clusters ID</TableHead>
            <TableHead>Total Flower</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Recorded By</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flowerTableData.map((item) => (
            <TableRow
              className="bg-white text-center [&_td]:py-3"
              key={item.recordedBy + item.recordedDate}
            >
              <TableCell className="font-medium">{item.recordedDate}</TableCell>
              <TableCell>{item.poleNo}</TableCell>
              <TableCell>{item.clusterId}</TableCell>
              <TableCell>{item.totalFlower}</TableCell>
              <TableCell>{item.condition}</TableCell>
              <TableCell>{item.recordedBy}</TableCell>
              <TableCell>
                <div className="flex flex-row justify-center gap-2">
                  <EditFlowerButton flowerData={item} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
