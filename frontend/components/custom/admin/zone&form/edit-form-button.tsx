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
import { FormsEditType } from "@/lib/types/model/type";
import React from "react";
import { useForm } from "react-hook-form";
import FormsInput from "../../common/forms/form-input";
import { Edit } from "lucide-react";
import CustomSelect from "../../common/forms/form-select";

export function EditFormButton({
  form_id,
  form_name,
}: {
  form_id: number;
  form_name: string;
}) {
  const form = useForm<FormsEditType>({
    defaultValues: {
      form_id: 0,
      form_name: "",
      active_status: "",
    },
  });

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      form.reset({
        form_id,
        form_name,
        active_status: "ACTIVE",
      });
    }
  }, [open, form, form_id, form_name]);

  const onSubmit = (data: FormsEditType) => {
    console.log(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit className="text-primary" />
        </Button>
      </DialogTrigger>

      <DialogContent className="text-primary-button bg-soft-secondary border-primary border sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Form</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <FormsInput type="hidden" control={form.control} path="form_id" />

              <FormsInput
                disabled
                control={form.control}
                path="form_name"
                label="Form Name"
                placeholder={form_name}
              />

              <CustomSelect
                control={form.control}
                path="active_status"
                label="Active Status"
                options={[
                  { id: "ACTIVE", value: "Active" },
                  { id: "INACTIVE", value: "Inactive" },
                ]}
                placeholder="Select Status"
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
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
