import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export const getErrorMessage = (
  error: unknown,
  fallback = "Something went wrong"
): string => {
  // 1️⃣ RTK Query error with response body
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "data" in error
  ) {
    const err = error as FetchBaseQueryError & { data?: { message?: string } };
    return err.data?.message ?? fallback;
  }

  // 2️⃣ RTK Query fetch / timeout / parsing errors
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "error" in error
  ) {
    return String((error as { error: string }).error);
  }

  // 3️⃣ Serialized JS error
  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as SerializedError).message);
  }

  return fallback;
};
