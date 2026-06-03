"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import CustomSelect from "../../../common/forms/form-select";
import { useRouter } from "next/navigation";
import { YearApiResponse } from "@/lib/types/model/type";

const yearSchema = z.object({
  year: z.string().min(1, "Please select a year"),
});

type YearFormValues = z.infer<typeof yearSchema>;

type YearPickerDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (year: string) => void;
  defaultYear?: string;
  yearRecords : YearApiResponse
};

export default function YearPickerDialog({
  yearRecords,
  open,
  onClose,
  onConfirm,
  defaultYear = "",
}: YearPickerDialogProps) {

  const yearOptions = yearRecords?.years?.map((year) => ({ id: year, value: year, })) ?? [];

  const form = useForm<YearFormValues>({
    resolver: zodResolver(yearSchema),
    defaultValues: {
      year: defaultYear,
    },
  });
  const router = useRouter();

  if (!open) return null;

  const handleSubmit = (values: YearFormValues) => {
    console.log("Selected year:", values.year);
    onConfirm(values.year);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="text-primary-button text-xl font-semibold">
          Select Year
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mt-4 space-y-4"
          >
            <CustomSelect
              control={form.control}
              path="year"
              options={yearOptions}
              placeholder="Select year"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-primary-button rounded-xl px-4 py-2 text-sm font-medium text-white"
              >
                Confirm
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
