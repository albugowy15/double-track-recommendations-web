"use server";

import { type FnAction } from "@/types/server";
import { type StudentRegisterSchema } from "./_components/student-register-form";
import { redirect } from "next/navigation";

async function registerStudentAction(data: StudentRegisterSchema): FnAction {
  try {
    console.log("data register:", data);
  } catch (e) {
    console.error(e);
    return { error: "Terjadi kesalahan" };
  }

  redirect("/auth/login");
}

export { registerStudentAction };
