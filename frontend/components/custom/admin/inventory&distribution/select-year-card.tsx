"use client";

import { CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { ActiveYearFrom } from "@/lib/types/model/type";
import { Option } from "@/lib/types/model/option";
import { Form } from "@/components/ui/form";
import CustomSelect from "../../common/forms/form-select";
import { useEffect } from "react";

const years: Option[] = [
  { id: "2026", value: "2026" },
  { id: "2027", value: "2027" },
  { id: "2028", value: "2028" },
  { id: "2029", value: "2029" },
];

export default function SelectYearCard({
  logo,
  title,
  subtitle,
  year,
  onYearChange,
}: {
  logo?: React.ReactNode;
  title: string;
  subtitle?: string;
  year: string;
  onYearChange: (year: string) => void;
}) {
  const form = useForm<ActiveYearFrom>({
    defaultValues: {
      year: "2026",
    },
  });

  useEffect(() => {
    form.reset({ year });
  }, [year, form]);

  return (
    <div className="flex items-center justify-between px-10 py-4">
      <div>
        <CardTitle className="text-lg font-normal text-[#7b4d26]">
          <h1>{title}</h1>
        </CardTitle>
        {subtitle && (
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        )}
      </div>

      <Form {...form}>
        <div>
          <CustomSelect
            control={form.control}
            path="year"
            options={years}
            placeholder="Active Year"
            className="w-64 p-4"
            triggerClassName="bg-white"
            onValueChange={onYearChange}
          />
        </div>
      </Form>
    </div>
  );
}
