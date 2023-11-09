import { type Metadata } from "next";
import Link from "next/link";

import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Aplikasi pemberian rekomendasi bidang keterampilan untuk peserta program Double Track dengan berdasarkan kriteria jumlah lapangan pekerjaan, gaji, minat, peluang wirausaha, dan dukungan fasilitas",
};

export default function HomePage() {
  return (
    <main className="relative mt-28 flex flex-col items-center justify-center space-y-2 ">
      <Typography variant="h2" className=" text-primary-500 text-center">
        Sistem Rekomendasi Pemilihan Keterampilan Program Double Track
      </Typography>
      <Typography variant="body1" className="text-center">
        Aplikasi pemberian rekomendasi bidang keterampilan untuk peserta program
        Double Track dengan berdasarkan kriteria jumlah lapangan pekerjaan,
        gaji, minat, peluang wirausaha, dan dukungan fasilitas.
      </Typography>
      <div className="py-1" />
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6">
        <Button variant="outline" asChild>
          <Link href="/tentang">Tentang Aplikasi</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/panduan">Baca Panduan</Link>
        </Button>
      </div>
    </main>
  );
}
