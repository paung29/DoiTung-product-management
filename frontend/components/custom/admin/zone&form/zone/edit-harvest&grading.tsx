"use client";

import CustomButton from "../../../common/custom-button";
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
import React from "react";
import { useForm } from "react-hook-form";
import FormsInput from "../../../common/forms/form-input";
import { Edit } from "lucide-react";

export type HarvestGradingFormData = {
  recordedDate: string;
  poleNo: string;
  gradeAPlus_noPod: number;
  gradeAPlus_weight: number;
  gradeA_noPod: number;
  gradeA_weight: number;
  gradeB_noPod: number;
  gradeB_weight: number;
  gradeC_noPod: number;
  gradeC_weight: number;
  gradeDPlus_noPod: number;
  gradeDPlus_weight: number;
  rejected_noPod: number;
  rejected_weight: number;
  recordedBy: string;
};

export function EditHarvestGradingButton({
  harvestData,
}: {
  harvestData: HarvestGradingFormData;
}) {
  const form = useForm<HarvestGradingFormData>({
    mode: "onChange",
    defaultValues: {
      recordedDate: harvestData.recordedDate || "",
      poleNo: harvestData.poleNo || "",
      gradeAPlus_noPod: harvestData.gradeAPlus_noPod || 0,
      gradeAPlus_weight: harvestData.gradeAPlus_weight || 0,
      gradeA_noPod: harvestData.gradeA_noPod || 0,
      gradeA_weight: harvestData.gradeA_weight || 0,
      gradeB_noPod: harvestData.gradeB_noPod || 0,
      gradeB_weight: harvestData.gradeB_weight || 0,
      gradeC_noPod: harvestData.gradeC_noPod || 0,
      gradeC_weight: harvestData.gradeC_weight || 0,
      gradeDPlus_noPod: harvestData.gradeDPlus_noPod || 0,
      gradeDPlus_weight: harvestData.gradeDPlus_weight || 0,
      rejected_noPod: harvestData.rejected_noPod || 0,
      rejected_weight: harvestData.rejected_weight || 0,
      recordedBy: harvestData.recordedBy || "",
    },
  });

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      form.reset({
        recordedDate: harvestData.recordedDate,
        poleNo: harvestData.poleNo,
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
        rejected_noPod: harvestData.rejected_noPod,
        rejected_weight: harvestData.rejected_weight,
        recordedBy: harvestData.recordedBy,
      });
    }
  }, [open, form, harvestData]);

  const onSubmit = (data: HarvestGradingFormData) => {
    console.log("Updated Harvest & Grading Data:", data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CustomButton label="" icon={Edit} className="p-2" />
      </DialogTrigger>

      <DialogContent className="text-primary-button border-primary max-h-[80vh] overflow-hidden border bg-white sm:max-w-3xl">
        <DialogHeader className="bg-primary-button -mx-6 -mt-6 mb-6 rounded-t-lg px-6 py-4">
          <DialogTitle className="text-xl font-bold text-white">
            Edit Harvest & Grading Form
          </DialogTitle>
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-6 text-white hover:opacity-80"
          >
            ✕
          </button>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col px-6 pb-6"
          >
            {/* Make the main form body scrollable when the dialog is tall */}
            <div className="max-h-[56vh] overflow-y-auto pr-2 pb-20 sm:max-h-[64vh]">
              <FieldGroup>
                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormsInput
                    inputClassName="bg-white border-primary-button border rounded-lg"
                    control={form.control}
                    path="recordedDate"
                    label="Date"
                    type="date"
                    placeholder="Select date"
                  />
                  <FormsInput
                    inputClassName="bg-white border-primary-button border rounded-lg"
                    control={form.control}
                    path="poleNo"
                    label="Pole ID"
                    placeholder="P-001"
                  />
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <FormsInput
                      inputClassName="bg-white border-primary-button border rounded-lg"
                      control={form.control}
                      path="gradeAPlus_noPod"
                      label="Grade A+ No. Pod"
                      type="number"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <FormsInput
                      inputClassName="bg-white border-primary-button border rounded-lg"
                      control={form.control}
                      path="gradeAPlus_weight"
                      label="Grade A+ Weight (g)"
                      type="number"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <FormsInput
                      inputClassName="bg-white border-primary-button border rounded-lg"
                      control={form.control}
                      path="gradeA_noPod"
                      label="Grade A No. Pod"
                      type="number"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <FormsInput
                      inputClassName="bg-white border-primary-button border rounded-lg"
                      control={form.control}
                      path="gradeA_weight"
                      label="Grade A Weight (g)"
                      type="number"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <FormsInput
                      inputClassName="bg-white border-primary-button border rounded-lg"
                      control={form.control}
                      path="gradeB_noPod"
                      label="Grade B No. Pod"
                      type="number"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <FormsInput
                      inputClassName="bg-white border-primary-button border rounded-lg"
                      control={form.control}
                      path="gradeB_weight"
                      label="Grade B Weight (g)"
                      type="number"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <FormsInput
                      inputClassName="bg-white border-primary-button border rounded-lg"
                      control={form.control}
                      path="gradeC_noPod"
                      label="Grade C No. Pod"
                      type="number"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <FormsInput
                      inputClassName="bg-white border-primary-button border rounded-lg"
                      control={form.control}
                      path="gradeC_weight"
                      label="Grade C Weight (g)"
                      type="number"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <FormsInput
                      inputClassName="bg-white border-primary-button border rounded-lg"
                      control={form.control}
                      path="gradeDPlus_noPod"
                      label="Grade D+ No. Pod"
                      type="number"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <FormsInput
                      inputClassName="bg-white border-primary-button border rounded-lg"
                      control={form.control}
                      path="gradeDPlus_weight"
                      label="Grade D+ Weight (g)"
                      type="number"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <FormsInput
                      inputClassName="bg-white border-primary-button border rounded-lg"
                      control={form.control}
                      path="rejected_noPod"
                      label="Rejected / Undersize No. Pod"
                      type="number"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <FormsInput
                      inputClassName="bg-white border-primary-button border rounded-lg"
                      control={form.control}
                      path="rejected_weight"
                      label="Rejected / Undersize Weight (g)"
                      type="number"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <FormsInput
                    inputClassName="bg-white border-primary-button border rounded-lg"
                    control={form.control}
                    path="recordedBy"
                    label="Recorded By"
                    placeholder="Staff A"
                  />
                </div>
              </FieldGroup>
            </div>

            <DialogFooter className="sticky right-0 bottom-0 left-0 flex justify-end gap-3 border-t bg-white px-6 py-4">
              <DialogClose asChild>
                <CustomButton
                  label="Cancel"
                  className="bg-white text-gray-600 ring-1 ring-gray-200"
                />
              </DialogClose>
              <CustomButton
                label="Save Changes"
                type="submit"
                className="bg-primary-button font-semibold text-white"
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
