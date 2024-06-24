import { protectedFetch } from "@/lib/api";
import { createPDFReport } from "@/lib/pdf";
import type { Recommendation } from "@/types/data/recommendation";
import { type StudentProfileResponse } from "@/types/data/student";
import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    const [recommendationRes, studentRes] = await Promise.all([
      protectedFetch<Recommendation>("/v1/recommendations/student"),
      protectedFetch<StudentProfileResponse>("/v1/students/profile"),
    ]);
    if (!recommendationRes.data)
      return Response.json({ error: "Rekomendasi tidak ditemukan" });
    if (!studentRes.data)
      return Response.json({ error: "Data siswa tidak ditemukan" });

    const pdfUrl = new URL("/pdf/report_template.pdf", req.nextUrl.origin);
    const pdfTemplate = await fetch(pdfUrl);
    const pdfBuffer = await pdfTemplate.arrayBuffer();
    const pdfBytes = await createPDFReport(pdfBuffer, {
      student: studentRes.data,
      consistencyRatio: recommendationRes.data.ahp.consistency_ratio,
      ahpResults: recommendationRes.data.ahp.result,
    });

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Cache-Control": "private",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
