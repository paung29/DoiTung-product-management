"use client";

import { useRouter } from "next/navigation";
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

  return (
    <>
      <div className="bg-staff-backdrop border-primary-button mx-auto my-15 min-h-screen max-w-[80%] rounded-2xl border shadow-2xl">
        <div className="bg-secondary border-primary-button flex h-18 flex-row items-center justify-between rounded-t-2xl border-b px-10">
          <FormIconTitles title={title} subtitle={subtitle} icon={icon} />
          <BackButton />
        </div>
        <div className="px-10 py-10">{children}</div>
      </div>
    </>
  );
}

export default FormPageShell;
