"use server";

import { type FnAction } from "@/types/server";
import { type ExpectationsFormSchema } from "./_components/expectations-form";
import { protectedFetch } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface ExpectationRequest {
  alternative_id: number;
  rank: number;
}

const fieldNameToRank: Record<string, number> = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  fifth: 5,
  sixth: 6,
  seventh: 7,
};

async function saveExpectationsAction(data: ExpectationsFormSchema): FnAction {
  const expectationRequestData: ExpectationRequest[] = [];

  Object.entries(data).forEach(([key, value]) => {
    const rank = fieldNameToRank[key];
    if (!rank) {
      return { error: "Invalid field name" };
    }
    const alternative_id = parseInt(value);
    expectationRequestData.push({ rank, alternative_id });
  });

  try {
    const res = await protectedFetch("/v1/expectations", {
      method: "POST",
      body: {
        expectations: expectationRequestData,
      },
    });
    if (res.error) {
      return { error: res.error };
    }
  } catch (e) {
    console.error(e);
    return { error: "Terjadi kesalahan" };
  }

  revalidatePath("/siswa/kuesioner");
  redirect("/siswa/kuesioner");
}

async function deleteExpectationsAction(): FnAction {
  try {
    const res = await protectedFetch("/v1/expectations", { method: "DELETE" });
    if (res.error) {
      return { error: res.error };
    }
  } catch (e) {
    console.error(e);
    return { error: "Terjadi kesalahan" };
  }
  revalidatePath("/siswa/kuesioner/ekspektasi");
}

export { saveExpectationsAction, deleteExpectationsAction };
