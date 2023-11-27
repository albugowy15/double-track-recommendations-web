import Typography from "@/components/typography";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang",
  description: "Tentang aplikasi Rekomendasi Keterampilan Double Track",
};

export default function AboutPage() {
  return <Typography variant="h1">Halaman Tentang</Typography>;
}
