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

export default function WareHouse() {
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
      <Form {...form}>
        <form className="flex-1" onSubmit={form.handleSubmit(onSearch)}>
          <FormsInput
            className="w-lg bg-white"
            control={form.control}
            path="name"
            placeholder="Search Warehouse ..."
          />
        </form>
      </Form>

      <AddWareHouse />
    </div>
  );
}

function AddWareHouse() {
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

  const onSave =  async (form: WareHouseForm) => {
    console.log(form);

    const reformData : WareHouseFormCreate = {
      warehouse_name : form.warehouse_name,
      active_status : form.active_status === "true" ? true : false
    }

    const result = await createWareHouse(reformData)

    console.log(result)
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <CustomButton
          label="Add Warehouse"
          icon={Plus}
          type="button"
          className="bg-green-600 whitespace-nowrap hover:bg-green-700"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Warehouse</AlertDialogTitle>
        </AlertDialogHeader>
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
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={form.handleSubmit(onSave)}>
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
