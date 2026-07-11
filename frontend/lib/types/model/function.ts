import { WeightUnit } from "./type";

export const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error;

  if (typeof error === "object" && error !== null && "message" in error) {
    const message = (error as { message: unknown }).message;

    if (typeof message === "string") return message;

    return JSON.stringify(message);
  }

  return "Something went wrong";
};

// The API sends grades as A_PLUS / D_PLUS; the UI shows A+ / D+.
export const formatGrade = (grade: string): string =>
  grade.replace("_PLUS", "+");

// Every weight the API returns is in grams, so kg is simply grams / 1000.
export const toWeight = (gram: number, unit: WeightUnit): number =>
  unit === "kg" ? gram / 1000 : gram;

export const formatWeight = (gram: number, unit: WeightUnit): string =>
  toWeight(gram, unit).toLocaleString();
