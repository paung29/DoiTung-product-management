"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit } from "lucide-react";
import WareHouseEditModal from "./warehouse-edit-modal";

export interface WarehouseTableData {
  id: string;
  name: string;
  status: "ACTIVE" | "INACTIVE";
  stock: number;
  totalWeight: string;
  distributed: string;
  remaining: string;
}


export default function WarehouseTable({records} : {records : WarehouseTableData[]}) {
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
              Stock
            </TableHead>
            <TableHead className="px-6 py-4 text-center text-sm font-semibold text-[#8a6752]">
              Total Weight
            </TableHead>
            <TableHead className="px-6 py-4 text-center text-sm font-semibold text-[#8a6752]">
              Distributed
            </TableHead>
            <TableHead className="px-6 py-4 text-center text-sm font-semibold text-[#8a6752]">
              Remaining
            </TableHead>
            <TableHead className="px-6 py-4 text-center text-sm font-semibold text-[#8a6752]">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((warehouse) => (
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
              <TableCell className="px-6 py-4 text-center text-sm whitespace-nowrap text-gray-700">
                {warehouse.stock}
              </TableCell>
              <TableCell className="px-6 py-4 text-center text-sm whitespace-nowrap text-gray-700">
                {warehouse.totalWeight} g
              </TableCell>
              <TableCell className="px-6 py-4 text-center text-sm whitespace-nowrap text-gray-700">
                {warehouse.distributed} g
              </TableCell>
              <TableCell className="px-6 py-4 text-center text-sm whitespace-nowrap text-gray-700">
                {warehouse.remaining} g
              </TableCell>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
