"use client";

import {
  WareHouseForm,
  WareHouseFormCreate,
  WareHouseFormSchema,
  WareHouseSearch,
  WareHouseSearchSchema,
} from "@/lib/types/model/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormsInput from "../../common/forms/form-input";
import { Form } from "@/components/ui/form";
import CustomButton from "../../common/custom-button";
import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Option } from "@/lib/types/model/option";
import CustomSelect from "../../common/forms/form-select";
import { createWareHouse } from "@/lib/server-actions/admin/create-warehouse-client";
import { useParams, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useState } from "react";
import ApiErrorUI from "../../common/error-handle";

export default function WareHouse() {
  const router = useRouter();
  const params = useParams();
  const year = params.year;

  const form = useForm<WareHouseSearch>({
    resolver: zodResolver(WareHouseSearchSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSearch = (form: WareHouseSearch) => {
    console.log(form);
  };

  const onAdd = () => {};

  return (
    <div className="flex items-center justify-between gap-4">
      

      <AddWareHouse router={router} year={String(year)} />
    </div>
  );
}

function AddWareHouse({
  router,
  year,
}: {
  router: AppRouterInstance;
  year: string;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<WareHouseForm>({
    resolver: zodResolver(WareHouseFormSchema),
    defaultValues: {
      warehouse_name: "",
      active_status: "false",
    },
  });

  const ActiveStatus: Option[] = [
    { id: "true", value: "Active" },
    { id: "false", value: "Inactive" },
  ];

  const onSave = async (form: WareHouseForm) => {
    setError(null);

    console.log(form);

    const reformData: WareHouseFormCreate = {
      warehouse_name: form.warehouse_name,
      active_status: form.active_status === "true" ? true : false,
    };

    try {
      const result = await createWareHouse(reformData);

      if (result.success === false) {
        setError(result.message || "Failed to create warehouse");
        return;
      }

      console.log(result);
      setOpen(false);
      router.replace(`/admin/inventory-distribution/${year}/warehouse`);
    } catch (error) {
      setError("Cannot connect to server");
    }
  };

  const onCancel = () => {
    form.reset();
    setError(null);
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <CustomButton
          label="Add Warehouse"
          icon={Plus}
          type="button"
          className="bg-[#3a835d] hover:bg-[#3a835d]/90 w-40 p-6 text-white"
          onClick={() => {
            setError(null);
            setOpen(true);
          }}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Warehouse</AlertDialogTitle>
        </AlertDialogHeader>

        <ApiErrorUI message={error} />

        <Form {...form}>
          <form className="flex flex-col gap-4">
            <FormsInput
              control={form.control}
              path="warehouse_name"
              placeholder="Warehouse name"
            />

            <CustomSelect
              control={form.control}
              path="active_status"
              options={ActiveStatus}
              placeholder="Status"
            />
          </form>
        </Form>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={form.handleSubmit(onSave)}>
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
