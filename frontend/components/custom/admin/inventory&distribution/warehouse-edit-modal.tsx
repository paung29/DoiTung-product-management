"use client"

import CustomButton from "@/components/custom/common/custom-button";
import { UpdateCustomerInfoFormData, UpdateWareHouseForm, UpdateWareHouseFormData } from "@/lib/types/model/type";
import { useForm } from "react-hook-form";
import { updateCustomerInfo } from "@/lib/server-actions/admin/update-customer-info-client";
import { useParams, useRouter } from "next/navigation";
import FormsInput from "../../common/forms/form-input";
import { Form } from "@/components/ui/form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus } from "lucide-react";
import EditButton from "@/components/custom/common/edit-button";
import CustomSelect from "../../common/forms/form-select";
import { updateWareHouse } from "@/lib/server-actions/admin/update-warehouse-client";
import { Option } from "@/lib/types/model/option";
import { useState } from "react";
import { tr } from "zod/locales";
import ApiErrorUI from "../../common/error-handle";

interface Props {
    id : number
    warehouseName: string;
    status: boolean;
}

 const ActiveStatus: Option[] = [
    { id: "true", value: "Active" },
    { id: "false", value: "Inactive" },
  ];

export default function WareHouseEditModal({
    id,
    warehouseName,
    status,
}: Props) {

    const router = useRouter();
    const params = useParams();

    const year = params.year

    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null)

    const form = useForm<UpdateWareHouseForm>({
        defaultValues : {
            warehouse_id : id,
            warehouse_name : warehouseName,
            active_status : status ? "true" : "false",
        }
    })

    const handleOpen = () => {
        form.reset({
        warehouse_id: id,
        warehouse_name: warehouseName,
        active_status: status ? "true" : "false",
    });

  };

  const onUpdate = async (data: UpdateWareHouseForm) => {

      const reformData : UpdateWareHouseFormData = {
          warehouse_id : data.warehouse_id,
          warehouse_name : data.warehouse_name,
          active_status : data.active_status === "true",
      }

      try{
        const result = await updateWareHouse(reformData);

        console.log(result)
        if(result.success === false) {
          setError(result.message || "Failed to update warehouse")
          return
        }

        setOpen(false);
        router.replace(`/admin/inventory-distribution/${year}/warehouse`)
      }catch(error) {
        setError("Cannot connect to server");
      }
  };

  const onCancel = () => {
    form.reset()
    setError(null)
    setOpen(false)
  }


  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <EditButton onClick={handleOpen} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Warehouse</AlertDialogTitle>
        </AlertDialogHeader>

        <ApiErrorUI message={error}/>

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
          <AlertDialogAction onClick={form.handleSubmit(onUpdate)}>
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}