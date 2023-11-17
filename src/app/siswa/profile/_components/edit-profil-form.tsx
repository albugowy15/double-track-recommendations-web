"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const studentProfileSchema = z.object({
  fullname: z
    .string({ required_error: "Nama lengkap wajib diisi" })
    .min(1, { message: "Nama lengkap masih kosong" }),
  username: z
    .string({ required_error: "Username wajib diisi" })
    .min(1, { message: "Username masih kosong" }),
  password: z
    .string({ required_error: "Password wajib diisi" })
    .min(1, { message: "Password masih kosong" }),
  nisn: z
    .string({ required_error: "NISN wajib diisi" })
    .min(1, { message: "NISN masih kosong" }),
  school: z
    .string({ required_error: "Sekolah wajib diisi" })
    .min(1, { message: "Sekolah masih kosong" }),
});

type StudentProfileForm = z.infer<typeof studentProfileSchema>;

interface EditProfileFormProps {
  defaultValues?: StudentProfileForm;
}

const EditProfileForm = ({ defaultValues }: EditProfileFormProps) => {
  const form = useForm<StudentProfileForm>({
    resolver: zodResolver(studentProfileSchema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<StudentProfileForm> = (_data) => {
    // TODO: Handle submit
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nisn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NISN (Nomor Induk Siswa Nasional)</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="school"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asal Sekolah</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          Perbarui Profil
        </Button>
      </form>
    </Form>
  );
};

export default EditProfileForm;
