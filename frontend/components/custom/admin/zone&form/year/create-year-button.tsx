"use client";
import { CreateYearFormInput, CreateYearFormSchema, CreateYearFormType } from "@/lib/types/model/type";
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
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import FormsInput from "../../../common/forms/form-input";
import { Form } from "@/components/ui/form";
import { createYear } from "@/lib/server-actions/admin/create-year-client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import ApiErrorUI from "@/components/custom/common/error-handle";

function CreateYearButton() {

  const router = useRouter();

  const form = useForm<CreateYearFormInput, any, CreateYearFormType>({
    resolver : zodResolver(CreateYearFormSchema),
    defaultValues: {
      year: "",
    },
  });
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (data: CreateYearFormType) => {

    setError(null)

    try{
      const result = await createYear(data)
      console.log(result);

      if (result.success === false) {
        setError(result.message || "Failed to create year");
        return;
      }

      setOpen(false);
      form.reset();

      router.replace("/admin/year-management")
    }catch(error) {
      setError("Cannot connect to server");
    }

  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-staff-cluster-edit hover:bg-staff-cluster-edit px-4 py-6 text-white transition hover:border-2 hover:border-b-2 hover:text-white hover:shadow-lg"
          variant="outline"
        >
          Create New Year+
        </Button>
      </DialogTrigger>

      <DialogContent className="text-primary-button bg-soft-secondary border-primary border sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl">"Create New Year"</DialogTitle>
        </DialogHeader>

        <ApiErrorUI message={error} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <FormsInput
                inputClassName="bg-white"
                control={form.control}
                path="year"
                label="Year"
                type="number"
                placeholder="Eg: 2023"
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
                "Create Year"
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateYearButton;
