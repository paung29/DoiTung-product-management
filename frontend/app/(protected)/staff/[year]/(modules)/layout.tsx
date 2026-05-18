"use client";

import BackButton from "@/components/custom/common/back-button";
import CustomButton from "@/components/custom/common/custom-button";
import FormIconTitles from "@/components/custom/common/form-icon-titles";
import {
  ClipboardList,
  Flower2,
  LucideIcon,
  Package,
  Plane,
  Sprout,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";

type PageConfig = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
};

const pageConfigMap: Record<string, PageConfig> = {
  cluster: {
    title: "Cluster Recording",
    subtitle: "Record flower cluster data",
    icon: Plane,
  },
  flower: {
    title: "Flower Recording",
    subtitle: "Record flower data",
    icon: Flower2,
  },
  pollination: {
    title: "Pollination Recording",
    subtitle: "Record pollination data",
    icon: ClipboardList,
  },
  pod: {
    title: "Pod Setting",
    subtitle: "Record pod setting data",
    icon: Package,
  },
  "pre-harvest": {
    title: "Pre-Harvest Recording",
    subtitle: "Record pre-harvest data",
    icon: Sprout,
  },
  "harvest-grading": {
    title: "Harvest and Grading ",
    subtitle: "Record harvest and grading data",
    icon: ClipboardList,
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
  const year = params.year as string;

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

  return (
    <div className="bg-staff-backdrop border-primary-button mx-0 my-0 min-h-screen w-full rounded-none border shadow-2xl sm:mx-auto sm:my-15 sm:max-w-[80%] sm:rounded-2xl">
      <div className="bg-secondary border-primary-button flex h-16 items-center justify-between rounded-none border-b px-4 sm:rounded-t-2xl sm:px-10">
        <FormIconTitles title={title} subtitle={subtitle} icon={icon} />

        <div className="flex items-center gap-3">
          {isClusterListPage && (
            <CustomButton
              label="Add"
              onClick={handleAdd}
              className="bg-green-700"
            />
          )}

          <BackButton />
        </div>
      </div>
      <div className="px-4 py-4 sm:px-10 sm:py-10">{children}</div>
    </div>
  );
}
