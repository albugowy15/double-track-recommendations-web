import { type Question } from "@/data/kuesioner";
import { QuestionnareForm } from "./_components/questionnare_form";
import { protectedFetch } from "@/lib/api";
import { type Metadata } from "next";
import Typography from "@/components/typography";

export const metadata: Metadata = {
  title: "Kuesioner siswa",
};
export default async function QuestionnarePage() {
  const response = await protectedFetch<Question[]>(
    "/v1/questionnare/questions",
  );
  const questions = response?.data ? response.data : [];
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
