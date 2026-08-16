import { redirect } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ zoneId: string }>;
  searchParams: Promise<{ year?: string }>;
}) {
  const { zoneId } = await params;
  const { year } = await searchParams;

  redirect(`/admin/zone-form-management/zone-details/${zoneId}/cluster`);
}
