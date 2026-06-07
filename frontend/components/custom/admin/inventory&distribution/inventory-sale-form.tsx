"use client";

import { Form } from "@/components/ui/form";
import { InventoryForm, YearApiResponse } from "@/lib/types/model/type";
import { useForm } from "react-hook-form";
import CustomDatePicker from "../../common/custom-date-picker";
import CustomSelect from "../../common/forms/form-select";
import { Option } from "@/lib/types/model/option";
import FormsInput from "../../common/forms/form-input";
import { Button } from "@/components/ui/button";
import CustomButton from "../../common/custom-button";
import { useEffect, useRef } from "react";

const categoryOptions: Option[] = [
  { id: "carry-over", value: "Carry Over" },
  { id: "incoming", value: "Incoming" },
  { id: "issued", value: "Issued" },
];


// const plantationAreaOptions: Option[] = [
//   { id: "PM", value: "PM Phamee" },
//   { id: "RD", value: "RD Research" },
//   { id: "SE", value: "SE Building 1" },
// ];

export default function InventorySaleForm({years, plantationAreaOptions, customers} : {years : YearApiResponse, plantationAreaOptions : Option[] , customers : Option[]}) {

  const plantationYearOptions: Option[] = years.years.map((year) => ({
    id: year,
    value: year,
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
      form.reset();
    }

    previousCategory.current = category;

}, [category, form]);

  const onSubmit = (data: InventoryForm) => {
    console.log("Form data:", data);
    form.reset()
  };

  return (
    <Form {...form}>
      <form>
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
              onClick={form.handleSubmit(onSubmit)}
              className="btn-primary w-1/3"
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
