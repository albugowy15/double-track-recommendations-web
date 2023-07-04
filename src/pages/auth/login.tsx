import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { TextInput } from '@/components/Form';
import Typography from '@/components/Typography';

const loginFormSchema = z.object({
  username: z.string().nonempty('Username tidak boleh kosong'),
  password: z.string().nonempty('Password tidak boleh kosong'),
});
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/Button';

type LoginFormProps = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const methods = useForm<LoginFormProps>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onTouched',
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<LoginFormProps> = (data) => {
    toast.loading('Silahkan tunggu');
    signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    }).then((res) => {
      if (res?.ok) {
        toast.remove();
        toast.success('Login berhasil');
        window.location.replace('/');
      } else {
        toast.remove();
        toast.error('Username atau password salah');
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mx-auto flex w-fit max-w-sm flex-col gap-3 rounded-lg border border-slate-800 p-4'
      >
        <Typography variant='h3' className='text-center'>
          Silahkan Login
        </Typography>
        <Typography variant='body1' className='text-center'>
          Silahkan login menggunakan username dan password yang telah diberikan.
        </Typography>
        <TextInput
          label='Username'
          name='username'
          helperText='Masukkan username Anda'
          type='text'
        />
        <TextInput
          name='password'
          label='Password'
          helperText='Masukkan password Anda'
          type='password'
        />
        <Button
          className='flex w-full justify-center'
          type='submit'
          variant='filled'
        >
          Login
        </Button>
      </form>
    </FormProvider>
  );
}
