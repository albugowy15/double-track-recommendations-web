import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { protectedFetch } from "@/lib/api";
import { type StudentProfileResponse } from "@/types/data/student";
import { PencilIcon } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Profil siswa",
  description: "Profil lengkap siswa",
};

export default async function StudentProfilePage() {
  const response = await protectedFetch<StudentProfileResponse>(
    "/v1/students/profile",
  );

  return (
    <main className="px-2 py-4">
      <Card className="mx-auto w-full min-w-fit sm:w-[500px] px-2 py-4">
        <CardHeader>
          <CardTitle>Profil Siswa</CardTitle>
          <CardDescription>
            Berikut adalah profil Anda. Klik Edit Profil untuk memperbarui
            profil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Typography
            variant="body1"
            className="flex items-center justify-between py-2 font-semibold"
          >
            Nama Lengkap{" "}
            <span className="font-normal">{response.data?.fullname}</span>
          </Typography>
          <Typography
            variant="body1"
            className="flex items-center justify-between py-2 font-semibold"
          >
            Username{" "}
            <span className="font-normal">{response.data?.username}</span>
          </Typography>
          <Typography
            variant="body1"
            className="flex items-center justify-between py-2 font-semibold"
          >
            Email <span className="font-normal">{response.data?.email}</span>
          </Typography>
          <Typography
            variant="body1"
            className="flex items-center justify-between py-2 font-semibold"
          >
            Nomor Telepon{" "}
            <span className="font-normal">{response.data?.phone_number}</span>
          </Typography>
          <Typography
            variant="body1"
            className="flex items-center justify-between py-2 font-semibold"
          >
            NISN <span className="font-normal">{response.data?.nisn}</span>
          </Typography>
          <Typography
            variant="body1"
            className="flex items-center justify-between py-2 font-semibold"
          >
            Sekolah <span className="font-normal">{response.data?.school}</span>
          </Typography>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button asChild>
            <Link href="/siswa/profile/edit">
              <PencilIcon className="mr-2 h-4 w-4" /> Edit Profil
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
