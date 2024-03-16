import { getServerAuthSession } from "@/config/auth";
import { env } from "@/env.mjs";
import { type APIResponse } from "@/types/api";
import { redirect } from "next/navigation";

/**
 * Fetches data from a protected endpoint.
 * Make sure to only call this function inside Server Component.
 *
 * @template T The expected return type from the API endpoint.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {"GET" | "POST" | "PATCH" | "DELETE"} [method="GET"] - The HTTP method for the request.
 * @param {*} [body] - The request body.
 * @returns {Promise<APIResponse<T>>} The data returned from the API endpoint.
 * @throws {Error} Will throw an error if the fetch request fails.
 */
export async function protectedFetch<T>(
  endpoint: string,
  method?: "GET" | "POST" | "PATCH" | "DELETE",
  body?: unknown,
): Promise<APIResponse<T>> {
  const url = env.NEXT_PUBLIC_API_URL + endpoint;

  const session = await getServerAuthSession();
  if (!session) redirect("403");

  const res = await fetch(url, {
    method: method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session.user.token,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return (await res.json()) as APIResponse<T>;
}

/**
 * Fetches data from a public endpoint.
 * Make sure to only call this function inside Server Component.
 *
 * @template T The expected return type from the API endpoint.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {"GET" | "POST" | "PATCH" | "DELETE"} [method="GET"] - The HTTP method for the request.
 * @param {*} [body] - The request body.
 * @returns {Promise<APIResponse<T>>} The data returned from the API endpoint.
 * @throws {Error} Will throw an error if the fetch request fails.
 */
export async function publicFetch<T>(
  endpoint: string,
  method?: "GET" | "POST" | "PATCH" | "DELETE",
  body?: unknown,
): Promise<APIResponse<T>> {
  const url = env.NEXT_PUBLIC_API_URL + endpoint;
  const res = await fetch(url, {
    method: method ?? "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return (await res.json()) as APIResponse<T>;
}
