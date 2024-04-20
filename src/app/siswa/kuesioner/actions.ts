"use server";

import { protectedFetch } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
    return { error: "Terjadi Kesalahan" };
  }
  revalidatePath("/siswa/kuesioner");
  redirect("/siswa/rekomendasi");
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
    return { error: "Terjadi Kesalahan" };
  }
  revalidatePath("/siswa/kuesioner");
}
