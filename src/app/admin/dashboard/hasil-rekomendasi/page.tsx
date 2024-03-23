import { DataTable } from "@/app/admin/dashboard/_components/data-table";
import {
  columns,
  type RecommendationResult,
} from "@/app/admin/dashboard/hasil-rekomendasi/_column";
import Typography from "@/components/typography";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { studentrecommendationResults } from "@/data/rekomendasi";
import { AlertTriangle } from "lucide-react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Hasil Rekomendasi",
};

async function getData(): Promise<RecommendationResult[]> {
  return Promise.all(studentrecommendationResults);
}

export default async function RecommendationResultDashboardPage() {
  const recommendationResults = await getData();
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
            angka konsistensi wajib <strong>dibawah 0,3</strong>. Apabila angka
            konsistensi lebih dari 0,3, maka siswa dimohon untuk mengulang
            mengisi kuesioner hingga mendapatkan angka konsistensi kurang dari
            0,3
          </AlertDescription>
        </Alert>
      </section>
      <DataTable
        columns={columns}
        data={recommendationResults}
        search={{
          column: "student_name",
          placeholder: "Cari siswa",
        }}
      />
    </div>
  );
}
