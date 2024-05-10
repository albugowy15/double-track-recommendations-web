"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SavePdfButton = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("/api/siswa/rekomendasi/report")}>
      Save as PDF
    </Button>
  );
};

export default SavePdfButton;
