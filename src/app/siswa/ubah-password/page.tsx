import { ChangePasswordForm } from "@/app/_components/change-password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Ubah Password Siswa",
  description: "Ubah Password Akun Siswa",
};

export default async function ChangePasswordAdminPage() {
  return (
    <main className="px-3 pt-5 md:container">
      <Card className="mx-auto w-full min-w-fit sm:w-[500px]">
        <CardHeader>
          <CardTitle>Ubah Password Akun Siswa</CardTitle>
          <CardDescription>
            Isi form berikut untuk mengubah password akun Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm variant="student" />
        </CardContent>
      </Card>
    </main>
  );
}
