"use client";

import { Form } from "@/components/ui/form";
import { InventoryForm, StockDistributionForm, YearApiResponse } from "@/lib/types/model/type";
import { useForm } from "react-hook-form";
import CustomDatePicker from "../../common/custom-date-picker";
import CustomSelect from "../../common/forms/form-select";
import { Option } from "@/lib/types/model/option";
import FormsInput from "../../common/forms/form-input";
import { Button } from "@/components/ui/button";
import CustomButton from "../../common/custom-button";
import { useEffect, useRef } from "react";
import { createCarryOver } from "@/lib/server-actions/admin/create-carry-over-client";
import { createIncoming } from "@/lib/server-actions/admin/create-incoming-client";
import { createIssued } from "@/lib/server-actions/admin/create-issued-client";
import { useZoneForm } from "@/app/(protected)/admin/(modules)/zone-form-management/zone-form-context";
import { useInventory } from "@/app/(protected)/admin/(modules)/inventory-distribution/inventory-context";
import { useParams, useRouter } from "next/navigation";

const categoryOptions: Option[] = [
  { id: "carry-over", value: "Carry Over" },
  { id: "incoming", value: "Incoming" },
  { id: "issued", value: "Issued" },
];


// export type HarvestGradingRecordingFormData = {
//   gradeA_plus: GradeEntry;
//   gradeA: GradeEntry;
//   gradeB: GradeEntry;
//   gradeC: GradeEntry;
//   gradeD_plus: GradeEntry;
// };

const gradeOtions : Option[] = [
  { id: "A_PLUS", value: "grade A +" },
  { id: "A", value: "grade A" },
  { id: "B", value: "grade B" },
  { id: "C", value: "grade C" },
  { id: "D_PLUS", value: "grade D +" },
  { id: "D", value: "grade D" },
];


export default function InventorySaleForm({years, plantationAreaOptions, customers} : {years : YearApiResponse, plantationAreaOptions : Option[] , customers : Option[]}) {

  const router = useRouter()
  const params = useParams();
  const year = params.year

  const plantationYearOptions: Option[] = years.years.map((year) => ({
    id: String(year),
    value: String(year),
  }));

  const form = useForm<InventoryForm>({
    defaultValues : {
      category: undefined,
      date: undefined,
      plantationYear: undefined,
      plantationArea: undefined,
      numberOfPods: "",
      pricePerGram: "",
      customer: "",
      amount: "",
      Remarks: "",
    }
  });

  const category = form.watch("category");

  const previousCategory = useRef<string | undefined>(undefined);

  useEffect(() => {

    if (!category) return;

    if (previousCategory.current && previousCategory.current !== category) {
      form.reset(
        {
          category,
          date: undefined,
          plantationYear: undefined,
          plantationArea: undefined,
          numberOfPods: "",
          pricePerGram: "",
          customer: "",
          amount: "",
          Remarks: "",
          grade: undefined,
        }
      );
    }

    previousCategory.current = category;

}, [category, form]);

  const onSubmit = async (data: InventoryForm) => {

    console.log(data)

    const reformData : StockDistributionForm = {
      year: Number(year),
      production_year: Number(data.plantationYear),
      warehouse_id : Number(data.plantationArea),
      customer_id : Number(data.customer),
      grade: data.grade,
      price_per_gram : data.pricePerGram ? Number(data.pricePerGram) : undefined,
      total_grams : Number(data.amount),
      total_pods : Number(data.numberOfPods),
      details : data.Remarks,
      recorded_date : data.date
    }

    console.log("ReformData : " , reformData)

    try{
      let result;

      switch (data.category) {

      case "carry-over":
        result = await createCarryOver(reformData);
        break;

      case "incoming":
        result = await createIncoming(reformData);
        break;

      case "issued":
        result = await createIssued(reformData);
        break;

      default:
        console.log("Invalid category");
        return;
    }

    console.log("API result:", result);
    router.replace(`/admin/inventory-distribution/${year}/history`)
    } catch(error) {
      console.log(error)
    }
    
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mx-auto w-1/2 rounded-xl bg-white p-4 shadow">
          <CustomDatePicker
            key={`date-${category}`}
            control={form.control}
            path="date"
            label="Date"
            placeholder="Pick a date"
            className="mb-3"
          />

          <CustomSelect
            control={form.control}
            path="category"
            label="Category"
            placeholder="Select category"
            options={categoryOptions}
            className="mt-3 mb-3"
          />

          <CustomSelect
            key={`year-${category}`}
            control={form.control}
            path="plantationYear"
            label="Plantation Year"
            placeholder="Select year"
            options={plantationYearOptions}
            className="mb-3"
          />

          <CustomSelect
            key={`area-${category}`}
            control={form.control}
            path="plantationArea"
            label="Plantation Area"
            placeholder="Select area"
            options={plantationAreaOptions}
            className="mb-3"
          />

          <FormsInput
            key={`pods-${category}`}
            control={form.control}
            path="numberOfPods"
            label="Number of Pods"
            placeholder="Enter number of pods"
            className="mb-3"
          />

          {category === "issued" && (
            <>
              <FormsInput
                key={`price-${category}`}
                control={form.control}
                path="pricePerGram"
                label="Price per Gram"
                placeholder="Enter price per gram"
                className="mb-3"
              />

              <CustomSelect
                key={`customer-${category}`}
                control={form.control}
                path="customer"
                label="Customer Name"
                placeholder="Select customer"
                options={customers}
                className="mb-3"
              />
            </>
          )}

          <CustomSelect
                key={`grade-${category}`}
                control={form.control}
                path="grade"
                label="Grade"
                placeholder="Select Grade"
                options={gradeOtions}
                className="mb-3"
          />

          <FormsInput
            key={`amount-${category}`}
            control={form.control}
            path="amount"
            label="Amount"
            placeholder="Enter amount"
            className="mb-3"
          />

          <FormsInput
            key={`remarks-${category}`}
            control={form.control}
            path="Remarks"
            label="Remarks | Details"
            placeholder="Enter remarks"
            className="mb-5"
          />

          <div className="mb-10 flex justify-between">
            <CustomButton
              label="Reset"
              onClick={() => form.reset()}
              className="btn-primary w-1/3"
            />

            <CustomButton
              label="Submit / Record Sale"
              type="submit"
              className="btn-primary w-1/3"
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
