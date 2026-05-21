"use client";

import CustomButton from "@/components/custom/common/custom-button";
import ApiError from "@/components/custom/common/error-handle";
import FormsInput from "@/components/custom/common/forms/form-input";
import CustomSelect from "@/components/custom/common/forms/form-select";
import ConditionForm from "@/components/custom/staff/form/condition-form";
import FormCard from "@/components/custom/staff/form/form-card";
import { StaffFormTitle } from "@/components/custom/staff/form/staff-form-title";
import { Form } from "@/components/ui/form";
import { Option } from "@/lib/types/model/option";
import {
  ClusterRecordingFormInput,
  ClusterRecordingFormType,
  ClusterRecordingFormTypeSchema,
  Zone,
  ZoneApiResponse,
} from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, CircleX } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function ClusterForm() {
  const [zones, setZones] = useState<Zone[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  const [error, setError] = useState<String | null>();

  const params = useParams();
  const year = params.year as string;
  const router = useRouter();

  const onSubmit = async (data: ClusterRecordingFormType) => {
    const reformData = {
      year: Number(year),
      zoneNo: Number(data.zoneNo) - 1,
      poleNo: Number(data.poleNo),
      clusterNo: Number(data.clusterNo),
      condition: data.condition,
    };

    console.log(reformData);

    try {
      const response = await fetch(`${baseUrl}/clusters/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reformData),
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Failed to create");
        return;
      }

      console.log(result);
      router.replace(`/staff/${year}/cluster`);
    } catch (error) {
      setError("Cannot connect to server");
    }
  };

  const onCancel = () => {
    form.resetField("poleNo");
    form.resetField("clusterNo");
    form.resetField("condition");
    form.resetField("zoneNo");
  };

  const form = useForm<
    ClusterRecordingFormInput,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    ClusterRecordingFormType
  >({
    resolver: zodResolver(ClusterRecordingFormTypeSchema),
    defaultValues: {
      year: Number(year),
      poleNo: "0",
      clusterNo: "0",
      condition: "",
    },
  });

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/zones/get-all-zones?year=${year}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch zones");
        }

        const data: ZoneApiResponse = await response.json();

        setZones(data.zones ?? []);
      } catch (error) {
        console.error("Error fetching zones:", error);
        setZones([]);
      }
    };

    if (year) {
      fetchZones();
    }
  }, [year]);

  const locationOptions: Option[] = (zones ?? []).map((zone) => ({
    id: String(zone.zoneId),
    value: String(zone.zoneName),
  }));

  return (
    <Form {...form}>
      {error && <ApiError message={error.toString()} />}
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
              options={locationOptions}
            />
          </FormCard>
        </div>

        <div className="flex flex-col gap-10 pb-8 md:flex-row">
          {/* Pole Number */}
          <FormCard>
            <StaffFormTitle isRequired={true} title={"Pole Number"} />
            <FormsInput
              control={form.control}
              path="poleNo"
              placeholder="eg., P-001"
              className="bg-staff-form-field rounded-lg"
            />
          </FormCard>
          {/* Cluster Number */}
          <FormCard>
            <StaffFormTitle isRequired={true} title={"Cluster Number"} />
            <FormsInput
              control={form.control}
              path="clusterNo"
              placeholder="eg., C-001"
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
          onClick={onCancel}
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

export default ClusterForm;
