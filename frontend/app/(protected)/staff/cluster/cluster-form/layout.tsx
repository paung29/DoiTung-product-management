"use client";

import FormPageShell from "@/components/custom/staff/form/form-page-shell";
import { icons } from "lucide-react";

function ClusterFormLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <FormPageShell
        title={"ClusterForm"}
        subtitle={"Cluster Record"}
        icon={icons.Flower}
        backHref={"/cluster"}
        children={children}
      />
    </div>
  );
}

export default ClusterFormLayout;
