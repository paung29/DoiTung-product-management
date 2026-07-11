import { TableCell, TableRow } from "@/components/ui/table";
import NoteCell from "./note-cell";
import { CustomerHistoryData } from "./customer-tabel";
import EditButton from "@/components/custom/common/edit-button";

interface Props {
  data: CustomerHistoryData;
  onEdit: (customer: CustomerHistoryData) => void;
}

export default function CustomerTableRow({ data, onEdit }: Props) {
  return (
    <TableRow className="h-14 border-b border-b-gray-100 transition-colors hover:bg-yellow-50">
      <TableCell className="w-24 px-6 py-4 text-center text-sm font-medium text-gray-900">
        {data.no}
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
        <EditButton onClick={() => onEdit(data)} />
      </TableCell>
    </TableRow>
  );
}