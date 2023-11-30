import { env } from "@/env.mjs";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const emptyStringToUndefined = z.literal("").transform(() => undefined);
export function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
  return schema.optional().or(emptyStringToUndefined);
}

/**
 * Constructs a URL for fetching data.
 *
 * @param {string} path - The path of the API endpoint.
 * @returns {string} The full URL for fetching data.
 */
export function getFetchUrl(path: string): string {
  return env.NEXT_PUBLIC_API_URL + (path.startsWith("/") ? path : "/" + path);
}
