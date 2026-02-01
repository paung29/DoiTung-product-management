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
  const backfunction = () => {
    router.back();
  };
  return (
    <>
      <div className="min-h-screen max-w-[80%] border-primary-button border rounded-2xl shadow-2xl mx-auto my-15">
        <div className=" bg-amber-100 rounded-t-2xl h-18 border-primary-button border-b flex flex-row justify-between items-center px-10">
          <FormIconTitles title={title} subtitle={subtitle} icon={icon} />
          <BackButton />
        </div>
        <div className="px-10 py-5">{children}</div>
      </div>
    </>
  );
}

export default FormPageShell;
