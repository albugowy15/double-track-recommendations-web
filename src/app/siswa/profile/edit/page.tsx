import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Metadata } from "next";
import EditProfileForm from "../_components/edit-profil-form";
import { protectedFetch } from "@/lib/api";
import { type StudentProfileResponse } from "@/types/data/student";

export const metadata: Metadata = {
  title: "Edit Profile Siswa",
};

export default async function EditStudentProfilePage() {
  const response = await protectedFetch<StudentProfileResponse>(
    "/v1/students/profile",
  );

  return (
    <main className="px-2 py-4">
      <Card className="mx-auto w-full min-w-fit sm:w-[500px] px-2 py-4">
        <CardHeader>
          <CardTitle>Edit Profil Akun</CardTitle>
          <CardDescription>Silahkan edit profil akun Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <EditProfileForm defaultValues={response.data} />
        </CardContent>
      </Card>
    </main>
  );
}
