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
import { useToastMutate } from "@/lib/hooks";
import { addStudentAction } from "../../actions";

const addStudentFormSchema = z.object({
  fullname: z
    .string({ required_error: "Nama lengkap wajib diisi" })
    .min(1, { message: "Nama lengkap tidak boleh kosong" }),
  nisn: z
    .string({ required_error: "NISN  wajib diisi" })
    .min(1, { message: "NISN tidak boleh kosong" }),
});

export type AddStudentForm = z.infer<typeof addStudentFormSchema>;

export default function StudentForm() {
  const form = useForm<AddStudentForm>({
    resolver: zodResolver(addStudentFormSchema),
  });

  const mutateStudentToast = useToastMutate({
    success: "Berhasil menambahkan siswa",
  });

  const onSubmit: SubmitHandler<AddStudentForm> = (data) => {
    mutateStudentToast.mutate(addStudentAction(data));
  };

  return (
    <Form {...form}>
      <Card>
        <CardHeader>
          <CardTitle>Tambah Siswa</CardTitle>
          <CardDescription>
            Isi form berikut untuk menambah siswa
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
