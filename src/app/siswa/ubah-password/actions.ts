"use server";

import { type ChangePasswordSchema } from "@/app/_components/change-password-form";
import { protectedFetch } from "@/lib/api";
import { revalidatePath } from "next/cache";

async function changeStudentPasswordAction(data: ChangePasswordSchema) {
  try {
    const res = await protectedFetch("/v1/students/change-password", {
      method: "PATCH",
      body: {
        old_password: data.oldPassword,
        new_password: data.newPassword,
        confirm_password: data.confirmPassword,
      },
    });

    if (res?.error) {
      console.error(res?.error);
      return { error: res?.error };
    }
  } catch (e) {
    console.error(e);
    return { error: "Terjadi kesalahan" };
  }
  revalidatePath("/siswa/ubah-password");
}

export { changeStudentPasswordAction };
