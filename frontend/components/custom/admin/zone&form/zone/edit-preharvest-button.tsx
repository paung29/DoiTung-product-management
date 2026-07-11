"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

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
import CustomSelect from "../../../common/forms/form-select";
import CustomButton from "@/components/custom/common/custom-button";
import EditButton from "@/components/custom/common/edit-button";

import { PreharvestTableDataType } from "./form/preharvest-table";
import { useParams, useRouter } from "next/navigation";
import { CreatePreHarvestForm } from "@/lib/types/model/type";
import { updatePreHarvestForm } from "@/lib/server-actions/update-pre-harvest-client";
import ApiErrorUI from "@/components/custom/common/error-handle";

export function EditPreharvestButton({
  preharvestData,
}: {
  preharvestData: PreharvestTableDataType;
}) {

  const params = useParams();
  const router = useRouter();
  const zoneId = params.zoneId

  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = React.useState(false);

  const form = useForm<PreharvestTableDataType>({
    mode: "onChange",
    defaultValues: {
      recordedDate: preharvestData.recordedDate || "",
      poleNo: preharvestData.poleNo || "",
      clusterId: preharvestData.clusterId || "",
      gradeARound1: preharvestData.gradeARound1 || 0,
      numberOfPodsRound2: preharvestData.numberOfPodsRound2 || 0,
      lostPodsBeforeHarvest: preharvestData.lostPodsBeforeHarvest || 0,
      podRemoved: preharvestData.podRemoved || 0,
      plantWithPodRemoved: preharvestData.plantWithPodRemoved || 0,
      condition: preharvestData.condition || "",
      recordedBy: preharvestData.recordedBy || "",
    },
  });

  React.useEffect(() => {
    if (open) {
      form.reset({
        recordedDate: preharvestData.recordedDate,
        poleNo: preharvestData.poleNo,
        clusterId: preharvestData.clusterId,
        gradeARound1: preharvestData.gradeARound1,
        numberOfPodsRound2: preharvestData.numberOfPodsRound2,
        lostPodsBeforeHarvest: preharvestData.lostPodsBeforeHarvest,
        podRemoved: preharvestData.podRemoved,
        plantWithPodRemoved: preharvestData.plantWithPodRemoved,
        condition: preharvestData.condition,
        recordedBy: preharvestData.recordedBy,
      });
    }
  }, [open, form, preharvestData]);

  const onSubmit = async (data: PreharvestTableDataType) => {
    console.log("Updated Preharvest Data:", data);

    const reformData : CreatePreHarvestForm = {
      clusterId : Number(data.clusterId),
      numberPodsSecondRound : Number(data.numberOfPodsRound2),
      removedPods : Number(data.podRemoved),
      plantsRemoved : Number(data.plantWithPodRemoved),
      condition : data.condition
    }

    try{
      const result = await updatePreHarvestForm(reformData)

      if(result.success === false) {
        setError(result.message)
        return
      }

      router.replace(`/admin/zone-form-management/zone-details/${zoneId}/preharvest`)

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

      <DialogContent className="border-primary max-h-[90vh] w-[95vw] max-w-2xl overflow-y-auto bg-white">
        <DialogHeader className="bg-primary-button -mx-6 -mt-6 mb-6 rounded-t-lg px-6 py-4">
          <DialogTitle className="text-xl font-bold text-white">
            Edit Pre-Harvest Form
          </DialogTitle>

          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-6 text-white hover:opacity-80"
          >
            ✕
          </button>
        </DialogHeader>

        <ApiErrorUI message={error}/>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="px-6 pb-6">
            <FieldGroup>
              {/* Date & Pole */}
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormsInput
                  inputClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="recordedDate"
                  label="Date"
                  readonly={true}
                />

                <FormsInput
                  inputClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="poleNo"
                  label="Pole ID"
                  readonly={true}
                />
              </div>

              {/* Cluster & Grade A */}
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormsInput
                  inputClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="clusterId"
                  label="Cluster ID"
                  readonly={true}
                />

                <FormsInput
                  inputClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="gradeARound1"
                  label="Grade A (Round 1)"
                  type="number"
                  readonly={true}
                />
              </div>

              {/* Round 2 & Lost Pods */}
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormsInput
                  inputClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="numberOfPodsRound2"
                  label="Number of Pods (Round 2)"
                  type="number"
                />

                <FormsInput
                  inputClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="lostPodsBeforeHarvest"
                  label="Lost Pods Before Harvest"
                  type="number"
                  readonly={true}
                />
              </div>

              {/* Removed Pods */}
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormsInput
                  inputClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="podRemoved"
                  label="Pod Removed"
                  type="number"
                />

                <FormsInput
                  inputClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="plantWithPodRemoved"
                  label="Plant With Pod Removed"
                  type="number"
                />
              </div>

              {/* Condition */}
              <div className="mb-4">
                <CustomSelect
                  triggerClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="condition"
                  label="Condition"
                  options={[
                    { id: "GOOD", value: "Good" },
                    { id: "INSECT", value: "Insect" },
                    { id: "ROTTEN", value: "Rotten" },
                  ]}
                  placeholder="Select condition"
                />
              </div>

              {/* Recorded By */}
              <div className="mb-4">
                <FormsInput
                  inputClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="recordedBy"
                  label="Recorded By"
                  readonly={true}
                />
              </div>
            </FieldGroup>

            <DialogFooter className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
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
