import Typography from "@/components/typography";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { protectedFetch } from "@/lib/api";
import { type Metadata } from "next";
import RecommendationCard from "./_components/recommendation-card";
import { TriangleAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Hasil Rekomendasi",
};

export interface RecommendationResult {
  alternative: string;
  description?: string;
  score: number;
  id: number;
}

interface AhpRecommendation {
  result: Array<RecommendationResult>;
  consistency_ratio: number;
}

// interface TopsisRecommendation {
//   result: Array<RecommendationResult>;
//   id: number;
// }

export interface Recommendation {
  ahp: AhpRecommendation;
}

export default async function RecommendationPage() {
  const recommendationsRes = await protectedFetch<Recommendation>(
    "/v1/recommendations/student",
  );

  if (!recommendationsRes.ok) {
    return (
      <main className="px-3 pt-5 md:max-w-xl mx-auto">
        <Alert variant="destructive">
          <TriangleAlert className="w-4 h-4" />
          <AlertTitle>Perhatian!</AlertTitle>
          <AlertDescription>Kamu belum mengisi kuesioner</AlertDescription>
        </Alert>
      </main>
    );
  }

  if (!recommendationsRes?.data) return null;

  return (
    <main className="px-3 pt-5 md:container">
      <Typography variant="h2">
        Hasil Rekomendasi Bidang Keterampilan
      </Typography>
      <Typography variant="body1">
        Berikut hasil rekomendasi bidang keterampilan yang sesuai dengan
        preferensimu.
      </Typography>
      <Alert variant="destructive" className="my-4 max-w-2xl">
        <AlertTitle>Perhatian!</AlertTitle>
        <AlertDescription>
          Jawaban dari kuesioner yang telah kamu kerjakan{" "}
          <strong>tidak konsisten</strong> dengan nilai Consistency Ratio
          sebesar{" "}
          <strong>{recommendationsRes.data.ahp.consistency_ratio}</strong>.{" "}
          Sangat dianjurkan agar{" "}
          <strong>
            Anda mengulang mengisi kuesioner dengan jawaban yang konsisten
          </strong>{" "}
          untuk mendapatkan hasil rekomendasi terbaik.
        </AlertDescription>
      </Alert>
      <div className="mt-4 flex flex-col items-center gap-2 lg:flex-row">
        <RecommendationCard
          variant="AHP"
          data={recommendationsRes?.data.ahp.result}
        />
        <RecommendationCard
          variant="TOPSIS"
          data={recommendationsRes?.data.ahp.result}
        />
      </div>
    </main>
  );
}
