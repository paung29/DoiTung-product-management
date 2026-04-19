import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditFormButton } from "./edit-form-button";

export type FormTableDataType = {
  form_id: number;
  form_name: string;
  active_status: boolean;
};

function FormTable({ formTableData }: { formTableData: FormTableDataType[] }) {
  return (
    <div className="border-primary-button overflow-hidden rounded-2xl border">
      <Table className="gap-20">
        <TableHeader>
          <TableRow className="[&_th]:text-primary-button hover:bg-secondary bg-secondary border-primary-button [&_th]:py-4 [&_th]:text-center [&_th]:font-semibold">
            <TableHead>Form Name</TableHead>
            <TableHead>Active Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formTableData.map((item) => (
            <TableRow
              className="bg-white text-center [&_td]:py-3"
              key={item.form_id}
            >
              <TableCell className="font-medium">{item.form_name}</TableCell>
              <TableCell className="flex justify-center">
                {item.active_status ? (
                  <div className="rounde bg-soft-success text-success border-success w-30 rounded-2xl border px-2 py-1">
                    Active
                  </div>
                ) : (
                  <div className="rounde w-30 rounded-2xl border border-red-600 bg-red-200 px-2 py-1 text-red-600">
                    Inactive
                  </div>
                )}
              </TableCell>
              <TableCell>
                <EditFormButton
                  form_id={item.form_id}
                  form_name={item.form_name}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default FormTable;
