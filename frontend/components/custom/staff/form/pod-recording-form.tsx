"use client";

import FormCard from "./form-card";

import ConditionForm from "./condition-form";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { PodRecordingFormType } from "@/lib/types/model/type";

import FormsInput from "../../common/forms/form-input";
import CustomButton from "../../common/custom-button";
import { CircleCheck, CircleX } from "lucide-react";
import { StaffFormTitle } from "./staff-form-title";
import StaffDisable from "./staff-disable";
import StaffSmallTitle from "./staff-small-title";

function PodRecordingForm() {
  const onSubmit = (data: PodRecordingFormType) => {
    console.log(data);
  };

  const form = useForm<PodRecordingFormType>({});

  return (
    <Form {...form}>
      <form className="flex flex-col">
        {/* Location */}
        <div className="pb-8">
          <FormCard>
            <StaffFormTitle isRequired={false} title={"Cluster Information"} />
            <div className="flex flex-col justify-between gap-10 py-4 md:flex-row">
              <StaffDisable title={"Location"} placeholder={"zone-1"} />
              <StaffDisable title={"Pole-Id"} placeholder={"001"} />
              <StaffDisable title={"Cluster-Id"} placeholder={"001"} />
            </div>
          </FormCard>
        </div>

        <div className="pb-8 md:flex-row">
          {/*  Number */}
          <FormCard>
            <StaffFormTitle isRequired={true} title={"Pod Formation Data"} />
            <div className="flex flex-col md:flex-row md:gap-10 md:py-2">
              <StaffDisable title={"Number of Pods Formed"} placeholder={"1"} />
              <StaffDisable title={"Remaining Pods"} placeholder={"1"} />
            </div>
            <div className="flex flex-col md:flex-row md:gap-10 md:py-2">
              <div className="flex-[0.5] md:pr-10">
                <StaffSmallTitle title="Unsuccessful Pollinaition" />
                <FormsInput
                  control={form.control}
                  path={"lost_pods"}
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

export default PodRecordingForm;
