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
import FormsInput from "../../../common/forms/form-input";
import CustomSelect from "../../../common/forms/form-select";
import EditButton from "@/components/custom/common/edit-button";
import { FlowerTableDataType } from "./form/flower-table";
import CustomButton from "@/components/custom/common/custom-button";
import { useParams, useRouter } from "next/navigation";
import { FlowerRecordingFormType } from "@/lib/types/model/type";
import { updateFlower } from "@/lib/server-actions/update-flower-client";
import ApiErrorUI from "@/components/custom/common/error-handle";

type FlowerFormData = {
  recordedDate: string;
  poleNo: string;
  clusterId: string;
  totalFlower: number;
  condition: string;
  recordedBy: string;
};

export function EditFlowerButton({
  flowerData,
}: {
  flowerData: FlowerTableDataType;
}) {

  const params = useParams();
  const router = useRouter();
  
  const zoneId = params.zoneId

  const [error, setError] = useState<string | null>(null)

  const form = useForm<FlowerFormData>({
    mode: "onChange",
    defaultValues: {
      recordedDate: flowerData.recordedDate || "",
      poleNo: flowerData.poleNo || "",
      clusterId: flowerData.clusterId || "",
      totalFlower: flowerData.totalFlower || 0,
      condition: flowerData.condition || "",
      recordedBy: flowerData.recordedBy || "",
    },
  });

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      form.reset({
        recordedDate: flowerData.recordedDate,
        poleNo: flowerData.poleNo,
        clusterId: flowerData.clusterId,
        totalFlower: flowerData.totalFlower,
        condition: flowerData.condition,
        recordedBy: flowerData.recordedBy,
      });
    }
  }, [open, form, flowerData]);

  const onSubmit = async (data: FlowerFormData) => {
    console.log("Updated Flower Form Data:", data);

    const reformData : FlowerRecordingFormType = {
      clusterId: Number(data.clusterId),
      condition : data.condition,
      totalFlowers : Number(data.totalFlower)
    }

    console.log(reformData)

    try{

      const result = await updateFlower(reformData)

      if (result.success === false) {
        setError(result.message)
        return
      }

      router.replace(`/admin/zone-form-management/zone-details/${zoneId}/flower`)

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

      <DialogContent className="text-primary-button border-primary border bg-white sm:max-w-2xl">
        <DialogHeader className="bg-primary-button -mx-6 -mt-6 mb-6 rounded-t-lg px-6 py-4">
          <DialogTitle className="text-xl font-bold text-white">
            Edit Flower Form
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
              {/* First Row: Date and Pole ID */}
              <div className="mb-4 grid grid-cols-2 gap-4">
                <FormsInput
                  inputClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="recordedDate"
                  label="Date"
                  type="date"
                  placeholder="Select date"
                  readonly={true}
                />
                <FormsInput
                  inputClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="poleNo"
                  label="Pole ID"
                  placeholder="P-001"
                  readonly={true}
                />
              </div>

              {/* Second Row: Cluster ID and Total Flower */}
              <div className="mb-4 grid grid-cols-2 gap-4">
                <FormsInput
                  inputClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="clusterId"
                  label="Cluster ID"
                  placeholder="C-001"
                  readonly={true}
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

              {/* Third Row: Condition - Full Width */}
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

              <div className="mb-4">
                <FormsInput
                  inputClassName="bg-white border-primary-button border rounded-lg"
                  control={form.control}
                  path="recordedBy"
                  label="Recorded By"
                  placeholder="Staff A"
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
