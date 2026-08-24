"use client";
import FormCard from "./form-card";

import ConditionForm from "./condition-form";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FlowerRecordingFormInput, FlowerRecordingFormType, FlowerRecordingFormTypeSchema, GetClusterApiResponse } from "@/lib/types/model/type";

import FormsInput from "../../common/forms/form-input";
import CustomButton from "../../common/custom-button";
import { CircleCheck, CircleX } from "lucide-react";
import { StaffFormTitle } from "./staff-form-title";
import StaffDisable from "./staff-disable";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { baseUrl } from "@/lib/utl";
import { getErrorMessage } from "@/lib/types/model/function";
import { ApiError } from "next/dist/server/api-utils";
import ApiErrorUI from "../../common/error-handle";
import { createFlower } from "@/lib/server-actions/create-flower-client";

function FlowerRecordingForm() {

  const [Cluster, setCluster] = useState<GetClusterApiResponse | null>(null)
  const [error, setError] = useState<String | null>()

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const clusterId = params.formId
  const year = params.year

  const onSubmit = async (data: FlowerRecordingFormType) => {
    data.clusterId = Number(clusterId)
    console.log(data)
    try{
      const result = await createFlower(data);
      console.log(result);

      if (result.success === false) {
        setError(result.message);
        return;
      }

      router.replace(
        from === "history" ? `/staff/${year}/history/flower` : `/staff/${year}/flower`
      )
    }catch(error) {
      console.error("submit error:", error);
      setError(getErrorMessage(error));
    }
    
  };

  const handleCancel = () => {
    form.reset();
  };

  const form = useForm<FlowerRecordingFormInput, any, FlowerRecordingFormType>({
    
    resolver: zodResolver(FlowerRecordingFormTypeSchema),
    defaultValues: {
      clusterId: Number(clusterId),
      condition: "",
      totalFlowers: "",
    },
});

  useEffect(() => {
    if (!clusterId) return;
    
    console.log("useEffect ran");
    console.log("clusterId:", clusterId);
    if(clusterId) {
      async function load() {
        const response = await fetch(`${baseUrl}/flowers/get-flower-form?clusterId=${clusterId}`, {
          method: "GET",
          credentials: "include"
        })
        const result : GetClusterApiResponse = await response.json();
        setCluster(result)
        console.log(Cluster)
      }

      load();
    }
  }, [clusterId])

  useEffect(() => {
    if (!Cluster) return;

    form.reset({
      clusterId: Number(clusterId),
      condition: Cluster.condition ?? "",
      totalFlowers: String(Cluster.totalFlowers ?? ""),
    });
  }, [Cluster, clusterId, form]);

  return (
    <Form {...form}>
      <form className="flex flex-col">
        <ApiErrorUI message={error ? error.toString() : null}/>
        {/* Location */}
        <div className="pb-8">
          <FormCard>
            <StaffFormTitle isRequired={false} title={"Cluster Information"} />
            <div className="flex flex-col justify-between gap-10 py-4 md:flex-row">
              <StaffDisable title={"Location"} placeholder={`${Cluster?.location}`} />
              <StaffDisable title={"Pole-No"} placeholder={`${Cluster?.poleNo}`} />
              <StaffDisable title={"Cluster-No"} placeholder={`${Cluster?.clusterNo}`} />
            </div>
          </FormCard>
        </div>

        <div className="pb-8 md:flex-row">
          {/* Pole Number */}
          <FormCard>
            <StaffFormTitle isRequired={true} title={"Flower Data"} />
            <p className="py-2">Total Flowers * </p>
            <FormsInput
              type="number"
              control={form.control}
              path={"totalFlowers"}
              placeholder={ "Enter Total Flowers"}
              className="bg-staff-form-field rounded-lg"
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

export default FlowerRecordingForm;
