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

interface WarehouseTableData {
  id: string;
  name: string;
  status: "ACTIVE" | "INACTIVE";
  stock: number;
  totalWeight: string;
  distributed: string;
  remaining: string;
}

const warehouseData: WarehouseTableData[] = [
  {
    id: "1",
    name: "PM Center – Phamee",
    status: "ACTIVE",
    stock: 20990,
    totalWeight: "32290.00 g",
    distributed: "8100 g",
    remaining: "24190.00 g",
  },
  {
    id: "2",
    name: "Forest Plantation",
    status: "ACTIVE",
    stock: 20990,
    totalWeight: "32290.00 g",
    distributed: "8100 g",
    remaining: "24190.00 g",
  },
  {
    id: "3",
    name: "Research Unit",
    status: "ACTIVE",
    stock: 20990,
    totalWeight: "32290.00 g",
    distributed: "8100 g",
    remaining: "24190.00 g",
  },
  {
    id: "4",
    name: "SE Building I",
    status: "ACTIVE",
    stock: 5920,
    totalWeight: "2500g",
    distributed: "870g",
    remaining: "1630g",
  },
];

export default function WarehouseTable() {
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
          {warehouseData.map((warehouse) => (
            <TableRow
              key={warehouse.id}
              className="h-14 border-b border-[#e8dcc8] bg-white hover:bg-[#f5e8d9]"
            >
              <TableCell className="px-6 py-4 text-left text-sm font-medium whitespace-nowrap text-gray-900">
                {warehouse.name}
              </TableCell>
              <TableCell className="px-6 py-4 text-center">
                <div className="flex items-center justify-center">
                  <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold whitespace-nowrap text-green-700">
                    {warehouse.status}
                  </span>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4 text-center text-sm whitespace-nowrap text-gray-700">
                {warehouse.stock}
              </TableCell>
              <TableCell className="px-6 py-4 text-center text-sm whitespace-nowrap text-gray-700">
                {warehouse.totalWeight}
              </TableCell>
              <TableCell className="px-6 py-4 text-center text-sm whitespace-nowrap text-gray-700">
                {warehouse.distributed}
              </TableCell>
              <TableCell className="px-6 py-4 text-center text-sm whitespace-nowrap text-gray-700">
                {warehouse.remaining}
              </TableCell>
              <TableCell className="px-6 py-4 text-center">
                <div className="flex items-center justify-center">
                  <button className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900">
                    <Edit className="h-5 w-5" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
