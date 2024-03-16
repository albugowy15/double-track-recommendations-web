"use server";

import { protectedFetch } from "@/lib/api";
import { type StudentProfileForm } from "./_components/edit-profil-form";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfile(data: StudentProfileForm) {
  const res = await protectedFetch<null>("/v1/students/profile", "PATCH", data);
  if (res.error) {
    return { error: res.error };
  }
  revalidatePath("/siswa/profile");
  redirect("/siswa/profile");
}
