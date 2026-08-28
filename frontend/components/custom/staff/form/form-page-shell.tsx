"use client";

import { useParams, useRouter } from "next/navigation";
import React from "react";
import BackButton from "../../common/back-button";
import FormIconTitles from "../../common/form-icon-titles";
import { icons, LucideIcon } from "lucide-react";

type FormPageShellProps = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  backHref: string;
  children: React.ReactNode;
};

function FormPageShell({
  title,
  subtitle,
  icon,
  children,
}: FormPageShellProps) {
  const router = useRouter();
  const param = useParams();

  return (
    <>
      <div className="bg-staff-backdrop border-primary-button mx-0 my-0 min-h-screen w-full rounded-none border shadow-2xl sm:mx-auto sm:my-15 sm:max-w-[80%] sm:rounded-2xl">
        <div className="bg-secondary border-primary-button flex h-16 items-center justify-between rounded-none border-b px-4 sm:rounded-t-2xl sm:px-10">
          <FormIconTitles title={title} subtitle={subtitle} icon={icon} />
          <BackButton />
        </div>
        <div className="px-4 py-4 sm:px-10 sm:py-10">{children}</div>
      </div>
    </>
  );
}

export default FormPageShell;
