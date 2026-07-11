"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import WareHouseEditModal from "./warehouse-edit-modal";

export interface WarehouseTableData {
  id: string;
  name: string;
  status: "ACTIVE" | "INACTIVE";

  remainingPods: number;
  remainingWeights: number;

  distributedPods: number;
  distributedWeights: number;

  totalPods: number;
  totalWeights: number;
}

// Every stock figure the API returns is a weight/pods pair, so each amount
// column renders both instead of dropping one of the two.
function AmountCell({ weight, pods }: { weight: number; pods: number }) {
  return (
    <TableCell className="px-6 py-4 text-center whitespace-nowrap">
      <p className="text-sm text-gray-700">{weight.toLocaleString()} g</p>
      <p className="mt-0.5 text-xs text-gray-500">
        {pods.toLocaleString()} pods
      </p>
    </TableCell>
  );
}

export default function WarehouseTable({
  records,
}: {
  records: WarehouseTableData[];
}) {
  return (
    <div className="overflow-hidden rounded-3xl border-2 border-[#8a6752] bg-[#faf3e0]">
      <Table>
        <TableHeader>
          <TableRow className="h-14 border-b-2 border-[#8a6752] bg-[#faf3e0]">
            <TableHead className="px-6 py-4 text-left text-sm font-semibold text-[#8a6752]">
              Warehouse
            </TableHead>
            <TableHead className="px-6 py-4 text-center text-sm font-semibold text-[#8a6752]">
              Status
            </TableHead>
            <TableHead className="px-6 py-4 text-center text-sm font-semibold text-[#8a6752]">
              Remaining Stock
            </TableHead>
            <TableHead className="px-6 py-4 text-center text-sm font-semibold text-[#8a6752]">
              Distributed
            </TableHead>
            <TableHead className="px-6 py-4 text-center text-sm font-semibold text-[#8a6752]">
              Total Stock
            </TableHead>
            <TableHead className="px-6 py-4 text-center text-sm font-semibold text-[#8a6752]">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length === 0 ? (
            <TableRow className="h-14 bg-white">
              <TableCell
                colSpan={6}
                className="px-6 py-8 text-center text-sm text-gray-500"
              >
                No warehouses found.
              </TableCell>
            </TableRow>
          ) : (
            records.map((warehouse) => (
              <TableRow
                key={warehouse.id}
                className="h-14 border-b border-[#e8dcc8] bg-white hover:bg-[#f5e8d9]"
              >
                <TableCell className="px-6 py-4 text-left text-sm font-medium whitespace-nowrap text-gray-900">
                  {warehouse.name}
                </TableCell>

                <TableCell className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                        warehouse.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {warehouse.status}
                    </span>
                  </div>
                </TableCell>

                <AmountCell
                  weight={warehouse.remainingWeights}
                  pods={warehouse.remainingPods}
                />

                <AmountCell
                  weight={warehouse.distributedWeights}
                  pods={warehouse.distributedPods}
                />

                <AmountCell
                  weight={warehouse.totalWeights}
                  pods={warehouse.totalPods}
                />

                <TableCell className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center">
                    <WareHouseEditModal
                      id={Number(warehouse.id)}
                      warehouseName={warehouse.name}
                      status={warehouse.status === "ACTIVE"}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
