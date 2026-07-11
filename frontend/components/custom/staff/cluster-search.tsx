"use client";

import { Option } from "@/lib/types/model/option";
import CustomSelect from "../common/forms/form-select";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { ClusterSearchForm } from "@/lib/types/model/type";
import FormsInput from "../common/forms/form-input";
import CustomButton from "../common/custom-button";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";



export default function ClusterSearch({locations , defaultZoneNo} : {locations : Option[], defaultZoneNo: string;}) {

  const router = useRouter();
  const params = useParams();
  const serarchParams = useSearchParams();
  const pathname = usePathname();

  const module = pathname.split("/").filter(Boolean).at(-1);
  console.log("module",module)

  const year = params.year as string;
  

  const onSubmit = (data : ClusterSearchForm) => {
    console.log("Cluster Search Data: ", data);

    const query = new URLSearchParams();
    query.set("zoneNo", data.location);

    if (data.cluster_id) {
      query.set("clusterNo", data.cluster_id);
    }

    if (data.pole_id) {
      query.set("poleNo", data.pole_id);
    }

    router.replace(`/staff/${year}/${module}?${query.toString()}`);
  }

    const form = useForm<ClusterSearchForm>({
      defaultValues: {
        location: defaultZoneNo,
        pole_id: "",
        cluster_id: "",
      }
    })

  return (
    <Form {...form}>
      
        <form  className="w-full p-4 sm:p-6 mt-4">
          <div  className="grid grid-cols-1 gap-y-5 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:items-end">
            <CustomSelect className="w-full" control={form.control} path="location"  label="Location" placeholder="Select Location"
            options={locations} />

            <FormsInput className="w-full" control={form.control} path="pole_id" label="Pole Number" placeholder="Enter pole Number" />
            <FormsInput className="w-full" control={form.control} path="cluster_id" label="Number" placeholder="Search by Cluster Number" />
            
            {/* <CustomSelect className="w-full" control={form.control} path="progress_status"  label="Progress Status" placeholder="Select Progress"
            options={[
              {id : "-1", value : "Select All"},
              ...progressStatusOptions
            ]} /> */}

            <div className="w-full flex items-end justify-end">
              <CustomButton label="Search" onClick={form.handleSubmit(onSubmit)} className="btn-primary  w-full sm:w-[200px]"/>
            </div>
          </div>

        
        </form>
      
    </Form>
  )
}

const progressStatusOptions : Option[] = [
  { id: "zero", value: "0% - 25%" },
  { id: "quater", value: "25% - 50%" },
  { id: "half", value: "50% - 99%" },
  { id: "complete", value: "100%" },
];