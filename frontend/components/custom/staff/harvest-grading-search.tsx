"use client";

import { Option } from "@/lib/types/model/option";
import CustomSelect from "../common/forms/form-select";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { HarvestAndGradingSearchForm } from "@/lib/types/model/type";
import FormsInput from "../common/forms/form-input";
import CustomButton from "../common/custom-button";

export default function HarvestAndGradingSearch() {
  const onSubmit = (data: HarvestAndGradingSearchForm) => {
    console.log("Harvest and Grading Search Data: ", data);
  };

  const form = useForm<HarvestAndGradingSearchForm>({
    defaultValues: {
      location: "",
      pole_id: "",
    },
  });

  return (
    <Form {...form}>
      <form className="mt-4 w-full p-2 sm:p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:gap-4">
            <div className="w-full flex-1 sm:w-auto">
              <CustomSelect
                className="w-full"
                control={form.control}
                path="location"
                label="Location"
                placeholder="Select Location"
                options={[{ id: "-1", value: "Select All" }, ...locations]}
              />
            </div>

            <div className="w-full flex-1 sm:w-auto">
              <FormsInput
                className="w-full"
                control={form.control}
                path="pole_id"
                label="Pole ID"
                placeholder="Enter pole ID"
              />
            </div>
          </div>

          <div className="flex w-full sm:w-auto lg:ml-4">
            <CustomButton
              label="Search"
              onClick={form.handleSubmit(onSubmit)}
              className="btn-primary w-full sm:w-[180px]"
            />
          </div>
        </div>
      </form>
    </Form>
  );
}

const locations: Option[] = [
  { id: "zone-1", value: "Zone 1" },
  { id: "zone-2", value: "Zone 2" },
  { id: "zone-3", value: "Zone 3" },
  { id: "zone-4", value: "Zone 4" },
];
