import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditHarvestGradingButton } from "../edit-harvest&grading";
import { DeleteZoneButton } from "../../delete-zone-button";

export type HarvestGradingTableDataType = {
  harvestId: number;
  poleNo: string;
  recordedDate: string;
  gradeAPlus_noPod: number;
  gradeAPlus_weight: number;
  gradeA_noPod: number;
  gradeA_weight: number;
  gradeB_noPod: number;
  gradeB_weight: number;
  gradeC_noPod: number;
  gradeC_weight: number;
  gradeDPlus_noPod: number;
  gradeDPlus_weight: number;
  rejectedUndersize_noPod: number;
  rejectedUndersize_weight: number;
  recordedBy: string;
};

export function HarvestGradingTable({
  harvestGradingTableData,
}: {
  harvestGradingTableData: HarvestGradingTableDataType[];
}) {
  return (
    <div className="border-primary overflow-hidden rounded-3xl border bg-[#f8f3e8]">
      <div className="border-primary border-b px-8 py-4">
        <h2 className="text-primary text-xl font-bold">
          Harvest and Grading Form
        </h2>
      </div>
      <div className="scrollbar-thin scrollbar-thumb-primary-button scrollbar-track-gray-100 overflow-x-auto">
        <Table className="w-full min-w-max">
          <TableHeader>
            <TableRow className="[&_th]:text-primary-button hover:bg-secondary bg-secondary border-primary-button text-sm [&_th]:px-4 [&_th]:py-4 [&_th]:text-center [&_th]:font-semibold [&_th]:whitespace-nowrap">
              <TableHead>Date</TableHead>
              <TableHead>Pole ID</TableHead>
              <TableHead>
                Grade A+
                <p className="text-xs font-normal">No. Pod</p>
              </TableHead>
              <TableHead>
                Grade A+
                <p className="text-xs font-normal">Weight(g)</p>
              </TableHead>
              <TableHead>
                Grade A<p className="text-xs font-normal">No. Pod</p>
              </TableHead>
              <TableHead>
                Grade A<p className="text-xs font-normal">Weight-g</p>
              </TableHead>
              <TableHead>
                Grade B<p className="text-xs font-normal">No. Pod</p>
              </TableHead>
              <TableHead>
                Grade B<p className="text-xs font-normal">Weight-g</p>
              </TableHead>
              <TableHead>
                Grade C<p className="text-xs font-normal">No. Pod</p>
              </TableHead>
              <TableHead>
                Grade C<p className="text-xs font-normal">Weight-g</p>
              </TableHead>
              <TableHead>
                Grade D+
                <p className="text-xs font-normal">No. Pod</p>
              </TableHead>
              <TableHead>
                Grade D+
                <p className="text-xs font-normal">Weight-g</p>
              </TableHead>
              <TableHead>
                Rejected / Undersize
                <p className="text-xs font-normal">No. Pod</p>
              </TableHead>
              <TableHead>
                Rejected / Undersize
                <p className="text-xs font-normal">Weight-g</p>
              </TableHead>
              <TableHead>Recorded By</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {harvestGradingTableData.map((item) => (
              <TableRow
                className="bg-white text-center text-sm [&_td]:px-4 [&_td]:py-3 [&_td]:whitespace-nowrap"
                key={item.recordedBy + item.recordedDate}
              >
                <TableCell className="font-medium">
                  {item.recordedDate}
                </TableCell>
                <TableCell>{item.poleNo}</TableCell>
                <TableCell>{item.gradeAPlus_noPod}</TableCell>
                <TableCell>{item.gradeAPlus_weight}</TableCell>
                <TableCell>{item.gradeA_noPod}</TableCell>
                <TableCell>{item.gradeA_weight}</TableCell>
                <TableCell>{item.gradeB_noPod}</TableCell>
                <TableCell>{item.gradeB_weight}</TableCell>
                <TableCell>{item.gradeC_noPod}</TableCell>
                <TableCell>{item.gradeC_weight}</TableCell>
                <TableCell>{item.gradeDPlus_noPod}</TableCell>
                <TableCell>{item.gradeDPlus_weight}</TableCell>
                <TableCell>{item.rejectedUndersize_noPod}</TableCell>
                <TableCell>{item.rejectedUndersize_weight}</TableCell>
                <TableCell>{item.recordedBy}</TableCell>
                <TableCell>
                  <div className="flex flex-row justify-center gap-2">
                    <EditHarvestGradingButton
                      harvestData={{
                        recordedDate: item.recordedDate,
                        poleNo: item.poleNo,
                        gradeAPlus_noPod: item.gradeAPlus_noPod,
                        gradeAPlus_weight: item.gradeAPlus_weight,
                        gradeA_noPod: item.gradeA_noPod,
                        gradeA_weight: item.gradeA_weight,
                        gradeB_noPod: item.gradeB_noPod,
                        gradeB_weight: item.gradeB_weight,
                        gradeC_noPod: item.gradeC_noPod,
                        gradeC_weight: item.gradeC_weight,
                        gradeDPlus_noPod: item.gradeDPlus_noPod,
                        gradeDPlus_weight: item.gradeDPlus_weight,
                        rejected_noPod: item.rejectedUndersize_noPod,
                        rejected_weight: item.rejectedUndersize_weight,
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
