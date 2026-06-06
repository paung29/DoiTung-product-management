"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useMemo } from "react";
import CustomButton from "@/components/custom/common/custom-button";

// Types
interface CustomerHistoryData {
  id: string;
  date: string;
  customer: string;
  gradeA: number;
  gradeB: number;
  gradeC: number;
  gradeFailed: number;
  totalWeight: number;
  note: string;
}

interface CustomerTableProps {
  data?: CustomerHistoryData[];
  itemsPerPage?: number;
}

const MOCK_DATA: CustomerHistoryData[] = [
  {
    id: "1",
    date: "Jan 8, 2026",
    customer: "R&D Food",
    gradeA: 500,
    gradeB: 500,
    gradeC: 459,
    gradeFailed: 500,
    totalWeight: 1959,
    note: "Sent as Samples",
  },
  {
    id: "2",
    date: "Jan 7, 2026",
    customer: "Chakri Center",
    gradeA: 0,
    gradeB: 1000,
    gradeC: 0,
    gradeFailed: 0,
    totalWeight: 1000,
    note: "Trial use",
  },
  {
    id: "3",
    date: "Feb 23, 2026",
    customer: "R&D Food",
    gradeA: 500,
    gradeB: 500,
    gradeC: 0,
    gradeFailed: 0,
    totalWeight: 1000,
    note: "Sent as Samples",
  },
  {
    id: "4",
    date: "Feb 23, 2026",
    customer: "Café Division + SE",
    gradeA: 0,
    gradeB: 1000,
    gradeC: 0,
    gradeFailed: 0,
    totalWeight: 1000,
    note: "For making ice cream",
  },
  {
    id: "5",
    date: "Mar 12, 2026",
    customer: "Plant Shop – Agriculture Division",
    gradeA: 27,
    gradeB: 79,
    gradeC: 35,
    gradeFailed: 0,
    totalWeight: 141,
    note: "For sale",
  },
  {
    id: "6",
    date: "Apr 17, 2026",
    customer: "Food Division",
    gradeA: 4000,
    gradeB: 1100,
    gradeC: 0,
    gradeFailed: 0,
    totalWeight: 5500,
    note: "Premium grade harvest",
  },
];

// Tooltip component for truncated notes
const NoteCell = ({ note }: { note: string }) => {
  const MAX_LENGTH = 20;
  const isTruncated = note.length > MAX_LENGTH;
  const displayNote = isTruncated
    ? `${note.substring(0, MAX_LENGTH)}...`
    : note;

  if (!isTruncated) {
    return <span className="text-sm text-gray-700">{note}</span>;
  }

  return (
    <span className="cursor-help text-sm text-gray-700" title={note}>
      {displayNote}
    </span>
  );
};

// Table row component
interface CustomerTableRowProps {
  data: CustomerHistoryData;
}

const CustomerTableRow = ({ data }: CustomerTableRowProps) => {
  return (
    <TableRow className="h-14 border-b border-b-gray-100 transition-colors hover:bg-yellow-50">
      <TableCell className="w-28 px-6 py-4 text-left text-sm font-medium text-gray-900">
        {data.date}
      </TableCell>
      <TableCell className="min-w-48 flex-1 px-6 py-4 text-left text-sm font-medium text-gray-900">
        <div className="wrap-break-word">{data.customer}</div>
      </TableCell>
      <TableCell className="w-24 px-6 py-4 text-center text-sm text-gray-900">
        {data.gradeA}
      </TableCell>
      <TableCell className="w-24 px-6 py-4 text-center text-sm text-gray-900">
        {data.gradeB}
      </TableCell>
      <TableCell className="w-24 px-6 py-4 text-center text-sm text-gray-900">
        {data.gradeC}
      </TableCell>
      <TableCell className="w-28 px-6 py-4 text-center text-sm text-gray-900">
        {data.gradeFailed}
      </TableCell>
      <TableCell className="w-32 px-6 py-4 text-center text-sm font-semibold text-gray-900">
        {data.totalWeight.toLocaleString()}
      </TableCell>
      <TableCell className="min-w-40 flex-1 px-6 py-4 text-left text-sm text-gray-900">
        <NoteCell note={data.note} />
      </TableCell>
    </TableRow>
  );
};

export default function CustomerTable({
  data = MOCK_DATA,
  itemsPerPage = 6,
}: CustomerTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = useMemo(
    () => data.slice(startIndex, endIndex),
    [data, startIndex, endIndex],
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="w-full space-y-4">
      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <Table className="w-full border-collapse">
          {/* Header */}
          <TableHeader className="bg-primary border-b border-b-[#8a6752]">
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-14 w-28 px-6 py-4 text-left font-semibold text-white">
                DATE
              </TableHead>
              <TableHead className="h-14 min-w-48 flex-1 px-6 py-4 text-left font-semibold text-white">
                CUSTOMER
              </TableHead>
              <TableHead className="h-14 w-24 px-6 py-4 text-center font-semibold text-white">
                GRADE A
              </TableHead>
              <TableHead className="h-14 w-24 px-6 py-4 text-center font-semibold text-white">
                GRADE B
              </TableHead>
              <TableHead className="h-14 w-24 px-6 py-4 text-center font-semibold text-white">
                GRADE C
              </TableHead>
              <TableHead className="h-14 w-28 px-6 py-4 text-center font-semibold text-white">
                GRADE FAILED
              </TableHead>
              <TableHead className="h-14 w-32 px-6 py-4 text-center font-semibold text-white">
                TOTAL WEIGHT (G)
              </TableHead>
              <TableHead className="h-14 min-w-40 flex-1 px-6 py-4 text-left font-semibold text-white">
                NOTE
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody className="bg-[#FAF3E0]">
            {currentData.length > 0 ? (
              currentData.map((item) => (
                <CustomerTableRow key={item.id} data={item} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="px-6 py-12 text-center">
                  <p className="text-sm text-gray-500">
                    No customer history found
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-3 py-6">
          <CustomButton
            label="Previous"
            onClick={handlePrevious}
            type="button"
            className={`rounded-full px-6 py-2 font-medium ${
              isFirstPage
                ? "cursor-not-allowed bg-gray-300 text-gray-500"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
            }`}
          />
          <div className="flex min-w-10 items-center justify-center rounded-full bg-[#8a6752] px-4 py-2">
            <span className="text-sm font-semibold text-white">
              {currentPage}
            </span>
          </div>
          <CustomButton
            label="Next"
            onClick={handleNext}
            type="button"
            className={`rounded-full px-6 py-2 font-medium ${
              isLastPage
                ? "cursor-not-allowed bg-gray-300 text-gray-500"
                : "bg-[#8a6752] text-white hover:bg-[#705a40]"
            }`}
          />
        </div>
      )}
    </div>
  );
}
