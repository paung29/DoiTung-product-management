"use client"

import CustomButton from "@/components/custom/common/custom-button";
import { UpdateCustomerInfoFormData } from "@/lib/types/model/type";
import { useForm } from "react-hook-form";
import { updateCustomerInfo } from "@/lib/server-actions/admin/update-customer-info-client";
import { useRouter } from "next/navigation";
import FormsInput from "../../common/forms/form-input";
import { Form } from "@/components/ui/form";

interface Props {
    id : number
    customerName: string;
    note: string;
    onClose: () => void;
}

export default function CustomerEditModal({
    id,
    customerName,
    note,
    onClose,
}: Props) {

    const router = useRouter();

    const form = useForm<UpdateCustomerInfoFormData>({
        defaultValues : {
            customer_id : id,
            customer_name : customerName,
            note : note
        }
    })

    const onUpdate = async (data: UpdateCustomerInfoFormData) => {

        const reFormData: UpdateCustomerInfoFormData = {
        customer_id: id,
        customer_name: data.customer_name,
        note: data.note,
        };

        const result = await updateCustomerInfo(reFormData);

        console.log(result)

        onClose();
        router.refresh();
    };


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/5"
      onClick={onClose}
    >
      <div
        className="mx-4 w-full max-w-2xl rounded-3xl bg-white p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <Form {...form}>

          <form onSubmit={form.handleSubmit(onUpdate)}>
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Edit Customer
                </h2>
                <p className="mt-2 text-gray-500">
                  Update customer information.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 transition hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="mb-8 space-y-6">
              <FormsInput
                control={form.control}
                path="customer_name"
                label="Company / Organization"
                placeholder="e.g., Premium Vanilla Co."
              />

              <FormsInput
                control={form.control}
                path="note"
                label="Note"
                placeholder="Enter customer notes"
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <CustomButton
                label="Cancel"
                onClick={onClose}
                type="button"
                className="rounded-full bg-gray-200 px-6 py-2 text-gray-700 hover:bg-gray-300"
              />

              <CustomButton
                label="Update"
                type="submit"
                className="rounded-full bg-amber-900 px-6 py-2 hover:bg-amber-950"
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}