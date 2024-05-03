import Typography from "@/components/typography";
import { type Metadata } from "next";
import { ExpectationsForm } from "./_components/expectations-form";
import { protectedFetch } from "@/lib/api";
import { type AlternativeResponse } from "@/types/data/alternative";
import { type ExpectationResponse } from "@/types/data/expectation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ResetExpectationDialog } from "./_components/reset-dialog";

export const metadata: Metadata = {
  title: "Kuesioner Ekspektasi",
};

export default async function ExpectationsQuestionnarePage() {
  const alternatives =
    await protectedFetch<AlternativeResponse[]>("/v1/alternatives");

  const prevAnswers =
    await protectedFetch<ExpectationResponse[]>("/v1/expectations");

  console.log(prevAnswers);

  if (!prevAnswers.data || prevAnswers.data.length === 0) {
    return (
      <main className="px-3 pt-5 md:container">
        <Typography variant="h3" className="text-center">
          Kuesioner Ekspektasi Siswa
        </Typography>
        <Typography
          variant="body1"
          className="text-center max-w-xl mx-auto mb-7"
        >
          Diharapkan mengisi kuesioner ini dengan sungguh-sungguh dan teliti.
        </Typography>
        <ExpectationsForm alternatives={alternatives.data ?? []} />
      </main>
    );
  }

  return (
    <main className="px-3 pt-5 md:container">
      <Typography variant="h3" className="text-center">
        Kuesioner Ekspektasi Siswa
      </Typography>
      <Typography variant="body1" className="text-center max-w-xl mx-auto mb-7">
        Berikut adalah jawaban kuesioner ekspektasi yang telah Anda isi.
      </Typography>

      <div className="relative overflow-x-auto text-sm shadow-md sm:rounded-lg max-w-xl mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ranking</TableHead>
              <TableHead>Keterampilan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prevAnswers.data.map((result, idx) => (
              <TableRow key={idx}>
                <TableCell>{result.rank}</TableCell>
                <TableCell>{result.alternative_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ResetExpectationDialog />
    </main>
  );
}
