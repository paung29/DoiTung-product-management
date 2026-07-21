"use client"

import { DistributionHistorySearchForm } from "@/lib/types/model/type";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Option } from "@/lib/types/model/option";
import CustomSelect from "../../common/forms/form-select";
import CustomButton from "../../common/custom-button";
import { useParams, useRouter } from "next/navigation";

const categoryOptions: Option[] = [
  { id: "CARRY_OVER", value: "Carry Over" },
  { id: "INCOMING", value: "Incoming" },
  { id: "ISSUED", value: "Issued" },
];

const gradeOptions: Option[] = [
  { id: "A_PLUS", value: "A+" },
  { id: "A", value: "A" },
  { id: "B", value: "B" },
  { id: "C", value: "C" },
  { id: "D_PLUS", value: "D+" },
  { id: "D", value: "D" },
];

export default function DistributionHistory({plantationYearOptions, plantationAreaOptions} : {plantationYearOptions : Option[], plantationAreaOptions: Option[]}) {

  const router = useRouter();
  const params = useParams();
  const routeYear = params.year as string;

  const form = useForm<DistributionHistorySearchForm>({
    defaultValues : {
      productionYear : routeYear
    }
  });

  const onClick = (data : DistributionHistorySearchForm) => {
    const selectedYear = data.productionYear || routeYear;
    console.log(form.getValues());

    const query = new URLSearchParams();

    if (data.category) {
      query.set("category", data.category);
    }

    if (data.grade) {
      query.set("grade", data.grade);
    }

    if (data.plantationArea) {
      query.set("warehouseId", data.plantationArea);
    }

    router.replace(`/admin/inventory-distribution/${selectedYear}/history?${query.toString()}`)

  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      {/* Title */}
      <h2 className="mb-8 text-xl font-semibold text-gray-900">
        Filter Distribution History
      </h2>

      {/* Form */}
      <Form {...form}>
        <form className="space-y-6">
          {/* First Row: Date and Category */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Start Date */}
            

            {/* Category */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">
                Category
              </label>
              <CustomSelect
                control={form.control}
                path="category"
                options={categoryOptions}
                placeholder="All Categories"
                triggerClassName="bg-secondary rounded-xl"
              />
            </div>
          </div>

          {/* Second Row: Grade, Production Year, Plantation Area */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Grade */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">
                Grade
              </label>
              <CustomSelect
                control={form.control}
                path="grade"
                options={gradeOptions}
                placeholder="All Grades"
                triggerClassName="bg-secondary rounded-xl"
              />
            </div>

            {/* Production Year */}
            {/* <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">
                Production Year
              </label>
              <CustomSelect
                control={form.control}
                path="productionYear"
                options={plantationYearOptions}
                placeholder="All Years"
                triggerClassName="bg-secondary rounded-xl"
              />
            </div> */}

            {/* Plantation Area */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">
                Plantation Area
              </label>
              <CustomSelect
                control={form.control}
                path="plantationArea"
                options={plantationAreaOptions}
                placeholder="Search by area..."
                triggerClassName="bg-secondary rounded-xl"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <CustomButton
              label="Search"
              onClick={form.handleSubmit(onClick)}
              className="hover:bg-primary rounded-xl bg-[#8a6752] px-6 py-3 text-white"
            />

            <CustomButton
              label="Reset"
              onClick={() => form.reset()}
              className="rounded-xl border border-gray-300 bg-gray-100 px-6 py-3 text-gray-700 hover:bg-gray-200"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
