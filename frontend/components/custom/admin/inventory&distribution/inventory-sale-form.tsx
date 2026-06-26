"use client";

import { Form } from "@/components/ui/form";
import {
  InventoryForm,
  StockDistributionForm,
  YearApiResponse,
} from "@/lib/types/model/type";
import { useForm } from "react-hook-form";
import CustomDatePicker from "../../common/custom-date-picker";
import CustomSelect from "../../common/forms/form-select";
import { Option } from "@/lib/types/model/option";
import FormsInput from "../../common/forms/form-input";
import { Button } from "@/components/ui/button";
import CustomButton from "../../common/custom-button";
import { useEffect, useRef, useState } from "react";
import { createCarryOver } from "@/lib/server-actions/admin/create-carry-over-client";
import { createIncoming } from "@/lib/server-actions/admin/create-incoming-client";
import { createIssued } from "@/lib/server-actions/admin/create-issued-client";
import { useZoneForm } from "@/app/(protected)/admin/(modules)/zone-form-management/zone-form-context";
import { useInventory } from "@/app/(protected)/admin/(modules)/inventory-distribution/inventory-context";
import { useParams, useRouter } from "next/navigation";
import ApiErrorUI from "../../common/error-handle";

const categoryOptions: Option[] = [
  { id: "carry-over", value: "Carry Over" },
  { id: "incoming", value: "Incoming" },
  { id: "issued", value: "Issued" },
];

const gradeOtions: Option[] = [
  { id: "A_PLUS", value: "grade A +" },
  { id: "A", value: "grade A" },
  { id: "B", value: "grade B" },
  { id: "C", value: "grade C" },
  { id: "D_PLUS", value: "grade D +" },
  { id: "D", value: "grade D" },
];

export default function InventorySaleForm({
  years,
  plantationAreaOptions,
  customers,
}: {
  years: YearApiResponse;
  plantationAreaOptions: Option[];
  customers: Option[];
}) {
  const router = useRouter();
  const params = useParams();
  const year = params.year;

  const plantationYearOptions: Option[] = years.years.map((year) => ({
    id: String(year),
    value: String(year),
  }));

  const [error, setError] = useState<string | null>(null);

  const form = useForm<InventoryForm>({
    defaultValues: {
      category: undefined,
      date: undefined,
      plantationYear: undefined,
      plantationArea: undefined,
      numberOfPods: "",
      pricePerGram: "",
      customer: "",
      amount: "",
      Remarks: "",
    },
  });

  const category = form.watch("category");

  const previousCategory = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!category) return;

    if (previousCategory.current && previousCategory.current !== category) {
      form.reset({
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
      });
    }

    previousCategory.current = category;
  }, [category, form]);

  const onSubmit = async (data: InventoryForm) => {
    console.log(data);

    const reformData: StockDistributionForm = {
      year: Number(year),
      production_year: Number(data.plantationYear),
      warehouse_id: Number(data.plantationArea),
      customer_id: Number(data.customer),
      grade: data.grade,
      price_per_gram: data.pricePerGram ? Number(data.pricePerGram) : undefined,
      total_grams: Number(data.amount),
      total_pods: Number(data.numberOfPods),
      details: data.Remarks,
      recorded_date: data.date,
    };

    console.log("ReformData : ", reformData);

    try {
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

      if (result.success === false) {
        setError(result.message);
        return;
      }

      console.log("API result:", result);
      router.replace(`/admin/inventory-distribution/${year}/history`);
    } catch (error) {
      setError("Cannot connect to server");
    }
  };

  return (
    <>
      <ApiErrorUI message={error} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mx-auto w-full max-w-7xl rounded-xl bg-white p-8 shadow">
            {" "}
            <div className="mx-auto mb-6 w-full max-w-7xl overflow-hidden rounded-xl bg-white shadow">
              {/* Header */}
              <div className="bg-primary px-8 py-6 text-white">
                <h2 className="text-3xl font-bold">Inventory Sale Record</h2>

                <p className="mt-1 text-sm text-white/90">
                  Record inventory movement for carry over, incoming stock, or
                  issued stock.
                </p>
              </div>
            </div>
            {/* General Information */}
            <div className="mb-6">
              <h3 className="font-md mb-4 text-lg">General Information</h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <CustomDatePicker
                  key={`date-${category}`}
                  control={form.control}
                  path="date"
                  label="Date"
                  placeholder="Pick a date"
                />

                <CustomSelect
                  control={form.control}
                  path="category"
                  label="Category"
                  placeholder="Select category"
                  options={categoryOptions}
                />
              </div>
            </div>
            {/* Plantation Information */}
            <div className="mb-6 border-t pt-6">
              <h3 className="font-md mb-4 text-lg">Plantation Information</h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <CustomSelect
                  key={`year-${category}`}
                  control={form.control}
                  path="plantationYear"
                  label="Plantation Year"
                  placeholder="Select year"
                  options={plantationYearOptions}
                />

                <CustomSelect
                  key={`area-${category}`}
                  control={form.control}
                  path="plantationArea"
                  label="Plantation Area"
                  placeholder="Select area"
                  options={plantationAreaOptions}
                />
              </div>
            </div>
            {/* Product Information */}
            <div className="mb-6 border-t pt-6">
              <h3 className="font-md mb-4 text-lg">Product Information</h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormsInput
                  key={`pods-${category}`}
                  control={form.control}
                  path="numberOfPods"
                  label="Number of Pods"
                  placeholder="Enter number of pods"
                />

                <CustomSelect
                  key={`grade-${category}`}
                  control={form.control}
                  path="grade"
                  label="Grade"
                  placeholder="Select Grade"
                  options={gradeOtions}
                />

                <FormsInput
                  key={`amount-${category}`}
                  control={form.control}
                  path="amount"
                  label="Amount"
                  placeholder="Enter amount"
                />

                {category === "issued" && (
                  <FormsInput
                    key={`price-${category}`}
                    control={form.control}
                    path="pricePerGram"
                    label="Price per Gram"
                    placeholder="Enter price per gram"
                  />
                )}
              </div>
            </div>
            {/* Customer Information */}
            {category === "issued" && (
              <div className="mb-6 border-t pt-6">
                <h3 className="font-md mb-4 text-lg">Customer Information</h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <CustomSelect
                    key={`customer-${category}`}
                    control={form.control}
                    path="customer"
                    label="Customer Name"
                    placeholder="Select customer"
                    options={customers}
                  />
                </div>
              </div>
            )}
            {/* Additional Details */}
            <div className="border-t pt-6">
              <h3 className="font-md mb-4 text-lg">Additional Details</h3>

              <FormsInput
                key={`remarks-${category}`}
                control={form.control}
                path="Remarks"
                label="Remarks / Details"
                placeholder="Enter remarks"
              />
            </div>
            {/* Actions */}
            <div className="mt-8 flex justify-end gap-3">
              <CustomButton
                label="Reset"
                onClick={() => form.reset()}
                className="text-primary border-primary w-32 border bg-white hover:bg-gray-300"
              />

              <CustomButton
                label="Record Sale"
                type="submit"
                className="w-40"
              />
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
