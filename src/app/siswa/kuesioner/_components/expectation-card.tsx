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
import Link from "next/link";
import { type QuestionnareStatus } from "@/types/data/question";
import { cn } from "@/lib/utils";

async function QuestionnareExpectationCard() {
  const expectationStatusRes = await protectedFetch<{
    status: QuestionnareStatus;
  }>("/v1/expectations/status", { method: "GET" });
  if (!expectationStatusRes?.data) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Kuesioner Ekspektasi <span className="text-red-500">*</span>
        </CardTitle>
        <CardDescription>
          Kuesioner untuk mengetahui ekpesktasi rekomendasi bidang keterampilan
          yang diberikan setelah mengisi kuesioner rekomendasi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Typography variant="body1">
          Status:{" "}
          <span
            className={cn(
              [
                expectationStatusRes.data.status === "READY" && "text-blue-600",
                expectationStatusRes.data.status === "COMPLETED" &&
                  "text-green-600",
              ],
              "font-medium",
            )}
          >
            {expectationStatusRes.data.status}
          </span>
        </Typography>
      </CardContent>
      <CardFooter>
        <Button asChild variant="default">
          <Link href="/siswa/kuesioner/ekspektasi">
            {expectationStatusRes.data.status === "READY" ? "Isi" : "Lihat"}{" "}
            Kuesioner
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export { QuestionnareExpectationCard };
