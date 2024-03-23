"use server";

import { protectedFetch } from "@/lib/api";
import { type AddStudentForm } from "./create/_components/add-student-form";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { type EditStudentForm } from "./edit/[studentId]/_components/edit-student-form";

export async function addStudentAction(data: AddStudentForm) {
  const res = await protectedFetch("/v1/students", {
    method: "POST",
    body: data,
  });
  if (res.error) {
    return { error: res.error };
  }
  revalidatePath("/admin/dashboard/siswa");
  redirect("/admin/dashboard/siswa");
}

export async function editStudentAction(
  studentId: string,
  data: EditStudentForm,
) {
  const res = await protectedFetch("/v1/students/" + studentId, {
    method: "PATCH",
    body: data,
  });
  if (res.error) {
    return { error: res.error };
  }
  revalidatePath("/admin/dashboard/siswa");
  redirect("/admin/dashboard/siswa");
}

export async function deleteStudentAction(studentId: string) {
  const body = {
    id: studentId,
  };
  const res = await protectedFetch("/v1/students", {
    method: "DELETE",
    body,
  });
  if (res.error) {
    return { error: res.error };
  }
  revalidatePath("/admin/dashboard/siswa");
}
