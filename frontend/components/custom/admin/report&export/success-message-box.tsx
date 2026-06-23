"use client";

import { CheckCircle } from "lucide-react";

type SuccessToastProps = {
  message: string;
  visible: boolean;
};

export default function SuccessToast({ message, visible }: SuccessToastProps) {
  if (!visible) return null;

  return (
    <div className="animate-fade-in fixed top-6 right-6 z-50 w-80 rounded-xl bg-green-600 p-4 text-white shadow-lg">
      <div className="flex items-start gap-3">
        <CheckCircle className="h-5 w-5 text-white" />

        <div>
          <p className="font-medium">Export Successful</p>
          <p className="text-sm whitespace-pre-line opacity-90">{message}</p>
        </div>
      </div>
    </div>
  );
}
