"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DistributionRecord {
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
  Issued: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
  },
  Incoming: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
  "Carry-over": {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
};

const mockData: DistributionRecord[] = [
  {
    id: "1",
    date: "Jan 8, 2026",
    category: "Issued",
    grade: "A+",
    productionYear: 2025,
    warehouse: "PM Phamee",
    amount: 1250,
    details: "Sold to Premium Distributor Co.",
  },
  {
    id: "2",
    date: "Jan 7, 2026",
    category: "Incoming",
    grade: "B",
    productionYear: 2025,
    warehouse: "RD Research",
    amount: 2400,
    details: "New harvest batch received",
  },
  {
    id: "3",
    date: "Jan 7, 2026",
    category: "Carry-over",
    grade: "A",
    productionYear: 2024,
    warehouse: "SP Forest Plantation",
    amount: 850,
    details: "Transferred from previous season",
  },
  {
    id: "4",
    date: "Jan 6, 2026",
    category: "Issued",
    grade: "C",
    productionYear: 2025,
    warehouse: "RD Research",
    amount: 1800,
    details: "Export order fulfilled",
  },
  {
    id: "5",
    date: "Jan 6, 2026",
    category: "Incoming",
    grade: "A+",
    productionYear: 2025,
    warehouse: "SP Forest Plantation",
    amount: 3200,
    details: "Premium grade harvest",
  },
  {
    id: "6",
    date: "Jan 5, 2026",
    category: "Issued",
    grade: "B",
    productionYear: 2024,
    warehouse: "PM Phamee",
    amount: 950,
    details: "Local market distribution",
  },
  {
    id: "7",
    date: "Jan 5, 2026",
    category: "Carry-over",
    grade: "D+",
    productionYear: 2023,
    warehouse: "PM Phamee",
    amount: 450,
    details: "Inventory balance adjustment",
  },
  {
    id: "8",
    date: "Jan 4, 2026",
    category: "Incoming",
    grade: "A",
    productionYear: 2025,
    warehouse: "SE Building 1",
    amount: 2750,
    details: "Grade A batch from processing",
  },
  {
    id: "9",
    date: "Jan 4, 2026",
    category: "Issued",
    grade: "A",
    productionYear: 2025,
    warehouse: "PM Phamee",
    amount: 1650,
    details: "Wholesale order to retailer",
  },
  {
    id: "10",
    date: "Jan 3, 2026",
    category: "Incoming",
    grade: "C",
    productionYear: 2025,
    warehouse: "SE Building 1",
    amount: 1400,
    details: "Standard grade intake",
  },
];

export default function DistributionTable() {
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
            {mockData.map((record) => (
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
