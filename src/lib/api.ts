import { getServerAuthSession } from "@/config/auth";
import { env } from "@/env.mjs";
import { type APIResponse } from "@/types/api";
import { redirect } from "next/navigation";

type FetchOption = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
};

type FetchResult<T> = {
  ok: boolean;
  status: number;
} & APIResponse<T>;
/**
 * Fetches data from a protected endpoint.
 * Make sure to only call this function inside Server Component.
 *
 * @template T The expected return type from the API endpoint.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {FetchOption} option - The option to configure fetch method, headers, and body
 * @returns {Promise<APIResponse<T>>} The data returned from the API endpoint.
 * @throws {Error} Will throw an error if the fetch request fails.
 */
export async function protectedFetch<T>(
  endpoint: string,
  option?: FetchOption,
): Promise<FetchResult<T>> {
  const session = await getServerAuthSession();
  if (!session) redirect("403");

  const url = env.NEXT_PUBLIC_API_URL + endpoint;
  const method = option?.method ?? "GET";
  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + session.user.token,
  };
  const headers = { ...defaultHeaders, ...option?.headers };

  const res = await fetch(url, {
    method: method,
    headers: headers,
    body: option?.body ? JSON.stringify(option?.body) : undefined,
  });

  const json = (await res.json()) as APIResponse<T>;
  return {
    ok: res.ok,
    status: res.status,
    ...json,
  };
}

/**
 * Fetches data from a public endpoint.
 * Make sure to only call this function inside Server Component.
 *
 * @template T The expected return type from the API endpoint.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {FetchOption} option - The option to configure fetch method, headers, and body
 * @returns {Promise<APIResponse<T>>} The data returned from the API endpoint.
 * @throws {Error} Will throw an error if the fetch request fails.
 */
export async function publicFetch<T>(
  endpoint: string,
  option?: FetchOption,
): Promise<FetchResult<T>> {
  const url = env.NEXT_PUBLIC_API_URL + endpoint;
  const method = option?.method ?? "GET";
  const defaultHeaders = {
    "Content-Type": "application/json",
  };
  const headers = { ...defaultHeaders, ...option?.headers };

  const res = await fetch(url, {
    method: method,
    headers: headers,
    body: option?.body ? JSON.stringify(option?.body) : undefined,
  });
  const json = (await res.json()) as APIResponse<T>;
  return {
    ok: res.ok,
    status: res.status,
    ...json,
  };
}
