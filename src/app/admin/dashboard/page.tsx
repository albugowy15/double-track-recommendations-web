import Typography from "@/components/typography";
import { ListChecks, Pencil, SearchCheck, Users } from "lucide-react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Admin",
};

export default function OverviewPage() {
  return (
    <>
      <Typography variant="h2">Ringkasan</Typography>

      <section className="grid gap-3 py-5 md:grid-cols-3">
        <div className="flex items-start gap-3 rounded-md border p-3">
          <div className="rounded-md border bg-secondary p-3">
            <Users className="h-8 w-8" />
          </div>
          <div>
            <Typography variant="body1">Total Siswa Terdaftar</Typography>
            <Typography variant="h3">100</Typography>
            <Typography variant="label1" className="text-xs font-normal">
              Jumlah siswa yang telah didaftarkan kedalam aplikasi.
            </Typography>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-md border p-3">
          <div className="rounded-md border bg-secondary p-3">
            <Pencil className="h-8 w-8" />
          </div>
          <div>
            <Typography variant="body1">Kuesioner Diisi</Typography>
            <Typography variant="h3">55</Typography>
            <Typography variant="label1" className="text-xs font-normal">
              Jumlah siswa yang telah selesai mengisi kuesioner.
            </Typography>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-md border p-3">
          <div className="rounded-md border bg-secondary p-3">
            <ListChecks className="h-8 w-8" />
          </div>
          <div>
            <Typography variant="body1">Rekomendasi Sesuai</Typography>
            <Typography variant="h3">90%</Typography>
            <Typography variant="label1" className="text-xs font-normal">
              Persentase hasil rekomendasi keterampilan sesuai dengan apa yang
              diharapkan siswa.
            </Typography>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-md border p-3">
          <div className="rounded-md border bg-secondary p-3">
            <SearchCheck className="h-8 w-8" />
          </div>
          <div>
            <Typography variant="body1">Konsistensi</Typography>
            <Typography variant="h3">90%</Typography>
            <Typography variant="label1" className="text-xs font-normal">
              Persentase isian kuesioner dengan konsistensi yang baik (diatas
              0,3).
            </Typography>
          </div>
        </div>
      </section>
    </>
  );
}
