"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Trash2, Trash2Icon } from "lucide-react";
import ApiErrorUI from "@/components/custom/common/error-handle";
import { deleteCluster } from "@/lib/server-actions/delete-cluster-client";

export function DeleteClusterButton({ clusterId }: { clusterId: number }) {
  const params = useParams();
  const router = useRouter();
  const zoneId = params.zoneId;

  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) {
      setError(null);
      setSuccess(false);
    }
  };

  const onDelete = async () => {
    setError(null);
    setIsDeleting(true);

    try {
      const result = await deleteCluster(clusterId);

      if (result.success === false) {
        setError(result.message);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        setOpen(false);
        router.replace(`/admin/zone-form-management/zone-details/${zoneId}`);
      }, 1000);
    } catch (error) {
      setError("Failed to connect server");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
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
          <AlertDialogTitle>Delete Cluster?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this cluster? This action cannot be
            undone!
          </AlertDialogDescription>
        </AlertDialogHeader>

        <ApiErrorUI message={error} />

        {success && (
          <Alert className="border-green-600 text-green-700">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Cluster deleted successfully.</AlertDescription>
          </Alert>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" disabled={isDeleting}>
            Cancel
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={onDelete}
            disabled={isDeleting || success}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
