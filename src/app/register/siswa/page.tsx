import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Metadata } from "next";
import { StudentRegisterForm } from "./_components/student-register-form";
import { publicFetch } from "@/lib/api";
import { type SchoolResponse } from "@/types/data/school";
import { getServerAuthSession } from "@/config/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Register Akun Siswa",
};

export default async function RegisterStudentPage() {
  const session = await getServerAuthSession();
  if (session) {
    redirect("/");
  }
  const schoolsRes = await publicFetch<SchoolResponse[]>("/v1/schools");
  return (
    <main className="mx-auto w-fit px-3 pt-5 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Register Akun Siswa</CardTitle>
          <CardDescription>
            Silahkan membuat akun Siswa dengan mengisi form berikut.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StudentRegisterForm schools={schoolsRes.data ?? []} />
        </CardContent>
      </Card>
    </main>
  );
}
