import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Metadata } from "next";
import { StudentRegisterForm } from "./_components/student-register-form";

export const metadata: Metadata = {
  title: "Register Akun Siswa",
};

export default function RegisterStudentPage() {
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
          <StudentRegisterForm />
        </CardContent>
      </Card>
    </main>
  );
}
