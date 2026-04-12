"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import CustomSelect from "../common/forms/form-select";
import { useEffect, useState } from "react";
import { YearApiResponse } from "@/lib/types/model/type";
import { baseUrl } from "@/lib/utl";

const yearSchema = z.object({
  year: z.string().min(1, "Please select a year"),
});

type YearFormValues = z.infer<typeof yearSchema>;

type YearPickerDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (year: string) => void;
  defaultYear?: string;
};

type YearOption = {
  id: string;
  value: string;
};

export default function StaffYearDialog({
  open,
  onClose,
  onConfirm,
  defaultYear = "",
}: YearPickerDialogProps) {
  const [yearOptions, setYearOptions] = useState<YearOption[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<YearFormValues>({
    resolver: zodResolver(yearSchema),
    defaultValues: {
      year: defaultYear,
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (defaultYear) {
      form.setValue("year", defaultYear);
    }
  }, [defaultYear, form]);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${baseUrl}/years/get-all-years`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch years");
        }

        const data: YearApiResponse = await res.json();

        const mappedOptions = data.years
          .sort((a, b) => Number(b) - Number(a))
          .map((year) => ({
            id: year,
            value: year,
          }));

        setYearOptions(mappedOptions);
      } catch (err) {
        console.error("Error fetching years:", err);
        setYearOptions([]);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchYears();
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (values: YearFormValues) => {
    onConfirm(values.year);
    router.replace(`/staff/${values.year}`);
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
              placeholder={loading ? "Loading years..." : "Select year"}
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
                disabled={loading || yearOptions.length === 0}
                className="bg-primary-button rounded-xl px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
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