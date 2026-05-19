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

export type ClusterFormData = {
  recordedDate: string;
  poleId: string;
  clusterId: string;
  condition: string;
  recordedBy: string;
};

export function EditClusterButton({
  clusterData,
}: {
  clusterData: ClusterFormData;
}) {
  const form = useForm<ClusterFormData>({
    mode: "onChange",
    defaultValues: {
      recordedDate: clusterData.recordedDate || "",
      poleId: clusterData.poleId || "",
      clusterId: clusterData.clusterId || "",
      condition: clusterData.condition || "",
      recordedBy: clusterData.recordedBy || "",
    },
  });

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      form.reset({
        recordedDate: clusterData.recordedDate,
        poleId: clusterData.poleId,
        clusterId: clusterData.clusterId,
        condition: clusterData.condition,
        recordedBy: clusterData.recordedBy,
      });
    }
  }, [open, form, clusterData]);

  const onSubmit = (data: ClusterFormData) => {
    console.log("Updated Cluster Form Data:", data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CustomButton
          label=""
          icon={Edit}
          className="border-primary-button flex h-8 w-8 items-center justify-center rounded-md p-2"
        />
      </DialogTrigger>

      <DialogContent className="text-primary-button border-primary border bg-white sm:max-w-2xl">
        <DialogHeader className="bg-primary-button -mx-6 -mt-6 mb-6 rounded-t-lg px-6 py-4">
          <DialogTitle className="text-xl font-bold text-white">
            Edit Cluster Form
          </DialogTitle>
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-6 text-white hover:opacity-80"
          >
            ✕
          </button>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="px-6 pb-6">
            <FieldGroup>
              {/* First Row: Date and Pole ID */}
              <div className="mb-4 grid grid-cols-2 gap-4">
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
                  path="poleId"
                  label="Pole ID"
                  placeholder="P-001"
                />
              </div>

              {/* Second Row: */}
              <div className="mb-4 grid grid-cols-2 gap-4">
                <FormsInput
                  inputClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="clusterId"
                  label="Cluster ID"
                  placeholder="C-001"
                />

                <div />
              </div>

              {/* Third Row: Condition */}
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

            <DialogFooter className="mt-8 flex justify-end gap-3">
              <DialogClose asChild>
                <CustomButton
                  label="Cancel"
                  className="bg-white text-gray-700 ring-1 ring-gray-200"
                  onClick={() => setOpen(false)}
                />
              </DialogClose>
              <CustomButton
                label="Save Changes"
                type="submit"
                className="bg-primary-button"
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
