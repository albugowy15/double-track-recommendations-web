import { Inter } from "next/font/google";

import "@/styles/globals.css";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { Toaster } from "@/components/ui/toaster";

import { getServerAuthSession } from "@/config/auth";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body className="flex min-h-screen flex-col bg-background font-sans antialiased">
        <Toaster />
        <Navbar session={session} />
        <div className="px-3 pt-5 md:container">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
