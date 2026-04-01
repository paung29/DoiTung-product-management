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
      <div className="bg-staff-backdrop border-primary-button
                        mx-0 sm:mx-auto
                        my-0 sm:my-15
                        min-h-screen
                        w-full sm:max-w-[80%]
                        rounded-none sm:rounded-2xl
                        border shadow-2xl">
        <div className="bg-secondary border-primary-button
                          flex h-16 items-center justify-between
                          border-b
                          px-4 sm:px-10
                          rounded-none sm:rounded-t-2xl">
          <FormIconTitles title={title} subtitle={subtitle} icon={icon} />
          <BackButton />
        </div>
        <div className="px-4 py-4 sm:px-10 sm:py-10">{children}</div>
      </div>
    </>
  );
}

export default FormPageShell;
