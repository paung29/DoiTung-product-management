"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Form } from "@/components/ui/form";

import FormsInput from "../../../common/forms/form-input";

import { HarvestGradingTableDataType } from "./form/harvest-grading-table";

export function EditHarvestGradingButton({
  harvestData,
}: {
  harvestData: HarvestGradingTableDataType;
}) {
  const [open, setOpen] = React.useState(false);

  const form = useForm<HarvestGradingTableDataType>({
    mode: "onChange",
    defaultValues: {
      harvestId: harvestData.harvestId,
      poleNo: harvestData.poleNo,
      recordedDate: harvestData.recordedDate,
      gradeAPlus_noPod: harvestData.gradeAPlus_noPod,
      gradeAPlus_weight: harvestData.gradeAPlus_weight,
      gradeA_noPod: harvestData.gradeA_noPod,
      gradeA_weight: harvestData.gradeA_weight,
      gradeB_noPod: harvestData.gradeB_noPod,
      gradeB_weight: harvestData.gradeB_weight,
      gradeC_noPod: harvestData.gradeC_noPod,
      gradeC_weight: harvestData.gradeC_weight,
      gradeDPlus_noPod: harvestData.gradeDPlus_noPod,
      gradeDPlus_weight: harvestData.gradeDPlus_weight,
      rejectedUndersize_noPod: harvestData.rejectedUndersize_noPod,
      rejectedUndersize_weight: harvestData.rejectedUndersize_weight,
      recordedBy: harvestData.recordedBy,
    },
  });

  React.useEffect(() => {
    if (open) {
      form.reset({
        harvestId: harvestData.harvestId,
        poleNo: harvestData.poleNo,
        recordedDate: harvestData.recordedDate,
        gradeAPlus_noPod: harvestData.gradeAPlus_noPod,
        gradeAPlus_weight: harvestData.gradeAPlus_weight,
        gradeA_noPod: harvestData.gradeA_noPod,
        gradeA_weight: harvestData.gradeA_weight,
        gradeB_noPod: harvestData.gradeB_noPod,
        gradeB_weight: harvestData.gradeB_weight,
        gradeC_noPod: harvestData.gradeC_noPod,
        gradeC_weight: harvestData.gradeC_weight,
        gradeDPlus_noPod: harvestData.gradeDPlus_noPod,
        gradeDPlus_weight: harvestData.gradeDPlus_weight,
        rejectedUndersize_noPod: harvestData.rejectedUndersize_noPod,
        rejectedUndersize_weight: harvestData.rejectedUndersize_weight,
        recordedBy: harvestData.recordedBy,
      });
    }
  }, [open, form, harvestData]);

  const onSubmit = (data: HarvestGradingTableDataType) => {
    console.log("Updated Harvest Data:", data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="p-2">
          <Edit className="text-primary h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="text-primary-button border-primary max-h-[90vh] overflow-y-auto border bg-white sm:max-w-4xl">
        <DialogHeader className="bg-primary-button -mx-6 -mt-6 mb-6 rounded-t-lg px-6 py-4">
          <DialogTitle className="text-xl font-bold text-white">
            Edit Harvest & Grading Form
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <FormsInput
                  control={form.control}
                  path="recordedDate"
                  label="Date"
                  type="date"
                />

                <FormsInput
                  control={form.control}
                  path="poleNo"
                  label="Pole ID"
                />
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <FormsInput
                  control={form.control}
                  path="gradeAPlus_noPod"
                  label="Grade A+ No. Pod"
                  type="number"
                />

                <FormsInput
                  control={form.control}
                  path="gradeAPlus_weight"
                  label="Grade A+ Weight (g)"
                  type="number"
                />
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <FormsInput
                  control={form.control}
                  path="gradeA_noPod"
                  label="Grade A No. Pod"
                  type="number"
                />

                <FormsInput
                  control={form.control}
                  path="gradeA_weight"
                  label="Grade A Weight (g)"
                  type="number"
                />
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <FormsInput
                  control={form.control}
                  path="gradeB_noPod"
                  label="Grade B No. Pod"
                  type="number"
                />

                <FormsInput
                  control={form.control}
                  path="gradeB_weight"
                  label="Grade B Weight (g)"
                  type="number"
                />
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <FormsInput
                  control={form.control}
                  path="gradeC_noPod"
                  label="Grade C No. Pod"
                  type="number"
                />

                <FormsInput
                  control={form.control}
                  path="gradeC_weight"
                  label="Grade C Weight (g)"
                  type="number"
                />
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <FormsInput
                  control={form.control}
                  path="gradeDPlus_noPod"
                  label="Grade D+ No. Pod"
                  type="number"
                />

                <FormsInput
                  control={form.control}
                  path="gradeDPlus_weight"
                  label="Grade D+ Weight (g)"
                  type="number"
                />
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <FormsInput
                  control={form.control}
                  path="rejectedUndersize_noPod"
                  label="Rejected / Undersize No. Pod"
                  type="number"
                />

                <FormsInput
                  control={form.control}
                  path="rejectedUndersize_weight"
                  label="Rejected / Undersize Weight (g)"
                  type="number"
                />
              </div>

              <div className="mb-4">
                <FormsInput
                  control={form.control}
                  path="recordedBy"
                  label="Recorded By"
                />
              </div>
            </FieldGroup>

            <DialogFooter className="mt-8 flex justify-end gap-3">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" className="bg-primary-button text-white">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
