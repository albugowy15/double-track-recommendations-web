'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { TextInput } from '@/components/Form';
import Typography from '@/components/Typography';

const addStudentFormSchema = z.object({
  fullname: z.string().nonempty({ message: 'Nama lengkap tidak boleh kosong' }),
  nisn: z.string().nonempty({ message: 'NISN tidak boleh kosong' }),
});

type AddStudentForm = z.infer<typeof addStudentFormSchema>;

export default function AddStudentPage() {
  const methods = useForm<AddStudentForm>({
    resolver: zodResolver(addStudentFormSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<AddStudentForm> = (_data) => {
    // TODO: Handle submit
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mx-auto flex w-full flex-col gap-2'
      >
        <Typography variant='h3'>Tambahkan Siswa</Typography>
        <TextInput name='fullname' type='text' label='Nama Lengkap' />
        <TextInput name='nisn' type='text' label='NISN' />
        <div className='py-2' />
        <Button variant='filled' className='w-fit' type='submit'>
          Tambahkan Siswa
        </Button>
      </form>
    </FormProvider>
  );
}
