import { DistributionHistorySearchForm } from "@/lib/types/model/type";
import { useForm } from "react-hook-form";
import CustomDatePicker from "../../common/custom-date-picker";
import { Form } from "@/components/ui/form";
import { Option } from "@/lib/types/model/option";
import CustomSelect from "../../common/forms/form-select";
import CustomButton from "../../common/custom-button";
import { Calendar } from "lucide-react";

const categoryOptions: Option[] = [
  { id: "carry-over", value: "Carry Over" },
  { id: "incoming", value: "Incoming" },
  { id: "issued", value: "Issued" },
];

const gradeOptions: Option[] = [
  { id: "A+", value: "A+" },
  { id: "A", value: "A" },
  { id: "B", value: "B" },
  { id: "C", value: "C" },
  { id: "D+", value: "D+" },
  { id: "D", value: "D" },
];

const plantationYearOptions: Option[] = [
  { id: "2024", value: "2024" },
  { id: "2023", value: "2023" },
  { id: "2022", value: "2022" },
];

const plantationAreaOptions: Option[] = [
  { id: "PM", value: "PM Phamee" },
  { id: "RD", value: "RD Research" },
  { id: "SE", value: "SE Building 1" },
];

export default function DistributionHistory() {
  const form = useForm<DistributionHistorySearchForm>();

  const onClick = () => {
    console.log(form.getValues());
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
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">
                Start Date
              </label>
              <CustomDatePicker
                control={form.control}
                path="startDate"
                placeholder="dd/mm/yyyy"
                className="bg-secondary rounded-xl"
              />
            </div>

            {/* End Date */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">
                End Date
              </label>
              <CustomDatePicker
                control={form.control}
                path="endDate"
                placeholder="dd/mm/yyyy"
              />
            </div>

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
            <div className="flex flex-col">
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
            </div>

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
