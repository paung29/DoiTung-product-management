import PreHarvestRecordingForm from "@/components/custom/staff/form/pre-harvest-recording-form";
import { GetPodApiResponse, GetPreHarvestApiResponse } from "@/lib/types/model/type";

function PreHarvestForm({record} : {record : GetPreHarvestApiResponse}) {
  return <PreHarvestRecordingForm record={record} />;
}

export default PreHarvestForm;
