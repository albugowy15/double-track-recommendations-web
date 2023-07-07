import Typography from '@/components/Typography';

import { recommendations } from '@/data/rekomendasi';

export default function RecommendationPage() {
  return (
    <>
      <Typography variant='h2'>
        Hasil Rekomendasi Bidang Keterampilan
      </Typography>
      <Typography variant='body1' className='py-3'>
        Berikut hasil rekomenasi bidang keterampilan yang sesuai dengan
        preferensimu.
      </Typography>
      <div className='flex flex-col items-center gap-2 lg:flex-row'>
        {recommendations.map((recommendation, index) => (
          <div
            className='w-full rounded border border-gray-600 p-3 shadow-md'
            key={index}
          >
            <Typography variant='h4'>{recommendation.method} Based</Typography>
            <Typography variant='body1' className='py-2'>
              {recommendation.description}
            </Typography>
            <div className='relative overflow-x-auto text-sm shadow-md sm:rounded-lg'>
              <table className='w-full text-left'>
                <thead className='bg-gray-200 uppercase'>
                  <tr>
                    <th scope='col' className='px-2.5 py-2'>
                      Ranking
                    </th>
                    <th scope='col' className='px-2.5 py-2'>
                      Keterampilan
                    </th>
                    <th scope='col' className='px-2.5 py-2'>
                      Skor
                    </th>
                    <th scope='col' className='px-2.5 py-2'>
                      Rincian
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recommendation.data.map((data, idx) => (
                    <tr className='border-b bg-white' key={idx}>
                      <th
                        scope='row'
                        className='whitespace-nowrap px-2.5 py-2 font-medium'
                      >
                        {data.ranking}
                      </th>
                      <td className='px-2.5 py-2'>{data.skill}</td>
                      <td className='px-2.5 py-2'>{data.score}</td>
                      <td className='px-2.5 py-2'>{data.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
