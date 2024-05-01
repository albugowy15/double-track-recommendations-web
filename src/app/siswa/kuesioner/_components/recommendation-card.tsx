import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { protectedFetch } from "@/lib/api";
import { cn } from "@/lib/utils";
import { type QuestionnareStatus } from "@/types/data/question";
import Link from "next/link";

function QuestionnareStatusBadge(props: { status: QuestionnareStatus }) {
  return (
    <Typography variant="body1">
      Status:{" "}
      <span
        className={cn(
          [
            props.status === "NOTREADY" && "text-red-600",
            props.status === "READY" && "text-blue-600",
            props.status === "COMPLETED" && "text-green-600",
          ],
          "font-medium",
        )}
      >
        {props.status}
      </span>
    </Typography>
  );
}

async function QuestionnareRecommendationCard() {
  const questionnareStatusRes = await protectedFetch<{
    status: QuestionnareStatus;
  }>("/v1/questionnare/status");
  if (!questionnareStatusRes?.data) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Kuesioner Rekomendasi <span className="text-red-500">*</span>
        </CardTitle>
        <CardDescription>
          Kuesioner untuk mengetahui preferensi siswa terhadap bidang
          keterampilan berdasarkan kriteria-kriteria tertentu
        </CardDescription>
      </CardHeader>
      <CardContent>
        <QuestionnareStatusBadge status={questionnareStatusRes.data.status} />
        {questionnareStatusRes.data.status === "NOTREADY" ? (
          <Typography variant="body1">
            Admin belum mengatur kuesioner rekomendasi. Silahkan hubungi admin.
          </Typography>
        ) : null}
      </CardContent>
      {questionnareStatusRes.data.status === "NOTREADY" ? null : (
        <CardFooter>
          <Button asChild variant="default" disabled>
            <Link href="/siswa/kuesioner/ekspektasi">
              {questionnareStatusRes.data.status === "COMPLETED"
                ? "Ulang"
                : "Isi"}{" "}
              Kuesioner
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export { QuestionnareRecommendationCard };
