import CriteriaSettings from "@/app/admin/dashboard/kuesioner/_components/criteria-settings";
import Typography from "@/components/typography";
import { protectedFetch } from "@/lib/api";
import { Loader2 } from "lucide-react";

import { type Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Kuesinoner",
};

export interface AlternativeResponse {
  id: number;
  skill: string;
}

async function getAlternatives() {
  const response = await protectedFetch<AlternativeResponse[]>(
    "/v1/admin/alternatives",
  );
  return response;
}
export default async function QuestionnareDashboardPage() {
  const alternatives = await getAlternatives();
  return (
    <div className="mx-auto">
      <section className="pb-6">
        <Typography variant="h2">Atur Kuesioner</Typography>
        <Typography variant="body1">
          Silahkan tentukan nilai untuk jumlah lapangan pekerjaan, gaji, dan
          peluang wirausaha untuk setiap bidang keterampilan. Penentuan nilai
          untuk setiap kriteria tersebut akan berpengaruh pada kuesioner beserta
          rekomendasi yang dihasilkan.
        </Typography>
      </section>
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-6 w-6 animate-spin" />
            Please Wait
          </div>
        }
      >
        <CriteriaSettings alternatives={alternatives.data ?? []} />
      </Suspense>
    </div>
  );
}
