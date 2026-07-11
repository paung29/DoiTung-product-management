"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomButton from "@/components/custom/common/custom-button";
import FormsInput from "@/components/custom/common/forms/form-input";
import { Form } from "@/components/ui/form";
import { createCustomer } from "@/lib/server-actions/admin/create-customer-client";
import { useParams, useRouter } from "next/navigation";

const customerSchema = z.object({
  company: z
    .string()
    .min(1, "Company name is required")
    .min(3, "Company name must be at least 3 characters"),
  note: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length <= 500,
      "Note must be 500 characters or less",
    ),
});

type CustomerFormData = z.infer<typeof customerSchema>;

export type CustomerFormSubmit = {
  customer_name: string;
  note: string;
};

export default function AddCustomerButton() {
  const router = useRouter();
  const params = useParams();
  const year = params.year as string;

  const [isOpen, setIsOpen] = useState(false);
  const [customers, setCustomers] = useState<CustomerFormData[]>([]);

  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      company: "",
      note: "",
    },
  });

  const handleSave = async (data: CustomerFormData) => {
    setCustomers([...customers, data]);
    console.log("Customer saved:", data);

    const reformData: CustomerFormSubmit = {
      customer_name: data.company,
      note: String(data.note),
    };

    const result = await createCustomer(reformData);
    console.log(result);

    form.reset();
    setIsOpen(false);
    router.replace(`/admin/inventory-distribution/${year}/customer`);
  };

  const handleCancel = () => {
    form.reset();
    setIsOpen(false);
  };

  return (
    <>
      {/* Add Customer Button */}
      <CustomButton
        label="+ Add Customer"
        onClick={() => setIsOpen(true)}
        className="bg-primary hover:bg-primary/90 w-40 p-6 text-white"
      />

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/5"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal */}
          <div
            className="mx-4 w-full max-w-2xl rounded-3xl bg-white p-8 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Add New Customer
                </h2>
                <p className="mt-2 text-gray-500">
                  Fill in customer information to add.
                </p>
              </div>

              <button
                onClick={handleCancel}
                className="text-gray-400 transition hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSave)}
                className="mb-8 space-y-6"
              >
                {/* Company/Organization Field */}
                <FormsInput
                  control={form.control}
                  path="company"
                  label="Company / Organization"
                  placeholder="e.g., Premium Vanilla Co."
                  inputClassName="rounded-xl"
                />

                {/* Note Field */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Note
                  </label>
                  <textarea
                    {...form.register("note")}
                    placeholder="Enter customer notes"
                    rows={4}
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-600 focus:outline-none"
                  />
                  {form.formState.errors.note && (
                    <p className="mt-1 text-sm text-red-500">
                      {form.formState.errors.note.message}
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-4 pt-4">
                  <CustomButton
                    label="Cancel"
                    onClick={handleCancel}
                    type="button"
                    className="rounded-full bg-gray-200 px-6 py-2 text-gray-700 hover:bg-gray-300"
                  />
                  <CustomButton
                    label="Save"
                    type="submit"
                    className="rounded-full bg-amber-900 px-6 py-2 hover:bg-amber-950"
                  />
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}
