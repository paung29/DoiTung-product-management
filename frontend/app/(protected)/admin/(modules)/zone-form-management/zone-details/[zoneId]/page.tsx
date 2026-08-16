import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ zoneId: string }>;
}) {
  const { zoneId } = await params;

  redirect(`/admin/zone-form-management/zone-details/${zoneId}/cluster`);
}