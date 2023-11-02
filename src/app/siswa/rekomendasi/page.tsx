import Typography from '@/components/typography';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { recommendations } from '@/data/rekomendasi';

export default function RecommendationPage() {
  return (
    <>
      <Typography variant='h2'>
        Hasil Rekomendasi Bidang Keterampilan
      </Typography>
      <Typography variant='body1'>
        Berikut hasil rekomendasi bidang keterampilan yang sesuai dengan
        preferensimu.
      </Typography>
      <div className='mt-4 flex flex-col items-center gap-2 lg:flex-row'>
        {recommendations.map((recommendation, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{recommendation.method} Based</CardTitle>
              <CardDescription>{recommendation.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='relative overflow-x-auto text-sm shadow-md sm:rounded-lg'>
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
                    {recommendation.data.map((data, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{data.ranking}</TableCell>
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
    </>
  );
}
