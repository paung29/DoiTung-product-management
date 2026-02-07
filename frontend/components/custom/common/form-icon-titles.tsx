"use client";

import { LucideIcon } from "lucide-react";

type FormIconTitlesProps = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
};

function FormIconTitles({ title, subtitle, icon: Icon }: FormIconTitlesProps) {
  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <div className="h-12 w-12 bg-primary-button flex justify-center items-center rounded-xl">
        <Icon className="text-white " />
      </div>
      <div className="flex flex-col">
        <p className="text-lg font-medium ">{title}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}

export default FormIconTitles;
