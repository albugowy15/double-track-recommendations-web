import { QuestionnareForm } from "./_components/questionnare_form";
import { protectedFetch } from "@/lib/api";
import { type Metadata } from "next";
import Typography from "@/components/typography";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import ResetQuestionnareButton from "./_components/restart-questionnare-button";
import { type QuestionnareStatus, type Question } from "@/types/data/question";

export const metadata: Metadata = {
  title: "Kuesioner Rekomendasi Siswa",
};

export default async function RecommendationQuestionnarePage() {
  const questionnareStatusRes = await protectedFetch<{
    status: QuestionnareStatus;
  }>("/v1/questionnare/status");
  if (!questionnareStatusRes?.data) return null;

  if (questionnareStatusRes?.data.status === "NOTREADY") {
    return (
      <main className="pt-20 flex justify-center">
        <Alert variant="destructive" className="max-w-xl">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Perhatian!</AlertTitle>
          <AlertDescription>
            Admin belum mengatur kuesioner sehingga Anda belum diperkenankan
            untuk mengisi kuesioner. Silahkan hubungi admin.
          </AlertDescription>
        </Alert>
      </main>
    );
  }

  if (questionnareStatusRes?.data.status === "COMPLETED") {
    return (
      <main className="pt-20 flex justify-center">
        <Alert className="max-w-xl">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Selamat!</AlertTitle>
          <AlertDescription>
            <Typography variant="body1">
              Anda telah mengisi kuesioner, silahkan kunjungi halaman
              rekomendasi untuk melihat hasil kuesioner Anda.
            </Typography>
            <Typography variant="body1">
              Apabila Anda ingin mengulang mengisi kuesioner, silahkan klik
              tombol &quot;Ulang Kuesioner&quot; di bawah ini.
            </Typography>
            <ResetQuestionnareButton />
          </AlertDescription>
        </Alert>
      </main>
    );
  }

  const response = await protectedFetch<Question[]>(
    "/v1/questionnare/questions",
  );
  const questions = response?.data ?? [];
  return (
    <main className="px-3 pt-5 md:container">
      <Typography variant="h3" className="text-center">
        Kuesioner Preferensi Siswa Pada Keterampilan Double Track
      </Typography>
      <Typography variant="body1" className="text-center max-w-xl mx-auto mb-7">
        Diharapkan mengisi kuesioner ini dengan sungguh-sungguh dan teliti agar
        mendapatkan rekomendasi keterampilan yang dapat Anda ambil dengan
        akurat.
      </Typography>
      <QuestionnareForm questions={questions} />
    </main>
  );
}
