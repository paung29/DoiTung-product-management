"use client";
import React, { useState } from "react";
import FormCard from "./form-card";

import ConditionForm from "./condition-form";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { PollinationRecordingFormType } from "@/lib/types/model/type";

import { Option } from "@/lib/types/model/option";

import FormsInput from "../../common/forms/form-input";
import CustomButton from "../../common/custom-button";
import { CircleCheck, CircleX } from "lucide-react";
import { StaffFormTitle } from "./staff-form-title";
import StaffDisable from "./staff-disable";
import StaffSmallTitle from "./staff-small-title";

function PollinationRecordingForm() {
  const onSubmit = (data: PollinationRecordingFormType) => {
    console.log(data);
  };

  const form = useForm<PollinationRecordingFormType>({});

  return (
    <Form {...form}>
      <form className="flex flex-col">
        {/* Location */}
        <div className="pb-8">
          <FormCard>
            <StaffFormTitle isRequired={false} title={"Cluster Information"} />
            <div className="flex flex-col justify-between md:flex-row md:gap-10 md:py-4">
              <StaffDisable
                isRow={true}
                title={"Location"}
                placeholder={"zone-1"}
              />
              <StaffDisable
                isRow={true}
                title={"Pole-Id"}
                placeholder={"001"}
              />
            </div>
            <div className="flex flex-col justify-between md:flex-row md:gap-10 md:py-4">
              <StaffDisable
                isRow={true}
                title={"Cluster-Id"}
                placeholder={"001"}
              />
              <StaffDisable
                isRow={true}
                title={"Total-Flower"}
                placeholder={"10"}
              />
            </div>
          </FormCard>
        </div>

        <div className="pb-8 md:flex-row">
          {/*  Number */}
          <FormCard>
            <StaffFormTitle isRequired={true} title={"Flower Data"} />
            <div className="flex flex-col py-2 md:flex-row md:gap-10">
              <div className="w-full">
                <StaffSmallTitle title="Number of Pods" />
                <FormsInput
                  control={form.control}
                  path={"number_of_pods"}
                  placeholder="Enter Only Number"
                  className="bg-staff-form-field rounded-lg"
                />
              </div>
              <div className="w-full">
                <StaffSmallTitle title="Unsuccessful Pollinaition" />
                <FormsInput
                  control={form.control}
                  path={"unsuccessful_pollination"}
                  placeholder="Enter Only Number"
                  className="bg-staff-form-field rounded-lg"
                />
              </div>
            </div>
            <div className="flex flex-col py-2 md:flex-row md:gap-10">
              <StaffDisable title={"Good Flowers"} placeholder={"1"} />
              <StaffDisable title={"Bad/Dropped Flowers"} placeholder={"1"} />
            </div>
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

export default PollinationRecordingForm;
