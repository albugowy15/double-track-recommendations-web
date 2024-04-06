"use server";

import { protectedFetch } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function deleteStudentRecommendationAction(studentId: string) {
  try {
    const res = await protectedFetch("/v1/recommendations", {
      method: "DELETE",
      body: {
        student_id: studentId,
      },
    });
    if (res?.error) {
      return { error: res.error };
    }
  } catch (e) {
    console.error(e);
    return { error: "Unknown error" };
  }
  revalidatePath("/admin/dashboard/hasil-rekomendasi");
}
