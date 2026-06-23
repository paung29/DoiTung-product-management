"use client";

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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Edit } from "lucide-react";

import FormsInput from "../../../common/forms/form-input";
import CustomSelect from "../../../common/forms/form-select";
import CustomButton from "@/components/custom/common/custom-button";

import { PodTableDataType } from "./form/pod-table";
import { PodCreateForm } from "@/lib/types/model/type";
import { updatePod } from "@/lib/server-actions/update-pod-client";
import { useParams, useRouter } from "next/navigation";
import ApiErrorUI from "@/components/custom/common/error-handle";

export function EditPodButton({ podData }: { podData: PodTableDataType }) {

  const params = useParams();
  const router = useRouter();
  const zoneId = params.zoneId

  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = React.useState(false);

  const form = useForm<PodTableDataType>({
    mode: "onChange",
    defaultValues: {
      recordedDate: podData.recordedDate || "",
      poleNo: podData.poleNo || "",
      clusterId: podData.clusterId || "",
      numberOfPod: podData.numberOfPod || 0,
      lostPods: podData.lostPods || 0,
      remainingPod: podData.remainingPod || 0,
      condition: podData.condition || "",
      recordedBy: podData.recordedBy || "",
    },
  });

  React.useEffect(() => {
    if (open) {
      form.reset({
        recordedDate: podData.recordedDate,
        poleNo: podData.poleNo,
        clusterId: podData.clusterId,
        numberOfPod: podData.numberOfPod,
        lostPods: podData.lostPods,
        remainingPod: podData.remainingPod,
        condition: podData.condition,
        recordedBy: podData.recordedBy,
      });
    }
  }, [open, form, podData]);

  const onSubmit = async (data: PodTableDataType) => {
    console.log("Updated Pod Form Data:", data);

    const reformData : PodCreateForm = {
      clusterId : Number(data.clusterId),
      lostPods : data.lostPods,
      condition : data.condition
    }

    try{

      const result = await updatePod(reformData)

      if(result.success === false) {
        setError(result.message)
        return
      }

      router.replace(`admin/zone-form-management/zone-details/${zoneId}/pod`)
    }catch(error) {
      setError("failed to connect error")
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CustomButton icon={Edit} type="button" />
      </DialogTrigger>

      <DialogContent className="text-primary-button border-primary border bg-white sm:max-w-3xl">
        <DialogHeader className="bg-primary-button -mx-6 -mt-6 mb-6 rounded-t-lg px-6 py-4">
          <DialogTitle className="text-xl font-bold text-white">
            Edit Pod Form
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
              {/* Date & Pole ID */}
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

              
              </div>

              {/* Pod Data */}
              <div className="mb-4 grid grid-cols-3 gap-4">
                <FormsInput
                  inputClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="numberOfPod"
                  label="Number of Pod"
                  type="number"
                  readonly={true}
                />

                <FormsInput
                  inputClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="lostPods"
                  label="Lost Pods"
                  type="number"
                />

                <FormsInput
                  inputClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="remainingPod"
                  label="Remaining Pod"
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
