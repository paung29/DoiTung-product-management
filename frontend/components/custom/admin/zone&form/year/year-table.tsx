import CustomButton from "@/components/custom/common/custom-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditYearButton from "@/components/custom/admin/zone&form/year/edit-year-button";
export type YearTableDataType = {
  year: string;
  totalZone: number;
};

function YearTable({ yearTableData }: { yearTableData: YearTableDataType[] }) {
  return (
    <div className="border-primary-button overflow-hidden rounded-2xl border">
      <Table>
        <TableHeader>
          <TableRow className="[&_th]:text-primary-button hover:bg-secondary bg-secondary border-primary-button [&_th]:py-4 [&_th]:text-center [&_th]:font-semibold">
            <TableHead className="w-[30%]">Year</TableHead>
            <TableHead className="w-[30%]">Total Zone</TableHead>
            <TableHead className="w-[40%]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {yearTableData.map((item, index) => (
            <TableRow
              className="border-b bg-white text-center last:border-0 [&_td]:py-3"
              key={item.year ?? index}
            >
              <TableCell className="font-medium">{item.year}</TableCell>
              <TableCell>{item.totalZone}</TableCell>

              <TableCell>
                <div className="flex items-center justify-center gap-3">
                  <div className="">
                    <CustomButton
                      label="View Report"
                      className="bg-primary-button rounded-lg px-4 py-2 text-white transition-opacity hover:opacity-90"
                    />
                  </div>
                  <div className="">
                    <EditYearButton yearData={item} />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default YearTable;
