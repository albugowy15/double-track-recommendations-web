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
import { type AnswerResult } from "@/types/data/answer";

interface AnswerCardProps {
  data: AnswerResult[];
}

const AnswerCard = (props: AnswerCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jawaban Siswa</CardTitle>
        <CardDescription>
          Berikut hasil rekapan jawaban yang dapat menentukan hasil rekomendasi
          siswa
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto text-sm shadow-md sm:rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nomor</TableHead>
                <TableHead>Pertanyaan</TableHead>
                <TableHead>Kategori Pertanyaan</TableHead>
                <TableHead>Jawaban Siswa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {props.data.map((result, idx) => (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{result.question}</TableCell>
                  <TableCell>{result.category}</TableCell>
                  <TableCell>{result.answer}</TableCell>
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

export default AnswerCard;
