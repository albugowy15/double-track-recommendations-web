import { type Metadata } from "next";

import { LoginForm } from "@/app/auth/login/_components/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login ke Aplikasi rekomendasi keterampilan double track",
};

export default function LoginPage() {
  return (
    <main className="mx-auto w-fit">
      <LoginForm />
    </main>
  );
}
