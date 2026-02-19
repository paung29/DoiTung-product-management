"use client";
import React, { useState } from "react";
import FormCard from "./form-card";

import ConditionForm from "./condition-form";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FlowerRecordingFormType } from "@/lib/types/model/type";

import { Option } from "@/lib/types/model/option";

import FormsInput from "../../common/forms/form-input";
import CustomButton from "../../common/custom-button";
import { CircleCheck, CircleX } from "lucide-react";
import { StaffFormTitle } from "./staff-form-title";
import StaffDisable from "./staff-disable";

function FlowerRecordingForm() {
  const onSubmit = (data: FlowerRecordingFormType) => {
    console.log(data);
  };

  const form = useForm<FlowerRecordingFormType>({});

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
          {/* Pole Number */}
          <FormCard>
            <StaffFormTitle isRequired={true} title={"Flower Data"} />
            <p className="py-2">Total Flowers * </p>
            <FormsInput
              control={form.control}
              path={"total_flowers"}
              placeholder="eg., P-001"
              className="bg-staff-form-field rounded-lg"
            />
          </FormCard>
        </div>

        {/* Condition */}
        <div className="pb-8">
          <FormCard>
            <StaffFormTitle isRequired={true} title={"Location"} />
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

export default FlowerRecordingForm;
