import CriteriaSettings from "@/app/admin/dashboard/kuesioner/_components/criteria-settings";
import Typography from "@/components/typography";
import { publicFetch } from "@/lib/api";
import { type Metadata } from "next";
import React from "react";
import { SettingsTable } from "./_components/settings-table";
import { type AlternativeResponse } from "@/types/data/alternative";
import { SettingsStatus } from "./_components/settings-status";

export const metadata: Metadata = {
  title: "Kuesinoner",
};

export default async function QuestionnareDashboardPage() {
  const alternativesResponse =
    await publicFetch<AlternativeResponse[]>("/v1/alternatives");
  return (
    <div className="mx-auto flex flex-col gap-6">
      <section>
        <Typography variant="h2">Atur Kuesioner</Typography>
        <Typography variant="body1">
          Silahkan tentukan nilai untuk jumlah lapangan pekerjaan, gaji, dan
          peluang wirausaha untuk setiap bidang keterampilan. Penentuan nilai
          untuk setiap kriteria tersebut akan berpengaruh pada kuesioner beserta
          rekomendasi yang dihasilkan.
        </Typography>
      </section>
      <section>
        <SettingsStatus />
      </section>
      <section>
        <CriteriaSettings alternatives={alternativesResponse?.data ?? []} />
      </section>
      <section className="flex flex-col gap-3 py-4">
        <div>
          <Typography variant="h3">Nilai Keterampilan</Typography>
          <Typography variant="body1">
            Berikut nilai jumlah lapangan pekerjaan, gaji, dan peluang wirausaha
            untuk setiap bidang keterampilan yang telah Anda atur
          </Typography>
        </div>

        <SettingsTable />
      </section>
    </div>
  );
}
