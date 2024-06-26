"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { type Dispatch, type SetStateAction, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import React from "react";
import { type Role } from "@/types/data/common";

const loginFormSchema = z.object({
  username: z.string({ required_error: "Username wajib diisi" }).min(6, {
    message: "Username minimal terdiri dari 6 karakter tanpa spasi",
  }),
  password: z.string({ required_error: "Password wajib diisi" }).min(6, {
    message: "Password minimal terdiri dari 6 karakter tanpa spasi",
  }),
});

type LoginForm = z.infer<typeof loginFormSchema>;

interface LoginInputProps {
  activeTab: Role;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const LoginInput = ({
  isLoading,
  setIsLoading,
  activeTab,
}: LoginInputProps) => {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
  });
  const { toast } = useToast();

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      username: data.username,
      password: data.password,
      type: activeTab,
      redirect: false,
    })
      .then((res) => {
        if (res?.ok) {
          toast({
            title: "Success",
            description: "Login berhasil",
          });
          window.location.replace(
            activeTab == "admin" ? "/admin/dashboard" : "/",
          );
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: res?.error,
          });
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          description: err.error,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [showPassword, setShowPassword] = React.useState(false);
  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormDescription>Masukkan username Anda</FormDescription>
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
              <FormDescription>Masukkan password Anda</FormDescription>
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

        <Button type="submit" className="w-full" loading={isLoading}>
          Login
        </Button>
      </form>
    </Form>
  );
};

export const LoginForm = () => {
  const [tab, setTab] = useState<Role>("student");
  const [buttonLoading, setButtonLoading] = useState(false);

  return (
    <>
      <Tabs defaultValue={tab} className="mx-auto md:w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="student" onClick={() => setTab("student")}>
            Siswa
          </TabsTrigger>
          <TabsTrigger value="admin" onClick={() => setTab("admin")}>
            Admin
          </TabsTrigger>
        </TabsList>
        <TabsContent value="student">
          <Card>
            <CardHeader>
              <CardTitle>Login Akun Siswa</CardTitle>
              <CardDescription>
                Silahkan login menggunakan username dan password yang telah
                diberikan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginInput
                activeTab={tab}
                isLoading={buttonLoading}
                setIsLoading={setButtonLoading}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle>Login Akun Administrator</CardTitle>
              <CardDescription>
                Silahkan login menggunakan username dan password administrator
                Anda.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginInput
                activeTab={tab}
                isLoading={buttonLoading}
                setIsLoading={setButtonLoading}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};
