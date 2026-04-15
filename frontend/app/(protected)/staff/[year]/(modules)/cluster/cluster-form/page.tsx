"use client"

import CustomButton from "@/components/custom/common/custom-button";
import FormsInput from "@/components/custom/common/forms/form-input";
import CustomSelect from "@/components/custom/common/forms/form-select";
import ConditionForm from "@/components/custom/staff/form/condition-form";
import FormCard from "@/components/custom/staff/form/form-card";
import { StaffFormTitle } from "@/components/custom/staff/form/staff-form-title";
import { Form } from "@/components/ui/form";
import { LocationOptionType, Option } from "@/lib/types/model/option";
import { ClusterRecordingFormType, Zone, ZoneApiResponse } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";
import { CircleCheck, CircleX } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function ClusterForm() {

  const [zones, setZones] = useState<Zone[]>([])

  const params = useParams();
  const year = params.year as string;
  
  const onSubmit = (data: ClusterRecordingFormType) => {
    console.log(data);
  };

  const form = useForm<ClusterRecordingFormType>({
    defaultValues: {
      location: "",
      pole_id: "",
      cluster_id: "",
      condition: ""
    }
  });


  useEffect(() => {
    const fetchZones = async () => {
      try{
         const response = await fetch(`${baseUrl}/zones/get-all-zones?year=${year}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
          },
            credentials: "include"
         })

         if (!response.ok) {
           throw new Error("Failed to fetch zones");
         }

         const data : ZoneApiResponse= await response.json()

         setZones(data.zones ?? []);

      }catch(error){
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
    value: String(zone.zoneId),
  }));

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
              path="location"
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
              path={"pole_id"}
              placeholder="eg., P-001"
              className="bg-staff-form-field rounded-lg"
            />
          </FormCard>
          {/* Cluster Number */}
          <FormCard>
            <StaffFormTitle isRequired={true} title={"Cluster Number"} />
            <FormsInput
              control={form.control}
              path={"cluster_id"}
              placeholder="eg., C-001"
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

export default ClusterForm;
