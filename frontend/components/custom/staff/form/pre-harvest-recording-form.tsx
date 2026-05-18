"use client";

import FormCard from "./form-card";

import ConditionForm from "./condition-form";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { CreatePreHarvestForm, GetPreHarvestApiResponse, PreHarvestFormShcema, PreHarvestFormValue, PreHarvestRecordingFormType } from "@/lib/types/model/type";

import FormsInput from "../../common/forms/form-input";
import CustomButton from "../../common/custom-button";
import { CircleCheck, CircleX } from "lucide-react";
import { StaffFormTitle } from "./staff-form-title";
import StaffDisable from "./staff-disable";
import StaffSmallTitle from "./staff-small-title";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPreHarvestForm } from "@/lib/server-actions/create-pre-harvest-client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/types/model/function";
import ApiErrorUI from "../../common/error-handle";

function PreHarvestRecordingForm({record} : {record : GetPreHarvestApiResponse}) {

  const router = useRouter();
  const params = useParams();
  const year = params.year
  const formId = params.formId

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: PreHarvestFormValue) => {
    console.log(data);

    const reformData : CreatePreHarvestForm = {
      clusterId : data.clusterId,
      numberPodsSecondRound : Number(data.numberPodsSecondRound),
      removedPods : Number(data.removedPods),
      plantsRemoved : Number(data.plantsRemoved),
      condition : data.condition,
    }

    try{
      const result = await createPreHarvestForm(reformData)
      console.log(result);

      if (result.success === false) {
        setError(result.message);
        return;
      }
      router.replace(`/staff/${year}/pre-harvest`)
    }catch(error) {
      console.error("submit error:", error);
      setError(getErrorMessage(error));
    }
  };

  const handleCancel = () => {
    form.reset();
  };

  const form = useForm<PreHarvestFormValue>({
    resolver: zodResolver(PreHarvestFormShcema),
    defaultValues : {
      clusterId: Number(formId),
      numberPodsSecondRound: String(record.numberPodsSecondRound) || undefined,
      removedPods: String(record.removedPods),
      plantsRemoved: String(record.plantsRemoved),
      condition: record.condition
    }
  });

  return (
    <Form {...form}>
      <form className="flex flex-col">
        <ApiErrorUI message={error}/>
        {/* Location */}
        <div className="pb-8">
          <FormCard>
            <StaffFormTitle isRequired={false} title={"Cluster Information"} />
            <div className="flex flex-col justify-between gap-10 py-4 md:flex-row">
              <StaffDisable title={"Location"} placeholder={record.location} />
              <StaffDisable title={"Pole-No"} placeholder={String(record.poleNo)} />
              <StaffDisable title={"Cluster-No"} placeholder={String(record.clusterNo)} />
            </div>
          </FormCard>
        </div>

        <div className="pb-8 md:flex-row">
          {/*  Number */}
          <FormCard>
            <StaffFormTitle isRequired={true} title={"Pod Formation Data"} />
            <div className="flex flex-col md:flex-row md:gap-10 md:py-2">
              <StaffDisable title={"Remaining Pods"} placeholder={String(record.remainingPods)} />
              <StaffDisable
                title={"Lost/Missing Pods Before Harvest"}
                placeholder={String(record.lostPodsBeforeHarvest)}
              />
            </div>

            <div className="flex flex-col py-2 md:flex-row md:gap-10">
              <div className="w-full">
                <StaffSmallTitle title="Number of Pods (Round-2)" />
                <FormsInput
                  control={form.control}
                  path={"numberPodsSecondRound"}
                  placeholder="Enter Only Number"
                  className="bg-staff-form-field rounded-lg"
                />
              </div>
              <div className="w-full">
                <StaffSmallTitle title="Pods Removed" />
                <FormsInput
                  control={form.control}
                  path={"removedPods"}
                  placeholder="Enter Only Number"
                  className="bg-staff-form-field rounded-lg"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:gap-10 md:py-2">
              <div className="flex-[0.5] md:pr-10">
                <StaffSmallTitle title="Plants With Pods Removed" />
                <FormsInput
                  control={form.control}
                  path={"plantsRemoved"}
                  placeholder="Enter Only Number"
                  className="bg-staff-form-field rounded-lg"
                />
              </div>
            </div>
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
          onClick={handleCancel}
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

export default PreHarvestRecordingForm;
