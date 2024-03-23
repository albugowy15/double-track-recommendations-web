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
import { useToastMutate } from "@/lib/hooks";
import { editStudentAction } from "../../../actions";

const editStudentFormSchema = z.object({
  fullname: z
    .string({ required_error: "Nama lengkap wajib diisi" })
    .min(1, { message: "Nama lengkap tidak boleh kosong" }),
  nisn: z
    .string({ required_error: "NISN  wajib diisi" })
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
  phone_number: asOptionalField(
    z
      .string()
      .min(8, { message: "Nomor handphone tidak valid" })
      .max(14, { message: "Nomor handphone tidak valid" }),
  ),
});

export type EditStudentForm = z.infer<typeof editStudentFormSchema>;

export default function EditStudentForm(props: {
  prevData: EditStudentForm;
  studentId: string;
}) {
  const form = useForm<EditStudentForm>({
    resolver: zodResolver(editStudentFormSchema),
    defaultValues: props.prevData,
  });

  const mutateEditStudent = useToastMutate({
    success: "Berhasil memperbarui data siswa",
  });

  const onSubmit: SubmitHandler<EditStudentForm> = (data) => {
    mutateEditStudent.mutate(editStudentAction(props.studentId, data));
  };

  return (
    <Form {...form}>
      <Card>
        <CardHeader>
          <CardTitle>Edit Siswa</CardTitle>
          <CardDescription>
            Isi form berikut untuk memperbarui data siswa
          </CardDescription>
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
                  <FormLabel>
                    Username <span className="text-red-500">*</span>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
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
                  <FormLabel>Nomor HP</FormLabel>
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
