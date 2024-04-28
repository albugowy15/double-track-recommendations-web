"use client";

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
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { changeAdminPasswordAction } from "../admin/ubah-password/actions";
import { changeStudentPasswordAction } from "../siswa/ubah-password/actions";
import { Button } from "@/components/ui/button";
import React from "react";
import { type Role } from "@/types/data/common";

interface ChangePasswordFormProps {
  variant: Role;
}

const changePasswordSchema = z.object({
  oldPassword: z
    .string({ required_error: "Password lama wajib diisi" })
    .min(8, { message: "Password lama minimal terdiri dari 8 karakter" })
    .max(16, { message: "Password lama maksimal terdiri dari 16 karakter" }),
  newPassword: z
    .string({ required_error: "Password baru wajib diisi" })
    .min(8, { message: "Password baru minimal terdiri dari 8 karakter" })
    .max(16, { message: "Password baru maksimal terdiri dari 16 karakter" }),
  confirmPassword: z
    .string({ required_error: "Konfirmasi password wajib diisi" })
    .min(8, { message: "Konfirmasi password minimal terdiri dari 8 karakter" })
    .max(16, {
      message: "Konfirmasi password maksimal terdiri dari 16 karakter",
    }),
});

type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

function ChangePasswordForm(props: ChangePasswordFormProps) {
  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const mutateChangePassword = useToastMutate({
    success: `Berhasil memperbarui password ${props.variant === "admin" ? "admin" : "siswa"}`,
  });

  const onSubmit: SubmitHandler<ChangePasswordSchema> = (data) => {
    if (props.variant === "admin") {
      mutateChangePassword.mutate(changeAdminPasswordAction(data));
    }
    if (props.variant === "student") {
      mutateChangePassword.mutate(changeStudentPasswordAction(data));
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Lama</FormLabel>
              <FormDescription>Masukkan password lama Anda</FormDescription>
              <FormControl>
                <Input {...field} placeholder="Password Lama" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Baru</FormLabel>
              <FormDescription>Masukkan password baru Anda</FormDescription>
              <FormControl>
                <Input {...field} placeholder="Password Baru" type="password" />
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
              <FormDescription>
                Masukkan kembali password baru Anda
              </FormDescription>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Konfirmasi password"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          loading={mutateChangePassword.isLoading}
        >
          Simpan
        </Button>
      </form>
    </Form>
  );
}

export { ChangePasswordForm, type ChangePasswordSchema };
