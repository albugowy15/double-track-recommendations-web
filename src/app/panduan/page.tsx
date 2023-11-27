import Typography from "@/components/typography";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Panduan",
  description: "Panduan aplikasi Rekomendasi Keterampilan Double Track",
};

export default function GuidePage() {
  return <Typography variant="h1">Halaman Panduan</Typography>;
}
