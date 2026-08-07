"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import EditButton from "@/components/custom/common/edit-button";
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
import CustomButton from "@/components/custom/common/custom-button";
import { useParams, useRouter } from "next/navigation";
import { HarvestGradingRecordInput } from "@/lib/types/model/type";
import { updateHarvestGrading } from "@/lib/server-actions/update-harvest-grading-client";
import ApiErrorUI from "@/components/custom/common/error-handle";

export function EditHarvestGradingButton({
  harvestData,
}: {
  harvestData: HarvestGradingTableDataType;
}) {

  const params = useParams();
  const router = useRouter();
  const zoneId = params.zoneId

  const [error, setError] = useState<string | null>(null);
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

  const onSubmit = async (data: HarvestGradingTableDataType) => {
    console.log("Updated Harvest Data:", data);

    const reformData : HarvestGradingRecordInput = {
      poleId: Number(data.poleNo),
      gradeAPlusCount: Number(data.gradeAPlus_noPod),
      gradeAPlusWeight: Number(data.gradeAPlus_weight),
      gradeACount: Number(data.gradeA_noPod),
      gradeAWeight:  Number(data.gradeA_weight),
      gradeBCount:  Number(data.gradeB_noPod),
      gradeBWeight: Number(data.gradeB_weight),
      gradeCCount: Number(data.gradeC_noPod),
      gradeCWeight: Number(data.gradeC_weight),
      gradeDPlusCount: Number(data.gradeDPlus_noPod),
      gradeDPlusWeight: Number(data.gradeDPlus_weight),
      undersizedCount: Number(data.rejectedUndersize_noPod),
      undersizedWeight: Number(data.rejectedUndersize_weight),
      rottenCount: Number(data.rottenCount),
      rottenWeight: Number(data.rottenWeight)
    }

    try{

      const result = await updateHarvestGrading(reformData)

      if(result.success === false) {
        setError(result.message)
        return
      }

      router.replace(`/admin/zone-form-management/zone-details/${zoneId}/harvest-grading`)

    }catch(error) {
      setError("failed to connect server")
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <EditButton />
      </DialogTrigger>

      <DialogContent className="text-primary-button border-primary max-h-[90vh] overflow-y-auto border bg-white sm:max-w-4xl">
        <DialogHeader className="bg-primary-button -mx-6 -mt-6 mb-6 rounded-t-lg px-6 py-4">
          <DialogTitle className="text-xl font-bold text-white">
            Edit Harvest & Grading Form
          </DialogTitle>
        </DialogHeader>

        <ApiErrorUI message={error}/>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <FormsInput
                  control={form.control}
                  path="recordedDate"
                  label="Date"
                  readonly={true}
                />

                <FormsInput
                  control={form.control}
                  path="poleNo"
                  label="Pole ID"
                  readonly={true}
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
                  readonly={true}
                />
              </div>
            </FieldGroup>

            <DialogFooter className="mt-8 flex justify-end gap-3">
              <DialogClose asChild>
                <CustomButton
                  label="Cancel"
                  type="button"
                  className="border-input bg-background hover:bg-accent border text-black"
                />
              </DialogClose>

              <CustomButton
                label="Save Changes"
                type="submit"
                className="bg-primary-button text-white"
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
