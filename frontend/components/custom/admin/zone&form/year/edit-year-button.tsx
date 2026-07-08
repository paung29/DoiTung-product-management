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

import { YearTableDataType } from "./year-table";
import { YearSettingFormType } from "@/lib/types/model/type";
import { updateYearSetting } from "@/lib/server-actions/admin/update-year-setting-client";

type EditYearFormType = {
  year: number;
};

type EditYearButtonProps = {
  yearData: YearTableDataType;
};

function EditYearButton({ yearData }: EditYearButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<EditYearFormType>({
    defaultValues: {
      year: Number(yearData.year),
    },
  });

  const handleSubmit = async (data: EditYearFormType) => {
    try {
      const reformData: YearSettingFormType = {
        year: data.year,
      };

      console.log("Updating year:", reformData);

      const response = await updateYearSetting(reformData);

      console.log(response);

      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error("Failed to update year:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              <FormsInput
                inputClassName="bg-white"
                control={form.control}
                path="year"
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
