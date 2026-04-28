import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function CustomError({message} : {message: string}) {

    return(
        <Alert variant="destructive" className="max-w-md">
            <AlertCircleIcon />
            <AlertTitle>Payment failed</AlertTitle>
            <AlertDescription>
                `${message}`
            </AlertDescription>
        </Alert>
    )

}