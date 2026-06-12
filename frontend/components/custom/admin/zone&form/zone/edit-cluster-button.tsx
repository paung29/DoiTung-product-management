"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Edit, Icon } from "lucide-react";
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

import { ClusterTableDataType } from "./form/cluster-table";
import CustomButton from "@/components/custom/common/custom-button";

type ClusterFormData = {
  clusterId: number;
  clusterNo: number;
  poleNo: number;
  recordedBy: string;
  recordedDate: string;
  condition: string;
};

export function EditClusterButton({
  clusterData,
}: {
  clusterData: ClusterTableDataType;
}) {
  const [open, setOpen] = React.useState(false);

  const form = useForm<ClusterFormData>({
    mode: "onChange",
    defaultValues: {
      clusterId: clusterData.clusterId,
      clusterNo: clusterData.clusterNo,
      poleNo: clusterData.poleNo,
      recordedBy: clusterData.recordedBy,
      recordedDate: clusterData.recordedDate,
      condition: clusterData.condition,
    },
  });

  React.useEffect(() => {
    if (open) {
      form.reset({
        clusterId: clusterData.clusterId,
        clusterNo: clusterData.clusterNo,
        poleNo: clusterData.poleNo,
        recordedBy: clusterData.recordedBy,
        recordedDate: clusterData.recordedDate,
        condition: clusterData.condition,
      });
    }
  }, [open, form, clusterData]);

  const onSubmit = (data: ClusterFormData) => {
    console.log("Updated Cluster Data:", data);

    // Call update API

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CustomButton icon={Edit} type="button" />
      </DialogTrigger>

      <DialogContent className="border-primary bg-white sm:max-w-2xl">
        <DialogHeader className="bg-primary-button -mx-6 -mt-6 mb-6 rounded-t-lg px-6 py-4">
          <DialogTitle className="text-xl font-bold text-white">
            Edit Cluster Form
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="px-6 pb-6">
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
                  type="number"
                />
              </div>

              <div className="mb-4">
                <FormsInput
                  control={form.control}
                  path="clusterNo"
                  label="Cluster ID"
                  type="number"
                />
              </div>

              <div className="mb-4">
                <CustomSelect
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
                  control={form.control}
                  path="recordedBy"
                  label="Recorded By"
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
                type="button"
                className="bg-primary-button text-white"
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
