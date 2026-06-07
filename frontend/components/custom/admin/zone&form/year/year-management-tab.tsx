import CreateYearButton from "@/components/custom/admin/zone&form/year/create-year-button";
import YearTable, {
  YearTableDataType,
} from "@/components/custom/admin/zone&form/year/year-table";

function YearManagementTab({records} : {records : YearTableDataType[]}) {

  return (
    <>
      <div className="flex flex-col">
        <div className="flex h-[80px] flex-row items-end justify-end p-4">
          <CreateYearButton />
        </div>
        <YearTable yearTableData={records} />
      </div>
    </>
  );
}

export default YearManagementTab;
