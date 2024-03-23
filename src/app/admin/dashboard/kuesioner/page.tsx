import CriteriaSettings from "@/app/admin/dashboard/kuesioner/_components/criteria-settings";
import Typography from "@/components/typography";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { protectedFetch, publicFetch } from "@/lib/api";
import { CircleAlert, CircleCheckBig, Loader2 } from "lucide-react";
import { type Metadata } from "next";
import { Suspense } from "react";
import SettingsTable from "./_components/settings-table";

export const metadata: Metadata = {
  title: "Kuesinoner",
};

export interface AlternativeResponse {
  id: number;
  alternative: string;
  description: string;
}

export interface SettingsResponse
  extends Omit<AlternativeResponse, "description"> {
  total_open_jobs: number;
  salary: number;
  entrepreneurship_opportunity: number;
}

export default async function QuestionnareDashboardPage() {
  const [alternativesResponse, missingSettingsResponse, validSettingsResponse] =
    await Promise.all([
      publicFetch<AlternativeResponse[]>("/v1/alternatives"),
      protectedFetch<AlternativeResponse[]>(
        "/v1/questionnare/settings/incomplete",
      ),
      protectedFetch<SettingsResponse[]>("/v1/questionnare/settings"),
    ]);
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
        {missingSettingsResponse?.data &&
        missingSettingsResponse.data.length != 0 ? (
          <Alert variant="destructive">
            <CircleAlert className="h-4 w-4" />
            <AlertTitle>Peringatan!</AlertTitle>
            <AlertDescription>
              Anda belum mengatur nilai jumlah lapangan pekerjaan, gaji, dan
              peluang wirausaha untuk setiap bidang keterampilan. Silahkan atur
              nilai lapangan pekerjaan, gaji, dan peluang wirausaha untuk bidang
              keterampilan berikut:
              <ul className="pt-4">
                {missingSettingsResponse.data.map((item) => (
                  <li key={item.id} className="list-disc list-inside">
                    {item.alternative}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <CircleCheckBig className="h-4 w-4" />
            <AlertTitle>Selamat!</AlertTitle>
            <AlertDescription>
              Anda telah mengatur nilai jumlah lapangan pekerjaan, gaji, dan
              peluang wirausaha untuk setiap bidang keterampilan.
            </AlertDescription>
          </Alert>
        )}
      </section>
      <section>
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-6 w-6 animate-spin" />
              Please Wait
            </div>
          }
        >
          <CriteriaSettings alternatives={alternativesResponse?.data ?? []} />
        </Suspense>
      </section>
      <section className="flex flex-col gap-3 py-4">
        <div>
          <Typography variant="h3">Nilai Keterampilan</Typography>
          <Typography variant="body1">
            Berikut nilai jumlah lapangan pekerjaan, gaji, dan peluang wirausaha
            untuk setiap bidang keterampilan yang telah Anda atur
          </Typography>
        </div>
        <SettingsTable data={validSettingsResponse?.data ?? []} />
      </section>
    </div>
  );
}
