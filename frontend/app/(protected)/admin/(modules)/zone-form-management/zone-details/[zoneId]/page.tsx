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

  // Preserve the originating year so the detail page's Back button can return
  // to the correct Zone & Form Management view.
  const yearQuery = year ? `?year=${year}` : "";

  redirect(
    `/admin/zone-form-management/zone-details/${zoneId}/cluster${yearQuery}`
  );
}


// import FormsClient from "@/components/custom/admin/zone&form/zone/form/forms-client";
// import { baseUrl } from "@/lib/utl";
// import { fetchWithCookie } from "@/lib/server-actions/admin/fetch-with-cookie";

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ zoneId: string }>;
// }) {
//   const { zoneId } = await params;

//   const clusterUrl = `${baseUrl}/clusters/get-cluster-forms-by-zone?zoneId=${zoneId}`;
//   const flowerUrl = `${baseUrl}/flowers/get-flower-forms-by-zone?zoneId=${zoneId}`;
//   const pollinationUrl = `${baseUrl}/pollinations/get-pollination-forms-by-zone?zoneId=${zoneId}`;
//   const podUrl = `${baseUrl}/pods/get-pod-forms-by-zone?zoneId=${zoneId}`;
//   const preHarvestUrl = `${baseUrl}/preHarvest/get-preHarvest-forms-by-zone?zoneId=${zoneId}`;
//   const harvestGradingUrl = `${baseUrl}/harvest-grading/get-harvest-grading-forms-by-zone?zoneId=${zoneId}`;

//   const [
//     clusterData,
//     flowerData,
//     pollinationData,
//     podData,
//     preHarvestData,
//     harvestGradingData,
//   ] = await Promise.all([
//     fetchWithCookie(clusterUrl),
//     fetchWithCookie(flowerUrl),
//     fetchWithCookie(pollinationUrl),
//     fetchWithCookie(podUrl),
//     fetchWithCookie(preHarvestUrl),
//     fetchWithCookie(harvestGradingUrl),
//   ]);

//   console.log("fetch flower",flowerData)

//   return (
//     <FormsClient
//       clusterForms={clusterData?.clusterForms ?? []}
//       flowerForms={flowerData?.flowerForms ?? []}
//       pollinationForms={pollinationData?.pollinationForms ?? []}
//       podForms={podData?.podForms ?? []}
//       preHarvestForms={preHarvestData?.preHarvestForms ?? []}
//       harvestGradingForms={harvestGradingData?.harvestGradingForms ?? []}
//     />
//   );
// }
