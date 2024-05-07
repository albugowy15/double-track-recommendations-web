import Typography from "@/components/typography";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { protectedFetch } from "@/lib/api";
import { type Metadata } from "next";
import { RecommendationCard as RecommendationCardV2 } from "./_components/v2/recommendation-card";
import { TriangleAlert } from "lucide-react";
import {
  type TopsisRecommendation,
  type AhpRecommendation,
  type TopsisAHPRecommendation,
} from "@/types/data/recommendation";
import { TopsisCard } from "./_components/topsis-card";

export const metadata: Metadata = {
  title: "Hasil Rekomendasi",
};

export interface Recommendation {
  ahp: AhpRecommendation;
  topsis: TopsisRecommendation;
  topsis_ahp: TopsisAHPRecommendation;
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

  const isConsistent = recommendationsRes.data.ahp.consistency_ratio < 0.1;
  return (
    <main className="px-3 pt-5 md:container">
      <Typography variant="h2">
        Hasil Rekomendasi Bidang Keterampilan
      </Typography>
      <Typography variant="body1">
        Berikut hasil rekomendasi bidang keterampilan yang sesuai dengan
        preferensimu.
      </Typography>
      <Alert
        variant={isConsistent ? "default" : "destructive"}
        className="my-4 max-w-2xl"
      >
        <AlertTitle>{isConsistent ? "Selamat" : "Perhatian"}!</AlertTitle>
        <AlertDescription>
          Jawaban dari kuesioner yang telah kamu kerjakan{" "}
          <strong>{isConsistent ? "konsisten" : "tidak konsisten"}</strong>{" "}
          dengan nilai Consistency Ratio sebesar{" "}
          <strong>
            {recommendationsRes.data.ahp.consistency_ratio.toFixed(4)}
          </strong>
          .{" "}
          {isConsistent ? null : (
            <>
              Sangat dianjurkan agar{" "}
              <strong>
                Anda mengulang mengisi kuesioner dengan jawaban yang konsisten
              </strong>{" "}
              untuk mendapatkan hasil rekomendasi terbaik.
            </>
          )}
        </AlertDescription>
      </Alert>
      <div className="mt-4 flex flex-col items-center gap-2 lg:flex-row">
        <RecommendationCardV2
          variant="AHP"
          data={recommendationsRes?.data.ahp.result}
        />
        {/* <TopsisCard
          data={recommendationsRes?.data.topsis.result}
        />  */}
        <TopsisCard
          data={recommendationsRes?.data.topsis.result}
          topsis_ahp={recommendationsRes?.data.topsis_ahp.result}
        />
      </div>
    </main>
  );
}
