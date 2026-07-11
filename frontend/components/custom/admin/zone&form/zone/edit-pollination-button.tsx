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

import { PollinationTableDataType } from "./form/pollination-table";
import { useParams, useRouter } from "next/navigation";
import { PollinationRecordingFormType } from "@/lib/types/model/type";
import { updatePod } from "@/lib/server-actions/update-pod-client";
import { updatePollination } from "@/lib/server-actions/update-pollination-client";
import ApiErrorUI from "@/components/custom/common/error-handle";

export function EditPollinationButton({
  pollinationData,
}: {
  pollinationData: PollinationTableDataType;
}) {

  const params = useParams();
  const router = useRouter();
  const zoneId = params.zoneId

  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = React.useState(false);

  const form = useForm<PollinationTableDataType>({
    mode: "onChange",
    defaultValues: {
      recordedDate: pollinationData.recordedDate || "",
      poleNo: pollinationData.poleNo || "",
      clusterId: pollinationData.clusterId || "",
      totalFlower: pollinationData.totalFlower || 0,
      numberOfPod: pollinationData.numberOfPod || 0,
      unsuccessfulPollination: pollinationData.unsuccessfulPollination || 0,
      goodFlowers: pollinationData.goodFlowers || 0,
      badDroppedFlowers: pollinationData.badDroppedFlowers || 0,
      condition: pollinationData.condition || "",
      recordedBy: pollinationData.recordedBy || "",
    },
  });

  React.useEffect(() => {
    if (open) {
      form.reset({
        recordedDate: pollinationData.recordedDate,
        poleNo: pollinationData.poleNo,
        clusterId: pollinationData.clusterId,
        totalFlower: pollinationData.totalFlower,
        numberOfPod: pollinationData.numberOfPod,
        unsuccessfulPollination: pollinationData.unsuccessfulPollination,
        goodFlowers: pollinationData.goodFlowers,
        badDroppedFlowers: pollinationData.badDroppedFlowers,
        condition: pollinationData.condition,
        recordedBy: pollinationData.recordedBy,
      });
    }
  }, [open, form, pollinationData]);

  const onSubmit = async (data: PollinationTableDataType) => {
    console.log("Updated Pollination Data:", data);

    const reformData : PollinationRecordingFormType = {
      clusterId : Number(data.clusterId),
      numberPods : Number(data.numberOfPod),
      unsuccessfulPollination : Number(data.unsuccessfulPollination),
      condition : data.condition
    }

    try{

      const result = await updatePollination(reformData)
      
      if(result.success === false) {
        setError(result.message)
        return
      }

      router.replace(`/admin/zone-form-management/zone-details/${zoneId}/pollination`)

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

      <DialogContent className="text-primary-button border-primary border-primary max-h-[90vh] w-[95vw] max-w-2xl overflow-y-auto border bg-white">
        <DialogHeader className="bg-primary-button -mx-6 -mt-6 mb-6 rounded-t-lg px-6 py-4">
          <DialogTitle className="text-xl font-bold text-white">
            Edit Pollination Form
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
              <div className="mb-4 grid grid-cols-2 gap-4">
                <FormsInput
                  inputClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="recordedDate"
                  label="Date"
                  type="date"
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

              {/* Cluster & Total Flower */}
              <div className="mb-4 grid grid-cols-2 gap-4">
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
                  path="totalFlower"
                  label="Total Flower"
                  type="number"
                  readonly={true}
                />
              </div>

              {/* Pollination Data */}
              <div className="mb-4 grid grid-cols-2 gap-4">
                <FormsInput
                  inputClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="numberOfPod"
                  label="Number of Pod"
                  type="number"
                />

                <FormsInput
                  inputClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="unsuccessfulPollination"
                  label="Unsuccessful Pollination"
                  type="number"
                />
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <FormsInput
                  inputClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="goodFlowers"
                  label="Good Flowers"
                  type="number"
                  readonly={true}
                />

                <FormsInput
                  inputClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="badDroppedFlowers"
                  label="Bad / Dropped Flowers"
                  type="number"
                  readonly={true}
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
                    { id: "ROTTON", value: "Rotten" },
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
