import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateOrEditZoneButton } from "./create-new-zone-button";
import { DeleteZoneButton } from "./delete-zone-button";

export type ZoneTableDataType = {
  zone_name: string;
  total_plants: number;
};

export function ZoneTable({
  zoneTableData,
}: {
  zoneTableData: ZoneTableDataType[];
}) {
  return (
    <div className="border-primary-button overflow-hidden rounded-2xl border">
      <Table className="gap-20">
        <TableHeader>
          <TableRow className="[&_th]:text-primary-button hover:bg-secondary bg-secondary border-primary-button [&_th]:py-4 [&_th]:text-center [&_th]:font-semibold">
            <TableHead>Zone Name</TableHead>
            <TableHead>Total Plants</TableHead>
            <TableHead>View Zone Report</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {zoneTableData.map((item) => (
            <TableRow
              className="bg-white text-center [&_td]:py-3"
              key={item.zone_name}
            >
              <TableCell className="font-medium">{item.zone_name}</TableCell>
              <TableCell>{item.total_plants}</TableCell>
              <TableCell>
                <button className="bg-primary-button rounded-lg px-4 py-2 text-white">
                  View Report
                </button>
              </TableCell>
              <TableCell>
                <div className="flex flex-row justify-center gap-2">
                  <CreateOrEditZoneButton isEdit={true} />
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
