"use server";

import { protectedFetch } from "@/lib/api";
import { type StudentProfileForm } from "./_components/edit-profil-form";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfile(data: StudentProfileForm) {
  try {
    const res = await protectedFetch<null>("/v1/students/profile", {
      method: "PATCH",
      body: data,
    });
    if (res.error) {
      return { error: res.error };
    }
  } catch (e) {
    console.error(e);
    return { error: "Terjadi kesalahan" };
  }
  revalidatePath("/siswa/profile");
  redirect("/siswa/profile");
}
