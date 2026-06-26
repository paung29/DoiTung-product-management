"use client";

import { Option } from "@/lib/types/model/option";
import CustomSelect from "../common/forms/form-select";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormsInput from "../common/forms/form-input";
import CustomButton from "../common/custom-button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
const harvestSearchSchema = z.object({
  location: z.string().min(1, "Location is required"),
  pole_id: z
    .string()
    .optional()
    .refine((val) => !val || /^P-\d+$/.test(val), {
      message: "Pole ID must be like P-00001",
    }),
});

type HarvestAndGradingSearchForm = z.infer<typeof harvestSearchSchema>;

export default function HarvestAndGradingSearch({locations} : {locations : Option[]}) {

  const router = useRouter();

  const onSubmit = (data: HarvestAndGradingSearchForm) => {
    console.log("Harvest and Grading Search Data: ", data);

    router.push(`/staff/2021/harvest-grading?zoneNo=${data.location}`)

  };

  const form = useForm<HarvestAndGradingSearchForm>({
    resolver: zodResolver(harvestSearchSchema),
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
                options={locations}
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
