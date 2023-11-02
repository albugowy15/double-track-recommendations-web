'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { TextInput } from '@/components/Form';
import Typography from '@/components/typography';

const studentProfileSchema = z.object({
  fullname: z.string().nonempty(),
  password: z.string().nonempty(),
  nisn: z.string().nonempty(),
  school: z.string().nonempty(),
});

type StudentProfileForm = z.infer<typeof studentProfileSchema>;

// type StudentProfilePageProps = {
//   fullname: string;
//   nisn: string;
//   password: string;
//   school: string;
// };

export default function StudentProfilePage() {
  const methods = useForm<StudentProfileForm>({
    resolver: zodResolver(studentProfileSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<StudentProfileForm> = (_data) => {
    // TODO: Handle submit
  };
  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mx-auto flex w-full flex-col gap-2 rounded border border-slate-500 p-4 lg:w-[30%]'
        >
          <Typography variant='h4' className='text-center'>
            Biodata Siswa
          </Typography>
          <TextInput name='fullname' type='text' label='Nama Lengkap' />
          <TextInput name='password' type='password' label='Password' />
          <TextInput name='nisn' type='text' label='NISN' disabled />
          <TextInput name='school' type='text' label='Sekolah' disabled />
          <div className='py-2' />
          <Button variant='filled' className='mx-auto w-fit' type='submit'>
            Perbarui Biodata
          </Button>
        </form>
      </FormProvider>
    </>
  );
}
