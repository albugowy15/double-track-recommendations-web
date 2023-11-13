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
import { Pencil } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Profil Admin",
  description: "Profil akun administrator",
};

export default function AdminProfilePage() {
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
          <Typography
            variant="body1"
            className="flex items-center justify-between py-2 font-semibold"
          >
            Nama
            <span className="font-normal">admin</span>
          </Typography>
          <Separator />
          <Typography
            variant="body1"
            className="flex items-center justify-between py-2 font-semibold"
          >
            Username <span className="font-normal">admin</span>
          </Typography>
          <Separator />
          <Typography
            variant="body1"
            className="flex items-center justify-between py-2 font-semibold"
          >
            Asal Sekolah <span className="font-normal">SMA contoh</span>
          </Typography>
          <Separator />
          <Typography
            variant="body1"
            className="flex items-center justify-between py-2 font-semibold"
          >
            NIK <span className="font-normal">36463463463643643</span>
          </Typography>
          <Separator />
          <Typography
            variant="body1"
            className="flex items-center justify-between py-2 font-semibold"
          >
            Email <span className="font-normal">contoh@gmail.com</span>
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
