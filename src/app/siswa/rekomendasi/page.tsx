import Typography from "@/components/typography";
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

import { pembobotan, recommendations } from "@/data/rekomendasi";
import { protectedFetch } from "@/lib/api";

export interface Pembobotan {
  entrepreneurial_opportunity: Float32Array;
  facility: Float32Array;
  interest: Float32Array;
  salary: Float32Array;
  total_open_jobs: Float32Array;
}

export interface getEntropies {
  fullname: string;
  school_id: number;
  student_id: number;
  total_pembobotan: number;
  pembobotan: Pembobotan;
}

export async function getEntropy() {
  const response = await protectedFetch<getEntropies[]>("/v1/entropy");
  return response;
}

export interface Topsis {
  multimedia: Float32Array;
  elektro: Float32Array;
  listrik: Float32Array;
  boga: Float32Array;
  busana: Float32Array;
  kecantikan: Float32Array;
  mesin: Float32Array;
}
export interface getTopsis {
  student_id: number;
  school_id: number;
  fullname: string;
  TOPSIS_Score: Topsis;
}

export async function getEntropyTOPSIS() {
  return await protectedFetch<getTopsis[]>("/v1/entropy-topsis");
}

export default async function RecommendationPage() {
  const entropy = await getEntropy();

  const sortDataByScore = (data: any[]) => {
    return data.slice().sort((a, b) => b.score - a.score);
  };
  return (
    <main className="px-3 pt-5 md:container">
      <Typography variant="h2">
        Hasil Rekomendasi Bidang Keterampilan
      </Typography>
      <Typography variant="body1">
        Berikut hasil rekomendasi bidang keterampilan yang sesuai dengan
        preferensi ananda :
        <Typography variant="body1" fontWeight="bold">
          {entropy.data.fullname}
        </Typography>
      </Typography>
      <Card>
        <CardHeader>
          <CardTitle>Pembobotan Kriteria</CardTitle>
          <CardDescription>
            Pembobotan Kriteria Menggunakan Perhitungan Metode Entropy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto text-sm shadow-md sm:rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pembobotan</TableHead>
                  <TableHead>Nilai</TableHead>
                  <TableHead>Percantage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pembobotan.data.map((weight, index) => (
                  <TableRow key={index}>
                    <TableHead>{weight.weight}</TableHead>
                    <TableHead>{weight.value}</TableHead>
                    <TableHead>{weight.percentage} %</TableHead>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <div className="mt-4 flex flex-col items-center gap-2 lg:flex-row">
        {recommendations.map((recommendation, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{recommendation.method} Based</CardTitle>
              <CardDescription>{recommendation.description}</CardDescription>
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
                    {sortDataByScore(recommendation.data).map((data, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>{data.skill}</TableCell>
                        <TableCell>{data.score}</TableCell>
                        <TableCell>{data.details}</TableCell>
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
        ))}
      </div>
    </main>
  );
}
