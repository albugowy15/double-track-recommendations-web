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
import { useToastMutate } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { updateAdminProfileAction } from "../../actions";
import { asOptionalField } from "@/lib/utils";

const editAdminProfileSchema = z.object({
  username: z
    .string({ required_error: "Username wajib diisi" })
    .min(1, { message: "Username wajib diisi" })
    .max(30, { message: "Username maksimal 30 karakter" }),
  email: asOptionalField(
    z
      .string({ required_error: "Email wajib diisi" })
      .min(1, { message: "Email wajib diisi" })
      .email({ message: "Email tidak valid" }),
  ),
  phone_number: asOptionalField(
    z
      .string({ required_error: "Nomor HP wajib diisi" })
      .min(8, { message: "Nomor HP tidak valid" })
      .max(15, { message: "Nomor HP tidak valid" }),
  ),
});

export type EditAdminProfileForm = z.infer<typeof editAdminProfileSchema>;

export default function EditAdminProfileForm({
  prev,
}: {
  prev: EditAdminProfileForm;
}) {
  const form = useForm<EditAdminProfileForm>({
    resolver: zodResolver(editAdminProfileSchema),
    defaultValues: prev,
  });

  const mutateUpdateAdminProfileToast = useToastMutate({
    success: "Berhasil memperbarui profil admin",
  });

  const onSubmit: SubmitHandler<EditAdminProfileForm> = (data) => {
    mutateUpdateAdminProfileToast.mutate(updateAdminProfileAction(data));
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
          <CardFooter className="flex justify-center">
            <Button
              type="submit"
              loading={mutateUpdateAdminProfileToast.isLoading}
            >
              <Save className="mr-2 h-4 w-4" /> Simpan
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
