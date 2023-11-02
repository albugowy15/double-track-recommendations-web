'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const loginFormSchema = z.object({
  username: z
    .string({ required_error: 'Username wajib diisi' })
    .min(1, 'Username tidak boleh kosong'),
  password: z
    .string({ required_error: 'Password wajib diisi' })
    .min(1, 'Password tidak boleh kosong'),
});

type LoginForm = z.infer<typeof loginFormSchema>;

export const LoginForm = () => {
  const [tab, setTab] = useState<'siswa' | 'admin'>('siswa');
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
  });
  const { toast } = useToast();

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    signIn('credentials', {
      username: data.username,
      password: data.password,
      isAdmin: tab == 'admin',
      redirect: false,
    })
      .then((res) => {
        if (res) {
          toast({
            title: 'Success',
            description: 'Login berhasil',
          });
        }
      })
      .catch(() => {
        toast({
          variant: 'default',
          title: 'Error',
          description: 'Username atau password salah',
        });
      });
  };

  return (
    <>
      <Tabs defaultValue={tab} className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='siswa' onClick={() => setTab('siswa')}>
            Siswa
          </TabsTrigger>
          <TabsTrigger value='admin' onClick={() => setTab('admin')}>
            Admin
          </TabsTrigger>
        </TabsList>
        <TabsContent value='siswa'>
          <Card>
            <CardHeader>
              <CardTitle>Login Akun Siswa</CardTitle>
              <CardDescription>
                Silahkan login menggunakan username dan password yang telah
                diberikan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-4'
                >
                  <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormDescription>
                          Masukkan username Anda
                        </FormDescription>
                        <FormControl>
                          <Input {...field} placeholder='Username' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormDescription>
                          Masukkan password Anda
                        </FormDescription>
                        <FormControl>
                          <Input
                            type='password'
                            {...field}
                            placeholder='Password'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type='submit' className='w-full'>
                    Login
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='admin'>
          <Card>
            <CardHeader>
              <CardTitle>Login Akun Administrator</CardTitle>
              <CardDescription>
                Silahkan login menggunakan username dan password administrator
                Anda.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-4'
                >
                  <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormDescription>
                          Masukkan username Anda
                        </FormDescription>
                        <FormControl>
                          <Input {...field} placeholder='Username' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormDescription>
                          Masukkan password Anda
                        </FormDescription>
                        <FormControl>
                          <Input
                            type='password'
                            {...field}
                            placeholder='Password'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type='submit' className='w-full'>
                    Login
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};
