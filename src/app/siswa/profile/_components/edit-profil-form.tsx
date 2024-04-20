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
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { updateProfile } from "../actions";
import { useToastMutate } from "@/lib/hooks";

const studentProfileSchema = z.object({
  fullname: z
    .string({ required_error: "Nama lengkap wajib diisi" })
    .min(1, { message: "Nama lengkap masih kosong" }),
  username: z
    .string({ required_error: "Username wajib diisi" })
    .min(1, { message: "Username masih kosong" }),
  nisn: z
    .string({ required_error: "NISN wajib diisi" })
    .min(1, { message: "NISN masih kosong" }),
  email: z.string().email("Email tidak valid").optional(),
  phone_number: z.string().optional(),
  school: z
    .string({ required_error: "Sekolah wajib diisi" })
    .min(1, { message: "Sekolah masih kosong" }),
});

export type StudentProfileForm = z.infer<typeof studentProfileSchema>;

interface EditProfileFormProps {
  defaultValues?: StudentProfileForm;
}

const EditProfileForm = ({ defaultValues }: EditProfileFormProps) => {
  const form = useForm<StudentProfileForm>({
    resolver: zodResolver(studentProfileSchema),
    defaultValues: defaultValues,
  });

  const mutateToast = useToastMutate({
    success: "Berhasil memperbarui profil",
  });

  const onSubmit: SubmitHandler<StudentProfileForm> = async (data) => {
    mutateToast.mutate(updateProfile(data));
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
                <Input type="text" {...field} />
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
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Telepon</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
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
                <Input type="text" {...field} disabled />
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

        <Button type="submit" loading={mutateToast.isLoading}>
          Perbarui Profil
        </Button>
      </form>
    </Form>
  );
};

export default EditProfileForm;
