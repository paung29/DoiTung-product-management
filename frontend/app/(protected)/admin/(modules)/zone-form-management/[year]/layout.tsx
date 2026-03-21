"use client";
import { TabSelection } from "@/components/custom/admin/zone&form/tab-selection";
import ZoneAndFormLayoutComponent from "@/components/custom/admin/zone&form/zone-and-form-layout";
import { useParams } from "next/navigation";

function ZoneAndFormManagementPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const param = useParams();
  const year = param.year as string;
  return (
    <>
      <ZoneAndFormLayoutComponent selectedYear={year}>
        <TabSelection />
        {children}
      </ZoneAndFormLayoutComponent>
    </>
  );
}

export default ZoneAndFormManagementPage;
