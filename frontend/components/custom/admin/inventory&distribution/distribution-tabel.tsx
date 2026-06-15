"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface DistributionRecord {
  id: string;
  date: string;
  category: string;
  grade: string;
  productionYear: number;
  warehouse: string;
  amount: number;
  details: string;
}

const categoryBadgeConfig: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  ISSUED: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
  },
  INCOMING: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
  CARRY_OVER: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
};


export default function DistributionTable({records} : {records : DistributionRecord[]}) {
  const getCategoryBadgeStyle = (category: string) => {
    return categoryBadgeConfig[category] || categoryBadgeConfig["Issued"];
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="bg-primary border-b border-b-[#8a6752]">
        <Table>
          <TableHeader>
            <TableRow className="border-0 hover:bg-transparent">
              <TableHead className="h-14 px-6 py-4 text-left font-semibold text-white">
                DATE
              </TableHead>
              <TableHead className="h-14 px-6 py-4 text-left font-semibold text-white">
                CATEGORY
              </TableHead>
              <TableHead className="h-14 px-6 py-4 text-left font-semibold text-white">
                GRADE
              </TableHead>
              <TableHead className="h-14 px-6 py-4 text-left font-semibold text-white">
                PRODUCTION YEAR
              </TableHead>
              <TableHead className="h-14 px-6 py-4 text-left font-semibold text-white">
                WAREHOUSE
              </TableHead>
              <TableHead className="h-14 px-6 py-4 text-right font-semibold text-white">
                AMOUNT (G)
              </TableHead>
              <TableHead className="h-14 px-6 py-4 text-left font-semibold text-white">
                DETAILS / REMARKS
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>

      {/* Body */}
      <div className="bg-[#FAF3E0]">
        <Table>
          <TableBody>
            {records.map((record) => (
              <TableRow
                key={record.id}
                className="border-0 border-b border-b-gray-100 hover:bg-yellow-50"
              >
                <TableCell className="h-14 px-6 py-4 text-sm text-gray-900">
                  {record.date}
                </TableCell>
                <TableCell className="h-14 px-6 py-4">
                  {(() => {
                    const style = getCategoryBadgeStyle(record.category);
                    return (
                      <div
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${style.border} ${style.bg} ${style.text}`}
                      >
                        {record.category}
                      </div>
                    );
                  })()}
                </TableCell>
                <TableCell className="h-14 px-6 py-4 text-sm font-medium text-gray-900">
                  {record.grade}
                </TableCell>
                <TableCell className="h-14 px-6 py-4 text-sm text-gray-900">
                  {record.productionYear}
                </TableCell>
                <TableCell className="h-14 px-6 py-4 text-sm text-gray-900">
                  {record.warehouse}
                </TableCell>
                <TableCell className="h-14 px-6 py-4 text-right text-sm font-medium text-gray-900">
                  {record.amount.toLocaleString()}
                </TableCell>
                <TableCell className="h-14 px-6 py-4 text-sm text-gray-700">
                  {record.details}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
