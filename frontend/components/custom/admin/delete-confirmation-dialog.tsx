"use client";

import { X } from "lucide-react";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  userName?: string;
}

export default function DeleteConfirmationDialog({
  isOpen,
  onConfirm,
  onCancel,
  userName = "this user",
}: DeleteConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="relative rounded-3xl border-4 p-8 shadow-lg"
        style={{
          backgroundColor: "#FAF3E0",
          borderColor: "#6B4423",
          width: "500px",
          height: "257px",
        }}
      >
        {/* Close Buttom */}
        <button
          onClick={onCancel}
          className="absolute top-6 right-6 text-gray-600 hover:text-gray-900"
        >
          <X size={28} />
        </button>

        <h2 className="mb-4 text-3xl font-bold text-gray-900">Delete</h2>

        {/* Text */}
        <p className="mb-2 text-lg font-normal text-gray-700">Are you sure?</p>

        <p className="mb-6 text-lg leading-relaxed font-normal text-gray-700">
          Are you sure you want to delete {userName}? This action cannot be
          undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-full border-2 border-gray-400 bg-white px-6 py-2 text-base font-semibold text-gray-900 transition-colors hover:border-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-full bg-red-600 px-6 py-2 text-base font-semibold text-white transition-colors hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
