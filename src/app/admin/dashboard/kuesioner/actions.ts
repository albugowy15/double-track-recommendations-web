"use server";

import { protectedFetch } from "@/lib/api";
import { type CriteriaSettingForm } from "./_components/criteria-settings";
import { revalidatePath } from "next/cache";

export async function addQuestionnareSettingAction(
  alternativeId: number,
  data: CriteriaSettingForm,
) {
  try {
    const res = await protectedFetch("/v1/questionnare/settings", {
      method: "POST",
      body: {
        alternative_id: alternativeId,
        ...data,
      },
    });
    if (res?.error) {
      return { error: res?.error };
    }
    revalidatePath("admin/dashboard/kuesioner");
  } catch (e) {
    console.error(e);
    return { error: "Terjadi kesalahan" };
  }
}
