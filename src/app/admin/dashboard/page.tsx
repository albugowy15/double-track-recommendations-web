import Typography from "@/components/typography";
import { protectedFetch } from "@/lib/api";
import { type StatisticsResponse } from "@/types/data/common";
import { Pencil, SearchCheck, Users } from "lucide-react";
import { type Metadata } from "next";
import { StatisticCard } from "./_components/statistic-card";

export const metadata: Metadata = {
  title: "Dashboard Admin",
};

export default async function OverviewPage() {
  const statisticsResponse =
    await protectedFetch<StatisticsResponse>("/v1/statistics");
  return (
    <>
      <Typography variant="h2">Ringkasan</Typography>

      <section className="grid gap-3 py-5 md:grid-cols-3">
        <StatisticCard
          title="Total Siswa Terdaftar"
          desc="Jumlah siswa yang telah didaftarkan kedalam aplikasi."
          data={statisticsResponse?.data?.registered_students}
          icon={<Users className="h-8 w-8" />}
        />

        <StatisticCard
          title="Kuesioner Diisi"
          desc="Jumlah siswa yang telah selesai mengisi kuesioner."
          data={statisticsResponse?.data?.questionnare_completed}
          icon={<Pencil className="h-8 w-8" />}
        />

        <StatisticCard
          title="Konsitensi"
          desc="Persentase isian kuesioner dengan konsistensi yang baik (diatas
              0,1)."
          data={
            statisticsResponse?.data?.consistency_avg
              ? statisticsResponse.data.consistency_avg.toFixed(4)
              : 0.0
          }
          icon={<SearchCheck className="h-8 w-8" />}
        />
      </section>
    </>
  );
}
