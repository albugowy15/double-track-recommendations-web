"use server";

import { protectedFetch } from "@/lib/api";

export async function submitAnswer(data: unknown) {
  try {
    const response = await protectedFetch<null>("/v1/questionnare/answers", {
      method: "POST",
      body: data,
    });
    if (response?.error) {
      return { error: response.error };
    }
  } catch (e) {
    console.error(e);
    return { error: "Unknown error" };
  }
}
