"use server";

import { cookies } from "next/headers";
import { baseUrl } from "@/lib/utl";

/**
 * Fetch the dashboard performance overview (KPI data) for a given year.
 * GET /dashboard/performance-overview?year={year}
 * Returns the parsed payload (PerformanceOverview on success, or the
 * standard { success:false, message } error shape on failure).
 */
export async function getPerformanceOverview(year: string | number) {
  const cookieStore = await cookies();

  const response = await fetch(
    `${baseUrl}/dashboard/performance-overview?year=${year}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    },
  );

  return await response.json();
}

/**
 * Fetch the per-stage condition breakdown (good / insect / rotten) for a year.
 * GET /dashboard/condition-by-stage?year={year}
 * Returns ProductionStageResponse on success, or the standard
 * { success:false, message } error shape on failure.
 */
export async function getConditionByStage(year: string | number) {
  const cookieStore = await cookies();

  const response = await fetch(
    `${baseUrl}/dashboard/condition-by-stage?year=${year}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    },
  );

  return await response.json();
}

/**
 * Fetch the multi-year flower production trend (total / good / bad flowers).
 * GET /dashboard/flower-production-trend
 * Returns FlowerProductionTrendResponse on success, or the standard
 * { success:false, message } error shape on failure.
 */
export async function getFlowerProductionTrend() {
  const cookieStore = await cookies();

  const response = await fetch(`${baseUrl}/dashboard/flower-production-trend`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  return await response.json();
}

/**
 * Fetch the multi-year pollination performance / pod-set-rate trend.
 * GET /dashboard/pod-set-rate-trend
 * Returns PodSetRateTrendResponse on success, or the standard
 * { success:false, message } error shape on failure.
 */
export async function getPodSetRateTrend() {
  const cookieStore = await cookies();

  const response = await fetch(`${baseUrl}/dashboard/pod-set-rate-trend`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  return await response.json();
}

/**
 * Fetch the multi-year pod production trend (total / lost / remaining pods).
 * GET /dashboard/pod-production-trend
 * Returns PodProductionTrendResponse on success, or the standard
 * { success:false, message } error shape on failure.
 */
export async function getPodProductionTrend() {
  const cookieStore = await cookies();

  const response = await fetch(`${baseUrl}/dashboard/pod-production-trend`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  return await response.json();
}

/**
 * Fetch the multi-year harvestable pods trend.
 * GET /dashboard/harvestable-pods-trend
 * Returns HarvestablePodsTrendResponse on success, or the standard
 * { success:false, message } error shape on failure.
 */
export async function getHarvestablePodsTrend() {
  const cookieStore = await cookies();

  const response = await fetch(`${baseUrl}/dashboard/harvestable-pods-trend`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  return await response.json();
}

/**
 * Fetch the list of available years.
 * GET /years/get-all-years
 */
export async function getAllYears() {
  const cookieStore = await cookies();

  const response = await fetch(`${baseUrl}/years/get-all-years`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  return await response.json();
}
