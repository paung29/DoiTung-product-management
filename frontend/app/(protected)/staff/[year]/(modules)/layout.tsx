"use client";

import BackButton from "@/components/custom/common/back-button";
import CustomButton from "@/components/custom/common/custom-button";
import FormIconTitles from "@/components/custom/common/form-icon-titles";
import { ClipboardList, LucideIcon, FileText } from "lucide-react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

type PageConfig = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
};

const pageConfigMap: Record<string, PageConfig> = {
  cluster: {
    title: "Cluster Recording",
    subtitle: "Record flower cluster data",
    icon: FileText,
  },
  flower: {
    title: "Flower Recording",
    subtitle: "Record flower data",
    icon: FileText,
  },
  pollination: {
    title: "Pollination Recording",
    subtitle: "Record pollination data",
    icon: FileText,
  },
  pod: {
    title: "Pod Setting",
    subtitle: "Record pod setting data",
    icon: FileText,
  },
  "pre-harvest": {
    title: "Pre-Harvest Recording",
    subtitle: "Record pre-harvest data",
    icon: FileText,
  },
  "harvest-grading": {
    title: "Harvest and Grading ",
    subtitle: "Record harvest and grading data",
    icon: FileText,
  },
};

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleBackClick = () => {
    window.history.back();
  };

  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const year = params.year as string;
  const from = searchParams.get("from");

  const cleanPath = pathname.replace(/\/$/, "");

  let currentModule = "";

  if (cleanPath.includes("/cluster")) currentModule = "cluster";
  else if (cleanPath.includes("/flower")) currentModule = "flower";
  else if (cleanPath.includes("/pollination")) currentModule = "pollination";
  else if (cleanPath.includes("/pod")) currentModule = "pod";
  else if (cleanPath.includes("/pre-harvest")) currentModule = "pre-harvest";
  else if (cleanPath.includes("/harvest-grading"))
    currentModule = "harvest-grading";

  const { title, subtitle, icon } = pageConfigMap[currentModule] || {
    title: "Staff Form",
    subtitle: "Manage form data",
    icon: ClipboardList,
  };

  const isClusterListPage = cleanPath === `/staff/${year}/cluster`;

  const handleAdd = () => {
    router.push(`/staff/${year}/cluster/cluster-form`);
  };

  // On the module's list page, Back should go up to Home. On a create/edit
  // form page nested under that module, Back should go up to the module's
  // list instead — and back to History specifically if that's where the
  // form was opened from (?from=history), matching Submit/Cancel behavior.
  const isModuleListPage = cleanPath === `/staff/${year}/${currentModule}`;
  const moduleListHref =
    from === "history"
      ? `/staff/${year}/history/${currentModule}`
      : `/staff/${year}/${currentModule}`;
  const backHref = isModuleListPage ? `/staff/${year}` : moduleListHref;

  return (
    <div className="bg-staff-backdrop border-primary-button mx-0 my-0 min-h-screen w-full rounded-none border shadow-2xl sm:mx-auto sm:my-15 sm:max-w-[80%] sm:rounded-2xl">
      <div className="bg-secondary border-primary-button flex h-16 items-center justify-between rounded-none border-b px-4 sm:rounded-t-2xl sm:px-10">
        <FormIconTitles title={title} subtitle={subtitle} icon={icon} />

        <div className="flex items-center gap-3">
          {isClusterListPage && (
            <CustomButton
              label="Add"
              onClick={handleAdd}
              className="bg-green-700 text-white hover:bg-green-800"
            />
          )}

          <BackButton fallbackHref={backHref} />
        </div>
      </div>
      <div className="px-4 py-4 sm:px-10 sm:py-10">{children}</div>
    </div>
  );
}
