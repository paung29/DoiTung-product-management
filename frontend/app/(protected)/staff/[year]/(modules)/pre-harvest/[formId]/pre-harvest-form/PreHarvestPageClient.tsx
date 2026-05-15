import PreHarvestRecordingForm from "@/components/custom/staff/form/pre-harvest-recording-form";
import { GetPodApiResponse } from "@/lib/types/model/type";

function PreHarvestForm({record} : {record : GetPodApiResponse}) {
  return <PreHarvestRecordingForm />;
}

export default PreHarvestForm;
