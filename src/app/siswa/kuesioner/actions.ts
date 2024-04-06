"use server";

import { protectedFetch } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function submitAnswer(
  data: { id: number; number: number; answer: string }[],
) {
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
  revalidatePath("/siswa/kuesioner");
}

export async function restartQuestionnareAction() {
  try {
    const res = await protectedFetch<null>("/v1/questionnare/answers", {
      method: "DELETE",
    });

    if (res?.error) {
      return { error: res.error };
    }
  } catch (e) {
    console.error(e);
    return { error: "Unknown error" };
  }
  revalidatePath("/siswa/kuesioner");
}
