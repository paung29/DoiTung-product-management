import ZoneAndFormLayoutComponent from "@/components/custom/admin/zone&form/ZoneAndFormLayout";

async function ZoneAndFormManagementPage({
  params,
  children,
}: {
  params: Promise<{ year: string }>;
  children: React.ReactNode;
}) {
  const resolvedParams = await params;
  return (
    <>
      <ZoneAndFormLayoutComponent selectedYear={resolvedParams.year}>
        {children}
      </ZoneAndFormLayoutComponent>
    </>
  );
}

export default ZoneAndFormManagementPage;
