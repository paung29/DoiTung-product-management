"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Form } from "@/components/ui/form";

import FormsInput from "../../../common/forms/form-input";
import EditButton from "@/components/custom/common/edit-button";
import ApiErrorUI from "@/components/custom/common/error-handle";

import { YearTableDataType } from "./year-table";
import { YearNameFormType } from "@/lib/types/model/type";
import { updateYearName } from "@/lib/server-actions/admin/update-year-name-client";

type EditYearFormType = {
  year: number;
  yearName: number;
};


type EditYearButtonProps = {
  yearData: YearTableDataType;
};

function EditYearButton({ yearData }: EditYearButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<EditYearFormType>({
    defaultValues: {
      year: Number(yearData.year),
      yearName: Number(yearData.year),
    },
  });

  const handleSubmit = async (data: EditYearFormType) => {
    setError(null);

    try {
      const reformData: YearNameFormType = {
        year: data.year,
        yearName: Number(data.yearName),
      };

      const response = await updateYearName(reformData);

      // Keep the dialog open and surface the error (e.g. "year already exists").
      if (response?.success === false) {
        setError(response.message ?? "Failed to update year.");
        return;
      }

      setOpen(false);
      router.refresh();
    } catch {
      setError("Failed to connect to server. Please try again.");
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    // Reset the form and clear any error whenever the dialog closes.
    if (!nextOpen) {
      setError(null);
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <EditButton />
      </DialogTrigger>
      <DialogContent className="bg-soft-secondary border-primary sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit Year</DialogTitle>
        </DialogHeader>
        <div className="mb-4 flex items-start gap-2 rounded-md border border-amber-300 bg-amber-50 p-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-600" />
          <p className="text-sm text-amber-700">
            This action is intended only for correcting mistakenly entered
            years. Changing an existing year may affect related forms and
            records.
          </p>
        </div>

        <ApiErrorUI message={error} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              <FormsInput
                inputClassName="bg-white"
                control={form.control}
                path="yearName"
                label="Year"
                type="number"
                placeholder="Eg: 2025"
              />
            </FieldGroup>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit">Update Year</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditYearButton;
