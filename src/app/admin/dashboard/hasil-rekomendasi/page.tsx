import { DataTable } from "@/app/admin/dashboard/_components/data-table";
import { columns } from "@/app/admin/dashboard/hasil-rekomendasi/_column";
import { type RecommendationResult } from "@/app/siswa/rekomendasi/page";
import Typography from "@/components/typography";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { protectedFetch } from "@/lib/api";
import { AlertTriangle } from "lucide-react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Hasil Rekomendasi",
};

export interface StudentRecommendation {
  consistency_ratio: number;
  fullname: string;
  student_id: string;
  id: number;
  nisn: string;
  ahp_results: Array<RecommendationResult>;
  topsis_results?: Array<RecommendationResult>;
}

export default async function RecommendationResultDashboardPage() {
  const studentRecommendationsRes = await protectedFetch<
    Array<StudentRecommendation>
  >("/v1/recommendations");

  if (!studentRecommendationsRes?.data) return null;

  return (
    <div className="mx-auto">
      <section className="pb-2">
        <Typography variant="h2">Data Hasil Rekomendasi</Typography>
        <Typography variant="body1">
          Berikut adalah data hasil rekomendasi keterampilan yang diperoleh
          siswa setelah selesai mengisi kuesioner.
        </Typography>
        <div className="py-2" />
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Perhatian!</AlertTitle>
          <AlertDescription>
            <strong>Angka konsistensi</strong> berpengaruh pada rekomendasi
            keterampilan yang dihasilkan. Untuk mendapatkan rekomendasi terbaik,
            angka konsistensi wajib <strong>dibawah 0,1</strong>. Apabila angka
            konsistensi lebih dari 0,1, maka siswa dimohon untuk mengulang
            mengisi kuesioner hingga mendapatkan angka konsistensi kurang dari
            0,1
          </AlertDescription>
        </Alert>
      </section>
      <DataTable
        columns={columns}
        data={studentRecommendationsRes.data ?? []}
        search={{
          column: "fullname",
          placeholder: "Cari siswa",
        }}
      />
    </div>
  );
}
