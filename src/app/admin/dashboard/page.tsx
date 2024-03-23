import Typography from "@/components/typography";
import { protectedFetch } from "@/lib/api";
import { ListChecks, Pencil, SearchCheck, Users } from "lucide-react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Admin",
};

export interface StatisticsResponse {
  registered_students: number;
  questionnare_completed: number;
  recommendation_acceptance: number;
  consistency_avg: number;
}

export default async function OverviewPage() {
  const statisticsResponse =
    await protectedFetch<StatisticsResponse>("/v1/statistics");
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
            <Typography variant="h3">
              {statisticsResponse?.data?.registered_students}
            </Typography>
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
            <Typography variant="h3">
              {statisticsResponse?.data?.questionnare_completed}
            </Typography>
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
            <Typography variant="h3">
              {statisticsResponse?.data?.recommendation_acceptance}%
            </Typography>
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
            <Typography variant="h3">
              {statisticsResponse?.data?.consistency_avg}%
            </Typography>
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
