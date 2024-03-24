"use server";

import { protectedFetch } from "@/lib/api";
import { type EditAdminProfileForm } from "./edit/_components/edit-profile-form";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateAdminProfileAction(data: EditAdminProfileForm) {
  try {
    const res = await protectedFetch("/v1/admin/profile", {
      method: "PATCH",
      body: data,
    });

    if (res?.error) {
      console.log(res?.error);
      return { error: res?.error };
    }
  } catch (e) {
    console.log(e);
    return { error: "Unknown error" };
  }
  revalidatePath("/admin/profil");
  redirect("/admin/profil");
}
