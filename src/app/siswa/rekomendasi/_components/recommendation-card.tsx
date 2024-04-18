import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type RecommendationResult } from "@/types/data/recommendation";

interface RecommendationCardProps {
  variant: "AHP" | "TOPSIS";
  data: RecommendationResult[];
}

const RecommendationCard = (props: RecommendationCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.variant} Based</CardTitle>
        <CardDescription>
          Berikut hasil rekomendasi keterampilan yang sesuai untuk Anda dengan
          metode {props.variant}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto text-sm shadow-md sm:rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ranking</TableHead>
                <TableHead>Keterampilan</TableHead>
                <TableHead>Skor</TableHead>
                <TableHead>Rincian</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {props.data.map((result, idx) => (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{result.alternative}</TableCell>
                  <TableCell>{result.score.toFixed(4)}</TableCell>
                  <TableCell>{result.description}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
