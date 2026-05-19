"use client";

import CustomButton from "../../../common/custom-button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import React from "react";
import { Trash } from "lucide-react";

export default function DeleteClusterButton({
  poleId,
  clusterId,
  onDelete,
}: {
  poleId: string;
  clusterId: string;
  onDelete: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  const handleConfirm = () => {
    try {
      onDelete();
    } finally {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CustomButton
          label=""
          icon={Trash}
          className="flex h-8 w-8 items-center justify-center rounded-md p-2"
        />
      </DialogTrigger>

      <DialogContent className="text-primary-button border-primary border bg-white sm:max-w-md">
        <DialogHeader className="-mx-6 -mt-6 mb-6 rounded-t-lg bg-[#fff7f6] px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-red-100 p-3">
              <Trash className="h-6 w-6 text-red-600" />
            </div>
            <DialogTitle className="text-lg font-bold text-gray-900">
              Delete Zone?
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6">
          <p className="mb-4 text-sm text-gray-700">
            Are you sure you want to delete this data, Pole ID{" "}
            <span className="font-medium">{poleId}</span>, Cluster ID{" "}
            <span className="font-medium">{clusterId}</span>?
          </p>
          <p className="mb-6 text-sm text-gray-500">
            This action cannot be undone.
          </p>

          <DialogFooter className="flex justify-end gap-3">
            <DialogClose asChild>
              <CustomButton
                label="Cancel"
                className="bg-white text-gray-700 ring-1 ring-gray-200"
              />
            </DialogClose>
            <CustomButton
              label="Delete"
              onClick={handleConfirm}
              className="bg-red-600 text-white hover:bg-red-700"
            />
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
