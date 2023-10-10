import { zodResolver } from '@hookform/resolvers/zod';
import { GetServerSidePropsContext } from 'next';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { TextInput } from '@/components/Form';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import Typography from '@/components/Typography';

import { Student, students } from '@/data/siswa';

const editStudentFormSchema = z.object({
  fullname: z.string().nonempty({ message: 'Nama lengkap tidak boleh kosong' }),
  nisn: z.string().nonempty({ message: 'NISN tidak boleh kosong' }),
  school: z.string().nonempty({ message: 'Sekolah tidak boleh kosong' }),
});

type EditStudentForm = z.infer<typeof editStudentFormSchema>;

export default function EditStudentPage({ student }: { student: Student }) {
  const methods = useForm<EditStudentForm>({
    resolver: zodResolver(editStudentFormSchema),
    defaultValues: {
      fullname: student.fullname,
      nisn: student.nisn,
      school: student.school,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<EditStudentForm> = (_data) => {
    // TODO: Handle submit
  };
  return (
    <DashboardLayout>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mx-auto flex w-full flex-col gap-2'
        >
          <Typography variant='h3'>Edit Biodata Siswa</Typography>
          <TextInput name='fullname' type='text' label='Nama Lengkap' />
          <TextInput name='nisn' type='text' label='NISN' />
          <TextInput name='school' type='text' label='Sekolah' />
          <div className='py-2' />
          <Button variant='filled' className='w-fit' type='submit'>
            Perbarui Biodata
          </Button>
        </form>
      </FormProvider>
    </DashboardLayout>
  );
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  const student = students.find(
    (student) => student.id === context.params?.studentId,
  );

  if (student === undefined) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      student,
    },
  };
}
