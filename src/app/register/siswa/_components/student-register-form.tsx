"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToastMutate } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerStudentAction } from "../actions";
import { type SchoolResponse } from "@/types/data/school";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const studentRegisterSchema = z.object({
  fullname: z
    .string({ required_error: "Nama lengkap wajib diisi" })
    .min(1, { message: "Nama lengkap wajib diisi" }),
  nisn: z
    .string({ required_error: "NISN wajib diisi" })
    .min(1, { message: "NISN wajib diisi" }),
  email: z
    .string({ required_error: "Email wajib diisi" })
    .min(1, { message: "Email wajib diisi" })
    .email({ message: "Email tidak valid" }),
  school: z
    .string({ required_error: "Sekolah wajib diisi" })
    .min(1, { message: "Sekolah wajib diisi" }),
  username: z.string({ required_error: "Username wajib diisi" }).min(6, {
    message: "Username minimal terdiri dari 6 karakter tanpa spasi",
  }),
  password: z.string({ required_error: "Password wajib diisi" }).min(6, {
    message: "Password minimal terdiri dari 6 karakter tanpa spasi",
  }),
  confirmPassword: z
    .string({ required_error: "Konfirmasi password wajib diisi" })
    .min(6, {
      message:
        "Konfirmasi password minimal terdiri dari 6 karakter tanpa spasi",
    }),
});

type StudentRegisterSchema = z.infer<typeof studentRegisterSchema>;

interface StudentRegisterFormProps {
  schools: SchoolResponse[];
}

function StudentRegisterForm(props: StudentRegisterFormProps) {
  const form = useForm<StudentRegisterSchema>({
    resolver: zodResolver(studentRegisterSchema),
  });

  const mutateRegisterStudent = useToastMutate({
    success: "Berhasil membuat akun siswa",
  });
  function onSubmit(data: StudentRegisterSchema) {
    const isConfirmPasswordMatch = data.password === data.confirmPassword;
    if (!isConfirmPasswordMatch) {
      form.setError("confirmPassword", {
        message: "Konfirmasi password tidak sama",
      });
      return;
    }
    mutateRegisterStudent.mutate(registerStudentAction(data));
  }

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleShowConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama lengkap</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Nama Lengkap" />
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
              <FormLabel>NISN</FormLabel>
              <FormDescription>
                Lupa NISN?{" "}
                <a
                  className="text-blue-600 font-bold"
                  href="https://nisn.data.kemdikbud.go.id/index.php/Cindex/formcaribynama"
                  target="_blank"
                >
                  Cari NISN
                </a>
              </FormDescription>
              <FormControl>
                <Input {...field} type="text" placeholder="NISN" />
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
                <Input {...field} type="email" placeholder="Email" />
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
              <FormLabel>Sekolah</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih sekolah" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {props.schools.map((school) => (
                    <SelectItem key={school.id} value={school.id}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormDescription>Minimal 6 karakter tanpa spasi</FormDescription>
              <FormControl>
                <Input {...field} type="text" placeholder="Username" />
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
              <FormDescription>Minimal 6 karakter tanpa spasi</FormDescription>
              <FormControl>
                <div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...field}
                    placeholder="Password"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm py-1 font-medium text-blue-600 cursor-pointer w-fit"
                      onClick={handleShowPassword}
                    >
                      {showPassword ? "Sembunyikan" : "Tampilkan"} password
                    </button>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konfirmasi Password</FormLabel>
              <FormDescription>Masukkan kembali password Anda</FormDescription>
              <FormControl>
                <div>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    {...field}
                    placeholder="Password"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm py-1 font-medium text-blue-600 cursor-pointer w-fit"
                      onClick={handleShowConfirmPassword}
                    >
                      {showConfirmPassword ? "Sembunyikan" : "Tampilkan"}{" "}
                      password
                    </button>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          loading={mutateRegisterStudent.isLoading}
          variant="default"
          type="submit"
          className="w-full"
        >
          Register
        </Button>
      </form>
    </Form>
  );
}

export { StudentRegisterForm, type StudentRegisterSchema };
