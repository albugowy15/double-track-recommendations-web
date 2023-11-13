"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const editAdminProfileSchema = z.object({
  name: z
    .string({ required_error: "Nama wajib diisi" })
    .min(1, { message: "Nama wajib diisi" })
    .max(100, { message: "Nama maksimal 100 karakter" }),
  username: z
    .string({ required_error: "Username wajib diisi" })
    .min(1, { message: "Username wajib diisi" })
    .max(30, { message: "Username maksimal 30 karakter" }),
  school_name: z
    .string({ required_error: "Asal sekolah wajib diisi" })
    .min(1, { message: "Asal sekolah wajib diisi" }),
  nik: z
    .string({ required_error: "NIK wajib diisi" })
    .min(16, { message: "NIK minimal 16 karakter" })
    .max(16, { message: "NIK maksimal 16 karakter" }),
  email: z
    .string({ required_error: "Email wajib diisi" })
    .min(1, { message: "Email wajib diisi" })
    .email({ message: "Email tidak valid" }),
});

type EditAdminProfileForm = z.infer<typeof editAdminProfileSchema>;

export default function EditAdminProfileForm({
  prev,
}: {
  prev: EditAdminProfileForm;
}) {
  const form = useForm<EditAdminProfileForm>({
    resolver: zodResolver(editAdminProfileSchema),
    defaultValues: {
      email: prev.email,
      name: prev.name,
      nik: prev.nik,
      school_name: prev.school_name,
      username: prev.username,
    },
  });

  const onSubmit: SubmitHandler<EditAdminProfileForm> = (data) => {
    // TODO: post data
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mx-auto w-full min-w-fit sm:w-[500px]">
          <CardHeader>
            <CardTitle>Edit Profile Admin</CardTitle>
            <CardDescription>
              Silahkan edit profil admin Anda. Klik Simpan setelah melakukan
              perubahan.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
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
              name="school_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asal Sekolah</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nik"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIK</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> Simpan
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
