"use client";

import { Option } from "@/lib/types/model/option";
import CustomSelect from "../common/forms/form-select";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { ClusterSearchForm } from "@/lib/types/model/type";
import FormsInput from "../common/forms/form-input";
import CustomButton from "../common/custom-button";



export default function ClusterSearch() {

  const onSubmit = (data : ClusterSearchForm) => {
    console.log("Cluster Search Data: ", data);
  }

    const form = useForm<ClusterSearchForm>({
      defaultValues: {
        location: "",
        pole_id: "",
        cluster_id: "",
        progress_status: ""
      }
    })

  

  return (
    <Form {...form}>
      
        <form className="mx-auto max-w-6xl sm:max-w-2xl md:max-w-4xl flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end p-2 sm:p-4 mt-4">
          <CustomSelect control={form.control} path="location"  label="Location" placeholder="Select Location"
          options={[
            {id : "-1", value : "Select All"},
            ...locations
          ]} />

          <FormsInput className="w-full sm:w-[180px]" control={form.control} path="pole_id" label="Pole ID" placeholder="Enter pole ID" />
          <FormsInput className="w-full sm:w-[180px]" control={form.control} path="cluster_id" label="Cluster ID" placeholder="Search by Cluster ID" />
          
          <CustomSelect control={form.control} path="progress_status"  label="Progress Status" placeholder="Select Progress"
          options={[
            {id : "-1", value : "Select All"},
            ...progressStatusOptions
          ]} />

          <div className="w-full sm:w-auto sm:ml-auto flex justify-end">
            <CustomButton label="Search" onClick={form.handleSubmit(onSubmit)} />
          </div>
        
        </form>
      
    </Form>
  )
}

const locations : Option[] = [
  { id: "zone-1", value: "Zone 1" },
  { id: "zone-2", value: "Zone 2" },
  { id: "zone-3", value: "Zone 3" },
  { id: "zone-4", value: "Zone 4" },
];

const progressStatusOptions : Option[] = [
  { id: "zero", value: "0% - 25%" },
  { id: "quater", value: "25% - 50%" },
  { id: "half", value: "50% - 99%" },
  { id: "complete", value: "100%" },
];