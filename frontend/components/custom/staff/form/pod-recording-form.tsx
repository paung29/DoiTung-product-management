"use client";

import FormCard from "./form-card";

import ConditionForm from "./condition-form";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { GetPodApiResponse, PodCreateForm, PodFormSchema, PodFormValues, PodRecordingFormType } from "@/lib/types/model/type";

import FormsInput from "../../common/forms/form-input";
import CustomButton from "../../common/custom-button";
import { CircleCheck, CircleX } from "lucide-react";
import { StaffFormTitle } from "./staff-form-title";
import StaffDisable from "./staff-disable";
import StaffSmallTitle from "./staff-small-title";
import { useParams, useRouter } from "next/navigation";
import { Numans } from "next/font/google";
import { useEffect, useState } from "react";
import { createPod } from "@/lib/server-actions/create-pod-client";
import ApiErrorUI from "../../common/error-handle";
import { getErrorMessage } from "@/lib/types/model/function";
import { zodResolver } from "@hookform/resolvers/zod";

function PodRecordingForm({record} : {record : GetPodApiResponse}) {

  const router = useRouter();
  const params = useParams();
  const [apiError, setapiError] = useState<string | null>(null);

  const year = params.year
  const formId = params.formId

  console.log(record)

  const form = useForm<PodFormValues>({
    resolver: zodResolver(PodFormSchema),
    defaultValues: {
      lostPods : String(record.lostPods) || String(0),
      condition: record.condition ?? "",
    }
  });

  const {
    setError,
    clearErrors,
    formState: { errors },
  } = form;

  const lostPods = form.watch("lostPods");

  const remainingPods = Math.max(Number(record.numberPods || 0) - Number(lostPods || 0), 0);

  useEffect(() => {
    if (Number(lostPods) > Number(record.numberPods)) {
      setError("lostPods", {
        type: "manual",
        message: "Lost pods cannot be greater than total pods formed",
      });
    } else {
      clearErrors("lostPods");
    }
  }, [lostPods, record.numberPods, setError, clearErrors]);


  const onSubmit = async (data: PodFormValues) => {
    setapiError(null)
    console.log(data);
    if (Number(lostPods) > Number(record.numberPods)) {
      setapiError("Lost pods cannot be greater than total pods formed");
      return;
    } 

    const reformData : PodCreateForm  = {
      clusterId : Number(formId),
      lostPods : Number(data.lostPods),
      condition : data.condition
    }

    try{
      const result = await createPod(reformData)
      console.log(result);

      if (result.success === false) {
        setapiError(result.message);
        return;
      }
      router.replace(`/staff/${year}/pod`)
    }catch(error) {
      console.error("submit error:", error);
      setapiError(getErrorMessage(error));
    }
    
  };

  const handleCancel = () => {
    form.reset();
  };

  return (
    <Form {...form}>
      <form className="flex flex-col">
        <ApiErrorUI message={apiError}/>
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
              <StaffDisable title={"Number of Pods Formed"} placeholder={String(record.numberPods)} />
              <StaffSmallTitle title="Lost Pods" />
                <FormsInput
                  control={form.control}
                  path={"lostPods"}
                  placeholder="Enter Only Number"
                  className=""
                />

                {errors.lostPods && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.lostPods.message}
                  </p>
                )}
            </div>
            <div className="flex flex-col md:flex-row md:gap-10 md:py-2">
              <div className="flex-[0.5] md:pr-10">
                <StaffSmallTitle title="Remaining Pods" />
                
                <StaffDisable title=""placeholder={String(remainingPods)}/>
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

export default PodRecordingForm;
