"use server";

import { type FnAction } from "@/types/server";
import { type StudentRegisterSchema } from "./_components/student-register-form";
import { redirect } from "next/navigation";
import { publicFetch } from "@/lib/api";

type RegisterStudentRequest = Omit<StudentRegisterSchema, "confirmPassword">;

async function registerStudentAction(data: StudentRegisterSchema): FnAction {
  try {
    const reqBody: RegisterStudentRequest = {
      fullname: data.fullname,
      nisn: data.nisn,
      email: data.email,
      school: data.school,
      username: data.username,
      password: data.password,
    };
    const res = await publicFetch("/v1/register/student", {
      method: "POST",
      body: reqBody,
    });
    if (res.error) {
      return { error: res.error };
    }
  } catch (e) {
    console.error(e);
    return { error: "Terjadi kesalahan" };
  }

  redirect("/auth/login");
}

export { registerStudentAction };
