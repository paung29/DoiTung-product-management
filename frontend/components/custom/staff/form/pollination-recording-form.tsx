"use client";
import FormCard from "./form-card";

import ConditionForm from "./condition-form";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { GetPollinationFormApiResponse, PollinationRecordingFormType } from "@/lib/types/model/type";

import FormsInput from "../../common/forms/form-input";
import CustomButton from "../../common/custom-button";
import { CircleCheck, CircleX } from "lucide-react";
import { StaffFormTitle } from "./staff-form-title";
import StaffDisable from "./staff-disable";
import StaffSmallTitle from "./staff-small-title";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { baseUrl } from "@/lib/utl";

function PollinationRecordingForm() {


  const router = useRouter();
  const params = useParams();

  const [Pollintaion, setPollintaion] = useState<GetPollinationFormApiResponse | null>(null)
    
  const clusterId = params.formId
  const year = params.year

  const hasData = Pollintaion?.numberPods !== 0 ||
                  Pollintaion?.unsuccessfulPollination !== 0 ||
                  Pollintaion?.condition !== "";

  const isReadOnly = Pollintaion?.pollinationFormDone === false && hasData;

  const onSubmit = (data: PollinationRecordingFormType) => {
    console.log(data);
  };

  const form = useForm<PollinationRecordingFormType>({
    defaultValues : {
      numberPods: 0,
      unsuccessfulPollination : 0,
      condition: "",
    }
  });

  const numberOfPods = Number(form.watch("numberPods") ?? 0);
  const unsuccessfulPollination = Number(form.watch("unsuccessfulPollination") ?? 0);
  const condition = form.watch("condition");

  const totalFlowers = Number(Pollintaion?.totalFlowers ?? 0);
  const goodFlowers = numberOfPods;
  const badDroppedFlowers = unsuccessfulPollination;

  useEffect(() => {
      console.log("useEffect ran");
      console.log("clusterId:", clusterId);
      if(clusterId) {
        async function load() {
          const response = await fetch(`${baseUrl}/flowers/get-flower-form?clusterId=${clusterId}`, {
            method: "GET",
            credentials: "include"
          })
        
          const result : GetPollinationFormApiResponse = await response.json();
          setPollintaion(result)
          console.log(result)
        }
  
        load();
      }
    }, [clusterId])
  

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
                placeholder={`${Pollintaion?.location}`}
              />
              <StaffDisable
                isRow={true}
                title={"Pole-Number"}
                placeholder={`${Pollintaion?.poleNo}`}
              />
            </div>
            <div className="flex flex-col justify-between md:flex-row md:gap-10 md:py-4">
              <StaffDisable
                isRow={true}
                title={"Cluster-Number"}
                placeholder={`${Pollintaion?.clusterNo}`}
              />
              <StaffDisable
                isRow={true}
                title={"Total-Flower"}
                placeholder={`${Pollintaion?.totalFlowers}`}
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
                  path={"numberPods"}
                  placeholder="Enter Only Number"
                  className="bg-staff-form-field rounded-lg"
                  readonly={isReadOnly}
                />
              </div>
              <div className="w-full">
                <StaffSmallTitle title="Unsuccessful Pollinaition" />
                <FormsInput
                  control={form.control}
                  path={"unsuccessfulPollination"}
                  placeholder="Enter Only Number"
                  className="bg-staff-form-field rounded-lg"
                  readonly={isReadOnly}
                />
              </div>
            </div>
            <div className="flex flex-col py-2 md:flex-row md:gap-10">
              <StaffDisable
                title={"Good Flowers"}
                placeholder={`${goodFlowers}`}
              />
              <StaffDisable
                title={"Bad/Dropped Flowers"}
                placeholder={`${badDroppedFlowers}`}
              />
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
              readonly={isReadOnly}
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
