import RecommendationCard from "@/app/siswa/rekomendasi/_components/recommendation-card";
import { RecommendationCard as RecommendationCardV2 } from "@/app/siswa/rekomendasi/_components/v2/recommendation-card";
import Typography from "@/components/typography";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { protectedFetch } from "@/lib/api";
import { type Metadata } from "next";
import React from "react";
import { type StudentRecommendationDetail } from "@/types/data/recommendation";
import { type Student } from "@/types/data/student";
import { TopsisCard } from "@/app/siswa/rekomendasi/_components/topsis-card";

export const metadata: Metadata = {
  title: "Detail Rekomendasi Siswa",
};

export default async function StudentRecommendationDetailPage({
  params,
}: {
  params: { studentId: string };
}) {
  const studentDetailRes = await protectedFetch<Student>(
    "/v1/students/" + params.studentId,
  );
  if (!studentDetailRes?.data) return null;

  const recommendationDetailRes =
    await protectedFetch<StudentRecommendationDetail>(
      "/v1/recommendations/student/" + params.studentId,
    );

  if (!recommendationDetailRes?.data) return null;

  const isConsistent =
    recommendationDetailRes.data.ahp.consistency_ratio <= 0.1;

  return (
    <main>
      <Typography variant="h2">Detail Rekomendasi Siswa</Typography>
      <Typography variant="body1">
        Nama Lengkap: <strong>{studentDetailRes.data.fullname}</strong>
      </Typography>
      <Typography variant="body1">
        NISN: <strong>{studentDetailRes.data.nisn}</strong>
      </Typography>
      <Typography variant="body1">
        Username: <strong>{studentDetailRes.data.username}</strong>
      </Typography>
      {!isConsistent && (
        <Alert variant="destructive" className="my-4">
          <AlertTitle>Perhatian!</AlertTitle>
          <AlertDescription>
            Jawaban dari kuesioner yang telah siswa kerjakan{" "}
            <strong>tidak konsisten</strong> dengan nilai Consistency Ratio
            sebesar{" "}
            <strong>
              {recommendationDetailRes.data.ahp.consistency_ratio.toFixed(4)}
            </strong>
            . Sangat dianjurkan agar siswa disarankan{" "}
            <strong>
              mengulang mengisi kuesioner dengan jawaban yang konsisten
            </strong>{" "}
            untuk mendapatkan hasil rekomendasi terbaik.
          </AlertDescription>
        </Alert>
      )}
      <div className="mt-4 flex flex-col items-center gap-4">
        <RecommendationCardV2
          variant="AHP"
          data={recommendationDetailRes?.data.ahp.result}
        />
        {/* <RecommendationCard
          variant="TOPSIS"
          data={recommendationDetailRes?.data.topsis.result}
        /> */}

        <TopsisCard
          data={recommendationDetailRes?.data.topsis.result}
          topsis_ahp={recommendationDetailRes?.data.topsis_ahp.result}
        />
      </div>
    </main>
  );
}
