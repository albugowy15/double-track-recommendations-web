import { AiOutlineSchedule } from 'react-icons/ai';
import { IoNewspaperOutline } from 'react-icons/io5';

import { LinkButton } from '@/components/Button';
import BaseLayout from '@/components/Layout/BaseLayout';
import Typography from '@/components/Typography';

export default function Home() {
  return (
    <BaseLayout>
      <main className='relative mt-28 flex flex-col items-center justify-center space-y-2 '>
        <Typography variant='h2' className=' text-center text-primary-500'>
          Sistem Rekomendasi Pemilihan Keterampilan Program Double Track
        </Typography>
        <Typography variant='body1' className='text-center'>
          Aplikasi pemberian rekomendasi bidang keterampilan untuk peserta
          program Double Track dengan berdasarkan kriteria jumlah lapangan
          pekerjaan, gaji, minat, peluang wirausaha, dan dukungan fasilitas.
        </Typography>
        <div className='py-1' />
        <div className='flex flex-wrap items-center justify-center gap-2 sm:gap-6'>
          <LinkButton
            href='/tentang'
            variant='outlined'
            icon={AiOutlineSchedule}
          >
            Tentang Aplikasi
          </LinkButton>
          <LinkButton
            href='/panduan'
            variant='outlined'
            icon={IoNewspaperOutline}
          >
            Baca Panduan
          </LinkButton>
        </div>
      </main>
    </BaseLayout>
  );
}
