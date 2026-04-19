import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type YearTableDataType = {
  year: string;
  totalZone: number;
  totalPole: number;
};

function YearTable({ yearTableData }: { yearTableData: YearTableDataType[] }) {
  return (
    <div className="border-primary-button overflow-hidden rounded-2xl border">
      <Table className="gap-20">
        <TableHeader>
          <TableRow className="[&_th]:text-primary-button hover:bg-secondary bg-secondary border-primary-button [&_th]:py-4 [&_th]:text-center [&_th]:font-semibold">
            <TableHead className="">Year</TableHead>
            <TableHead>Total Zone</TableHead>
            <TableHead>Total Pole</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {yearTableData.map((item) => (
            <TableRow
              className="bg-white text-center [&_td]:py-3"
              key={item.year}
            >
              <TableCell className="font-medium">{item.year}</TableCell>
              <TableCell>{item.totalZone}</TableCell>
              <TableCell>{item.totalPole}</TableCell>
              <TableCell>
                <button className="bg-primary-button rounded-lg px-4 py-2 text-white">
                  View Report
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default YearTable;
