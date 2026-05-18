import PodRecordingForm from "@/components/custom/staff/form/pod-recording-form";
import { GetPodApiResponse } from "@/lib/types/model/type";

function PodForm({record} : {record : GetPodApiResponse}) {
  return <PodRecordingForm record={record} />;
}

export default PodForm;
