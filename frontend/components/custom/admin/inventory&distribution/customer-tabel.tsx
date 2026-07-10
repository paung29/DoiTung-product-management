"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/custom/common/custom-button";
import { updateCustomerInfo } from "@/lib/server-actions/admin/update-customer-info-client";
import { UpdateCustomerInfoFormData } from "@/lib/types/model/type";
import CustomerTableRow from "./customer-table-row";
import CustomerEditModal from "./customer-edit-modal";

export interface CustomerHistoryData {
  id: string;
  no: number;
  customer: string;
  gradeA: number;
  gradeB: number;
  gradeC: number;
  gradeFailed: number;
  totalWeight: number;
  note: string;
}

interface Props {
  data?: CustomerHistoryData[];
  itemsPerPage?: number;
}

export default function CustomerTable({ data = [], itemsPerPage = 6 }: Props) {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [editingCustomer, setEditingCustomer] =
    useState<CustomerHistoryData | null>(null);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = useMemo(
    () => data.slice(startIndex, startIndex + itemsPerPage),
    [data, startIndex, itemsPerPage],
  );

  const handleEdit = (customer: CustomerHistoryData) => {
    setEditingCustomer(customer);
  };

  return (
    <div className="w-full space-y-4">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <Table className="w-full border-collapse">
          <TableHeader className="bg-primary border-b border-b-[#8a6752]">
            <TableRow className="hover:bg-transparent">
              {[
                "No",
                "CUSTOMER",
                "GRADE A",
                "GRADE B",
                "GRADE C",
                "GRADE FAILED",
                "TOTAL WEIGHT (G)",
                "NOTE",
                "ACTION",
              ].map((head) => (
                <TableHead
                  key={head}
                  className="h-14 px-6 py-4 text-center font-semibold text-white"
                >
                  {head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="bg-[#FAF3E0]">
            {currentData.length > 0 ? (
              currentData.map((item) => (
                <CustomerTableRow
                  key={item.id}
                  data={item}
                  onEdit={handleEdit}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="px-6 py-12 text-center">
                  <p className="text-sm text-gray-500">
                    No customer history found
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-3 py-6">
          <CustomButton
            label="Previous"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            type="button"
            className="rounded-full border border-gray-300 bg-white px-6 py-2 text-gray-700"
          />

          <div className="flex min-w-10 items-center justify-center rounded-full bg-[#8a6752] px-4 py-2">
            <span className="text-sm font-semibold text-white">
              {currentPage}
            </span>
          </div>

          <CustomButton
            label="Next"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            type="button"
            className="rounded-full bg-[#8a6752] px-6 py-2 text-white"
          />
        </div>
      )}

      {editingCustomer && (
        <CustomerEditModal
          id={Number(editingCustomer.id)}
          note={editingCustomer.note}
          customerName={editingCustomer.customer}
          onClose={() => setEditingCustomer(null)}
        />
      )}
    </div>
  );
}