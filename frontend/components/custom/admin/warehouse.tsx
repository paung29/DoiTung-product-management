"use client"

import { WareHouseForm, WareHouseFormSchema, WareHouseSearch, WareHouseSearchSchema } from "@/lib/types/model/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import FormsInput from "../common/forms/form-input"
import { Form } from "@/components/ui/form"
import CustomButton from "../common/custom-button"
import { Plus } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Option } from "@/lib/types/model/option"
import CustomSelect from "../common/forms/form-select"

export default function WareHouse() {

    const form = useForm<WareHouseSearch>({
        resolver: zodResolver(WareHouseSearchSchema),
        defaultValues : {
            name : ""
        }
    })

    const onSearch = (form : WareHouseSearch) => {
        console.log(form)
    }

    const onAdd = () => {

    }

    return(
            <div className="grid grid-cols-5 gap-2 w-full">
                <Form {...form}>
                    <form className="col-span-2 ms-2" onSubmit={form.handleSubmit(onSearch)}>
                       
                        <FormsInput 
                        className="w-full"
                        control={form.control} 
                        path='name' 
                        placeholder="Search Warehouse ..."
                        />

                    </form>
                </Form>

                <CustomButton type="submit" className="col-span-1" label="Search" onClick={form.handleSubmit(onSearch)} />
                
                <AddWareHouse />
            </div>
    )
}

function AddWareHouse() {

    const form = useForm<WareHouseForm>({
        resolver: zodResolver(WareHouseFormSchema),
        defaultValues : {
            name: "",
            active: "false"
        }
    })

    const ActiveStatus: Option[] = [
      { id: "true", value: "Active" },
      { id: "false", value: "Inactive" }
    ];

    const onSave = (form : WareHouseForm) => {
        console.log(form)
    }

    return(
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="col-span-1 me-2 w-full">
                    <CustomButton
                        className="w-full"
                        label="Add Warehouse"
                        icon={Plus}
                        type="button"
                    />
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add Warehouse</AlertDialogTitle>
                </AlertDialogHeader>
                <Form {...form}>
                    <form className="flex gap-2">
                        <FormsInput control={form.control} path="name" placeholder="Warehouse name"/>

                        <CustomSelect control={form.control} path="active" options={ActiveStatus} placeholder="Status"/>
                    </form>
                </Form>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={form.handleSubmit(onSave)}>Save</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}