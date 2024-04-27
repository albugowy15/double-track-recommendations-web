import { type Metadata } from "next";

import { LoginForm } from "@/app/auth/login/_components/login-form";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/config/auth";

export const metadata: Metadata = {
  title: "Login",
  description: "Login ke Aplikasi rekomendasi keterampilan double track",
};

export default async function LoginPage() {
  const session = await getServerAuthSession();
  if (session) redirect("/");

  return (
    <main className="mx-auto w-fit px-3 pt-5 md:container">
      <LoginForm />
    </main>
  );
}
