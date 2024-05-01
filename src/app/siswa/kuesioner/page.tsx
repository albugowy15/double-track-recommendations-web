import { type Metadata } from "next";
import { QuestionnareExpectationCard } from "./_components/expectation-card";
import { QuestionnareRecommendationCard } from "./_components/recommendation-card";

export const metadata: Metadata = {
  title: "Kuesioner Siswa",
};

export default function QuestionnarePage() {
  return (
    <main className="flex flex-col gap-5 max-w-xl mx-auto py-5">
      <QuestionnareExpectationCard />
      <QuestionnareRecommendationCard />
    </main>
  );
}
