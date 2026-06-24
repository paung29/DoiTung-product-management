"use client";

import { Check } from "lucide-react";

type SuccessToastProps = {
  visible: boolean;
  title: string;
  description: string;
};

export default function SuccessToast({
  visible,
  title,
  description,
}: SuccessToastProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
      <div className="animate-in fade-in zoom-in-95 w-[420px] rounded-3xl border border-stone-200 bg-white px-8 py-6 shadow-xl duration-200">
        <div className="flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-600">
            <Check className="h-8 w-8 text-white" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-stone-800">{title}</h2>

          {/* Description */}
          <p className="mt-2 text-sm whitespace-pre-line text-stone-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
