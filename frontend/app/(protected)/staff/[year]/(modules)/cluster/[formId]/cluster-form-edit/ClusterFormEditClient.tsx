"use client"

import CustomButton from "@/components/custom/common/custom-button";
import FormsInput from "@/components/custom/common/forms/form-input";
import CustomSelect from "@/components/custom/common/forms/form-select";
import ConditionForm from "@/components/custom/staff/form/condition-form";
import FormCard from "@/components/custom/staff/form/form-card";
import { StaffFormTitle } from "@/components/custom/staff/form/staff-form-title";
import { Form } from "@/components/ui/form";
import { editCluster } from "@/lib/server-actions/edit-cluster-client";
import { Option } from "@/lib/types/model/option";
import { ClusterEditingView, ClusterEditType, ClusterRecordingFormInput, ClusterRecordingFormType, ClusterRecordingFormTypeSchema, ConditionOptions, GetClusterApiResponse } from "@/lib/types/model/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, CircleX } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

function ClusterFormEdit({data} : {data : GetClusterApiResponse}) {

  const params = useParams();
  const year = params.year as string;
  const formId = params.formId as string;
  const router = useRouter();
  
  const onSubmit = async (data: ClusterRecordingFormType) => {

    const form : ClusterEditType = {
      clusterId: Number(formId),
      condition: data.condition
    }

    const response = await editCluster(form)
    console.log(response)

    router.replace(`/staff/${year}/cluster`)
  };

  const locations: Option[] = [
    { id: "zone-1", value: "Zone 1" },
    { id: "zone-2", value: "Zone 2" },
    { id: "zone-3", value: "Zone 3" },
    { id: "zone-4", value: "Zone 4" },
  ];

  const form = useForm<ClusterRecordingFormInput, any, ClusterRecordingFormType>({
    resolver : zodResolver(ClusterRecordingFormTypeSchema),
    defaultValues : {
        year: Number(year),
        zoneNo: data.location,
        poleNo: String(data.poleNo),
        clusterNo: String(data.clusterNo),
        condition: String(data.condition),
    }
  });

 
  return (
    <Form {...form}>
      <form className="flex flex-col">
        {/* Location */}
        <div className="pb-8">
          <FormCard>
            <StaffFormTitle isRequired={true} title={"Location"} />

            <CustomSelect
              triggerClassName="bg-staff-form-field"
              className="w-full appearance-none rounded-lg px-4 py-3 pr-10 text-sm text-[#2d201b] outline-none"
              control={form.control}
              path="zoneNo"
              placeholder="Select Location"
              options={locations}
              disabled={true}
            />
          </FormCard>
        </div>

        <div className="flex flex-col gap-10 pb-8 md:flex-row">
          {/* Pole Number */}
          <FormCard>
            <StaffFormTitle isRequired={true} title={"Pole Number"} />
            <FormsInput
              control={form.control}
              path={"poleNo"}
              placeholder="eg., P-001"
              className="bg-staff-form-field rounded-lg"
              readonly={true}
            />
          </FormCard>
          {/* Cluster Number */}
          <FormCard>
            <StaffFormTitle isRequired={true} title={"Cluster Number"} />
            <FormsInput
              control={form.control}
              path={"clusterNo"}
              placeholder="eg., C-001"
              className="bg-staff-form-field rounded-lg"
              readonly={true}
            />
          </FormCard>
        </div>

        {/* Condition */}
        <div className="pb-8">
          <FormCard>
            <StaffFormTitle isRequired={true} title={"Condition"} />
            <ConditionForm
              control={form.control}
              path={"condition"}
              label="Condition"
            />
          </FormCard>
        </div>
      </form>

      <div className="flex flex-row items-center justify-around gap-4">
        <CustomButton
          label="Cancel"
          onClick={() => console.log("Delete")}
          className="w-[180px] bg-red-600 hover:bg-red-700"
          icon={CircleX}
        />

        <CustomButton
          label="Submit"
          onClick={form.handleSubmit(onSubmit)}
          className="bg-staff-success w-[180px] hover:bg-green-800"
          icon={CircleCheck}
        />
      </div>
    </Form>
  );
}

export default ClusterFormEdit;
