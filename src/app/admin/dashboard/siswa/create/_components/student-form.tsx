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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { asOptionalField } from "@/lib/utils";

const addStudentFormSchema = z.object({
  fullname: z
    .string({ required_error: "Nama lengkap wajib diisi" })
    .min(1, { message: "Nama lengkap tidak boleh kosong" }),
  nisn: z
    .string({ required_error: "Name lengkap wajib diisi" })
    .min(1, { message: "NISN tidak boleh kosong" }),
  email: asOptionalField(z.string().email({ message: "Email tidak valid" })),
  username: asOptionalField(
    z
      .string()
      .regex(/^\S+$/gm, {
        message: "Username tidak boleh terdapat spasi",
      })
      .max(20, { message: "Username tidak boleh lebih dari 20 karakter" }),
  ),
});

type AddStudentForm = z.infer<typeof addStudentFormSchema>;

interface StudentFormProps {
  data?: AddStudentForm;
}

export default function StudentForm({ data }: StudentFormProps) {
  console.log("data : ", data);
  const form = useForm<AddStudentForm>({
    resolver: zodResolver(addStudentFormSchema),
    defaultValues: {
      email: data?.email?.String ?? "",
      fullname: data?.fullname ?? "",
      nisn: data?.nisn ?? "",
      username: data?.username ?? "",
    },
  });

  const formTitle = data ? "Edit Siswa" : "Tambah Siswa";
  const formDescription = data
    ? "Silahkan isi formulir berikut untuk memperbarui data siswa"
    : "Silahkan isi formulir berikut untuk menambahkan siswa";

  const onSubmit: SubmitHandler<AddStudentForm> = (_data) => {
    // TODO: Handle submit
  };

  return (
    <Form {...form}>
      <Card>
        <CardHeader>
          <CardTitle>{formTitle}</CardTitle>
          <CardDescription>{formDescription}</CardDescription>
        </CardHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="mx-auto flex w-full flex-col gap-4">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nama Lengkap <span className="text-red-500">*</span>
                  </FormLabel>
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
                  <FormLabel>
                    NISN <span className="text-red-500">*</span>
                  </FormLabel>
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
          <CardFooter>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Simpan
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Form>
  );
}
