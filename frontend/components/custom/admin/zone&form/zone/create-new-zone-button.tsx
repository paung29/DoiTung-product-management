"use client";

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

import { CreateOrEditZoneForm, CreateOrEditZoneFormSchema, CreateOrEditZoneFormType } from "@/lib/types/model/type";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormsInput from "../../../common/forms/form-input";
import { Edit } from "lucide-react";
import { useZoneForm } from "@/app/(protected)/admin/(modules)/zone-form-management/zone-form-context";
import { createZone } from "@/lib/server-actions/admin/create-zone-client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import ApiErrorUI from "@/components/custom/common/error-handle";

export function CreateOrEditZoneButton({
  isEdit = false,
}: {
  isEdit?: boolean;
}) {

  console.log(isEdit)

  const router = useRouter();

  const {selectedYear} = useZoneForm()

  const [error, setError] = useState<string | null>(null)

  const form = useForm<CreateOrEditZoneFormType>({
    resolver : zodResolver(CreateOrEditZoneFormSchema),
    defaultValues: {
      zone_name: "",
      year: Number(selectedYear)
    },
  });

  const [open, setOpen] = React.useState(false);

  const onSubmit = async (data: CreateOrEditZoneFormType) => {
    setError(null)

    console.log(data);

    const reformData : CreateOrEditZoneForm = {
      year : Number(selectedYear),
      Name : data.zone_name
    }

    console.log(reformData);

    try{
      const result = await createZone(reformData)

      if(result.success === false) {
        setError(result.message || "Failed to create zone")
        return
      }

      console.log(result)
      
      setOpen(false);
      form.reset();
      router.replace(`/admin/zone-form-management/${selectedYear}/zone`)

    }catch(error) {
      setError("Cannot connect to server");
    }

  };

  const onCancel = () => {
    form.reset()
    setError(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button className="" variant="outline">
            <Edit className="text-primary" />
          </Button>
        ) : (
          <Button
            className="bg-staff-cluster-edit hover:bg-staff-cluster-edit px-4 py-6 text-white transition hover:border-2 hover:text-white hover:shadow-lg"
            variant="outline"
          >
            Create New Zone+
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="text-primary-button bg-soft-secondary border-primary border sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {isEdit ? "Edit Zone" : "Create New Zone"}{" "}
          </DialogTitle>
        </DialogHeader>

        <ApiErrorUI message={error} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <FormsInput
                inputClassName="bg-white"
                control={form.control}
                path="zone_name"
                label="Zone Name"
                type="text"
                placeholder="Eg: Zone-1"
              />
              
            </FieldGroup>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button" onClick={onCancel}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                className="bg-primary-button hover:bg-primary-button hover:opacity-90 hover:shadow-lg"
                type="submit"
              >
                {isEdit ? "Save Changes" : "Create Zone"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
