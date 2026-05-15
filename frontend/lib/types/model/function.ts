export const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error;

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
    const message = (error as { message: unknown }).message;

    if (typeof message === "string") return message;

    return JSON.stringify(message);
  }

  return "Something went wrong";
};