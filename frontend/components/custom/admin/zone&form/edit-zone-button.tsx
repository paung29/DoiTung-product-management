import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import FormsInput from "../../common/forms/form-input";
import EditButton from "@/components/custom/common/edit-button";
import { Form } from "@/components/ui/form";
import { editZoneType, updateZone } from "@/lib/server-actions/admin/update-zone-name-client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ApiErrorUI from "../../common/error-handle";


export function EditZoneButton({id, name} : {id : number, name : string}) {


  const router = useRouter()
  const params = useParams()

  const year = params.year as string

  const [error, setError] = useState<string | null>(null)

  const form = useForm<editZoneType>({
    defaultValues : {
      zoneId : id,
      zoneName : name
    }
  })

  const onSubmit  = async (form : editZoneType)  => {
    console.log(form)

    try{

      const result = await updateZone(form)

      if(result.success === false) {
        setError(result.message)
        return
      }

      console.log(result)

      router.replace(`/admin/zone-form-management/${year}/zone`)

    }catch(error) {
      setError("failed to connect server")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <EditButton />
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Zone</DialogTitle>
          <DialogDescription>
            Update the zone information below.
          </DialogDescription>
        </DialogHeader>

       <ApiErrorUI message={error}/>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 py-4">
              <FormsInput
                control={form.control}
                path="zoneName"
                placeholder="Zone name"
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}