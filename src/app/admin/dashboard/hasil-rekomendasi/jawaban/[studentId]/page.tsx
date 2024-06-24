import AnswerCard from "@/app/siswa/rekomendasi/_components/answer-card";
import Typography from "@/components/typography";
import { protectedFetch } from "@/lib/api";
import { type AnswerResultDetail } from "@/types/data/answer";

export default async function StudentAnswerDetailPage({
  params,
}: {
  params: { studentId: string };
}) {
  const answerDetailRes = await protectedFetch<AnswerResultDetail>(
    "/v1/questionnare/answers/" + params.studentId,
  );

  if (!answerDetailRes?.data) return null;
  return (
    <main>
      <Typography variant="h2">Jawaban siswa</Typography>
      <Typography variant="body1">
        Berikut adalah data jawaban kuisoner siswa yang dapat mempengaruhi hasil
        rekomendasi
      </Typography>
      <div className="mt-4 flex flex-col items-center gap-4">
        <AnswerCard data={answerDetailRes.data} />
      </div>
    </main>
  );
}
