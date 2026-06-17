import { Edit } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import NoteCell from "./note-cell";
import { CustomerHistoryData } from "./customer-tabel";

interface Props {
  data: CustomerHistoryData;
  onEdit: (customer: CustomerHistoryData) => void;
}

export default function CustomerTableRow({ data, onEdit }: Props) {
  return (
    <TableRow className="h-14 border-b border-b-gray-100 transition-colors hover:bg-yellow-50">
      <TableCell className="w-28 px-6 py-4 text-left text-sm font-medium text-gray-900">
        {data.date}
      </TableCell>
      <TableCell className="min-w-48 flex-1 px-6 py-4 text-left text-sm font-medium text-gray-900">
        {data.customer}
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
      <TableCell className="w-16 px-6 py-4 text-center">
        <button
          onClick={() => onEdit(data)}
          className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900"
        >
          <Edit className="h-5 w-5" />
        </button>
      </TableCell>
    </TableRow>
  );
}