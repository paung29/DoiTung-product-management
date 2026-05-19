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
import CustomSelect from "../../../common/forms/form-select";

export type PodFormData = {
  recordedDate: string;
  poleNo: string;
  clusterId: string;
  totalFlower: number;
  numberOfPod: number;
  lostPods: number;
  remainingPod: number;
  condition: string;
  recordedBy: string;
};

export function EditPodButton({ podData }: { podData: PodFormData }) {
  const form = useForm<PodFormData>({
    mode: "onChange",
    defaultValues: {
      recordedDate: podData.recordedDate || "",
      poleNo: podData.poleNo || "",
      clusterId: podData.clusterId || "",
      totalFlower: podData.totalFlower || 0,
      numberOfPod: podData.numberOfPod || 0,
      lostPods: podData.lostPods || 0,
      remainingPod: podData.remainingPod || 0,
      condition: podData.condition || "",
      recordedBy: podData.recordedBy || "",
    },
  });

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      form.reset({
        recordedDate: podData.recordedDate,
        poleNo: podData.poleNo,
        clusterId: podData.clusterId,
        totalFlower: podData.totalFlower,
        numberOfPod: podData.numberOfPod,
        lostPods: podData.lostPods,
        remainingPod: podData.remainingPod,
        condition: podData.condition,
        recordedBy: podData.recordedBy,
      });
    }
  }, [open, form, podData]);

  const onSubmit = (data: PodFormData) => {
    console.log("Updated Pod Data:", data);
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
            Edit Pod Form
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
            {/* Scrollable form body with extra bottom padding so footer doesn't overlap */}
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

                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormsInput
                    inputClassName="bg-white border-primary-button border rounded-lg"
                    control={form.control}
                    path="clusterId"
                    label="Cluster ID"
                    placeholder="C-001"
                  />
                  <FormsInput
                    inputClassName="bg-white border-primary-button border rounded-lg"
                    control={form.control}
                    path="totalFlower"
                    label="Total Flower"
                    type="number"
                    placeholder="10"
                  />
                </div>

                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormsInput
                    inputClassName="bg-white border-primary-button border rounded-lg"
                    control={form.control}
                    path="numberOfPod"
                    label="Number of Pod"
                    type="number"
                    placeholder="5"
                  />
                  <FormsInput
                    inputClassName="bg-white border-primary-button border rounded-lg"
                    control={form.control}
                    path="lostPods"
                    label="Lost Pods"
                    type="number"
                    placeholder="0"
                  />
                </div>

                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormsInput
                    inputClassName="bg-white border-primary-button border rounded-lg"
                    control={form.control}
                    path="remainingPod"
                    label="Remaining Pod"
                    type="number"
                    placeholder="5"
                  />
                  <div />
                </div>

                <div className="mb-4">
                  <CustomSelect
                    triggerClassName="bg-white border-primary-button border rounded-lg"
                    control={form.control}
                    path="condition"
                    label="Condition"
                    options={[
                      { id: "Good", value: "Good" },
                      { id: "Insect", value: "Insect" },
                      { id: "Rotten", value: "Rotten" },
                    ]}
                    placeholder="Select condition"
                  />
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

            {/* Sticky footer so buttons remain visible */}
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
