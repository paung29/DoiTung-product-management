import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Trash2Icon } from "lucide-react";

export function DeleteZoneButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="" variant="outline">
          <Trash2 className="text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm" className="bg-soft-secondary">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Zone?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this zone? This action cannot be
            undone!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
