const publicApiUrl =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export const baseUrl =
  typeof window === "undefined"
    ? process.env.INTERNAL_API_URL ?? publicApiUrl
    : publicApiUrl;

export function normalizeYear(year: unknown): string | null {
  const value =
    typeof year === "object" && year !== null && "year" in year
      ? (year as { year: unknown }).year
      : year;

  if (value === null || value === undefined || value === "") return null;

  return String(value);
}


export const exportConfigs = {
  cluster: {
    name: "Cluster Form Report",
    path: "/export-data/cluster-forms",
  },
  harvest: {
    name: "Harvest Grading Report",
    path: "/export-data/harvest-grading",
  },
  grading: {
    name: "Grading Summary Report",
    path: "/export-data/harvest-grading-summary",
  },
  stockMovement: {
    name: "Stock Movement Report",
    path: "/export-data/stock-movements",
  },
  stockSummary: {
    name: "Stock Summary Report",
    path: "/export-data/stock-movements/all",
  },
  customerDistribution: {
    name: "Customer Distribution Report",
    path: "/export-data/customer-distribution",
  },
  customerDistributionAll: {
    name: "Customer Distribution Report (All Years)",
    path: "/export-data/customer-distribution/all",
  },
};
