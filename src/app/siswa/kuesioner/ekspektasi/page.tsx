import Typography from "@/components/typography";
import { type Metadata } from "next";
import { ExpectationsForm } from "./_components/expectations-form";
import { protectedFetch } from "@/lib/api";
import { type AlternativeResponse } from "@/types/data/alternative";

export const metadata: Metadata = {
  title: "Kuesioner Ekspektasi",
};

export default async function ExpectationsQuestionnarePage() {
  const alternatives =
    await protectedFetch<AlternativeResponse[]>("/v1/alternatives");

  return (
    <main className="px-3 pt-5 md:container">
      <Typography variant="h3" className="text-center">
        Kuesioner Ekspektasi Siswa
      </Typography>
      <Typography variant="body1" className="text-center max-w-xl mx-auto mb-7">
        Diharapkan mengisi kuesioner ini dengan sungguh-sungguh dan teliti.
      </Typography>
      <ExpectationsForm alternatives={alternatives.data ?? []} />
      {/* <QuestionnareForm questions={questions} /> */}
    </main>
  );
}
