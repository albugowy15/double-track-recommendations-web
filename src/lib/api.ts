import { getServerAuthSession } from "@/config/auth";
import { env } from "@/env.mjs";
import { type APIResponse } from "@/types/api";
import { redirect } from "next/navigation";

/**
 * Fetches data from a protected endpoint.
 * Make sure to only call this function inside Server Component
 *
 * @template T The expected return type from the API endpoint.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @returns {Promise<APIResponse<T>>} The data returned from the API endpoint.
 * @throws Will throw an error if the fetch request fails.
 */
export async function protectedFetch<T>(
  endpoint: string,
): Promise<APIResponse<T>> {
  const url = env.NEXT_PUBLIC_API_URL + endpoint;

  const session = await getServerAuthSession();
  if (!session) redirect("403");

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session.user.token,
    },
  });
  return (await res.json()) as APIResponse<T>;
}

/**
 * Fetches data from a public endpoint.
 * Make sure to only call this function inside Server Component
 *
 * @template T The expected return type from the API endpoint.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @returns {Promise<APIResponse<T>>} The data returned from the API endpoint.
 * @throws Will throw an error if the fetch request fails.
 */
export async function publicFetch<T>(
  endpoint: string,
): Promise<APIResponse<T>> {
  const url = env.NEXT_PUBLIC_API_URL + endpoint;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res.json()) as APIResponse<T>;
}
