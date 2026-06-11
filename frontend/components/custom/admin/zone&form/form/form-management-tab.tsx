import FormTable, {
  FormTableDataType,
} from "@/components/custom/admin/zone&form/form/form-table";
import ZoneTotalCard from "@/components/custom/admin/zone&form/zone-total-card";
import { YearSettingApiResponse } from "@/lib/types/model/type";
import { Activity } from "lucide-react";

function FormManagementTab({ selectedYear, data }: { selectedYear?: string, data : YearSettingApiResponse}) {
  const formTableData: FormTableDataType[] = [
    {
      form_id: 1,
      form_name: "Cluster Form",
      active_status: data.clusterActive,
      serviceName: "cluster"
    },
    {
      form_id: 2,
      form_name: "Flower Form",
      active_status: data.flowerActive,
      serviceName: "flower"
    },
    { form_id: 3, 
      form_name: "Pollination Form",
      active_status: data.pollinationActive,
      serviceName: "pollination"
    },
    {
      form_id: 4,
      form_name: "Pod Form",
      active_status: data.podActive,
      serviceName: "pod"
    },
    {
      form_id: 5,
      form_name: "Pre-harvest Form",
      active_status: data.preHarvestActive,
      serviceName: "preHarvest"
    },
    {
      form_id: 6,
      form_name: "Harvest Form",
      active_status: data.harvestGradingActive,
      serviceName: "harvestGrading"
    },
  ];
  return selectedYear ? (
    <>
      <div className="mt-4 flex flex-col gap-4">
        <ZoneTotalCard
          title={"Active Form"}
          total={formTableData.filter((f) => f.active_status).length}
          icon={Activity}
        />
        <FormTable formTableData={formTableData} />
      </div>
    </>
  ) : (
    <div>
      <p className="text-center text-lg font-medium text-gray-500">
        Please select a year to manage forms.
      </p>
    </div>
  );
}

export default FormManagementTab;
