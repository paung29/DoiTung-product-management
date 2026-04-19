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

import { CreateOrEditZoneFormType } from "@/lib/types/model/type";
import React from "react";
import { useForm } from "react-hook-form";
import FormsInput from "../../../common/forms/form-input";
import { Edit } from "lucide-react";

export function CreateOrEditZoneButton({
  isEdit = false,
}: {
  isEdit?: boolean;
}) {
  const form = useForm<CreateOrEditZoneFormType>({
    defaultValues: {
      zone_name: "",
      total_plants: "",
    },
  });

  const [open, setOpen] = React.useState(false);

  const onSubmit = (data: CreateOrEditZoneFormType) => {
    console.log(data);
    setOpen(false);
    form.reset();
  };

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
              <FormsInput
                inputClassName="bg-white"
                control={form.control}
                path="total_plants"
                label="Total Plants"
                type="number"
                placeholder="Eg: 1-1000"
              />
            </FieldGroup>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button">
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
