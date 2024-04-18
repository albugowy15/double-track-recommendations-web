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
import { Separator } from "@/components/ui/separator";
import { protectedFetch } from "@/lib/api";
import { type AdminProfileResponse } from "@/types/data/admin";
import { type SchoolResponse } from "@/types/data/school";
import { Pencil } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Profil Admin",
  description: "Profil akun administrator",
};

export default async function AdminProfilePage() {
  const schoolResponse = await protectedFetch<SchoolResponse>("/v1/school");
  const adminProfileResponse =
    await protectedFetch<AdminProfileResponse>("/v1/admin/profile");

  return (
    <main className="px-3 pt-5 md:container">
      <Card className="mx-auto w-full min-w-fit sm:w-[500px]">
        <CardHeader>
          <CardTitle>Profil Akun Administrator</CardTitle>
          <CardDescription>
            Berikut rincian profil akun administrator Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator />
          <Typography
            variant="body1"
            className="flex items-center justify-between py-2 font-semibold"
          >
            Username{" "}
            <span className="font-normal">
              {adminProfileResponse?.data?.username}
            </span>
          </Typography>
          <Separator />
          <Typography
            variant="body1"
            className="flex items-center justify-between py-2 font-semibold"
          >
            Asal Sekolah{" "}
            <span className="font-normal">{schoolResponse?.data?.name}</span>
          </Typography>
          <Separator />
          <Typography
            variant="body1"
            className="flex items-center justify-between py-2 font-semibold"
          >
            Email{" "}
            <span className="font-normal">
              {adminProfileResponse?.data?.email}
            </span>
          </Typography>
          <Separator />
          <Typography
            variant="body1"
            className="flex items-center justify-between py-2 font-semibold"
          >
            Nomor Telepon{" "}
            <span className="font-normal">
              {adminProfileResponse?.data?.phone_number}
            </span>
          </Typography>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="secondary" asChild>
            <Link href="/admin/profil/edit">
              <Pencil className="mr-2 h-4 w-4" /> Perbarui Profil
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
