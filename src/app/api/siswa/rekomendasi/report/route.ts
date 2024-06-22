import { protectedFetch } from "@/lib/api";
import { createPDFReport } from "@/lib/pdf";
import type { Recommendation, StudentData } from "@/types/data/recommendation";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const [recommendationRes, studentRes] = await Promise.all([
      await protectedFetch<Recommendation>("/v1/recommendations/student"),
      await protectedFetch<StudentData>("/v1/students/profile"),
    ]);
    if (!recommendationRes.data)
      return Response.json({ error: "Rekomendasi tidak ditemukan" });

    if (!studentRes.data)
      return Response.json({ error: "Data siswa tidak ditemukan" });

    const pdfUrl = new URL("/pdf/report_template.pdf", req.nextUrl.origin);
    const pdfTemplate = await fetch(pdfUrl);
    const pdfBuffer = await pdfTemplate.arrayBuffer();
    const pdfBytes = await createPDFReport(pdfBuffer, {
      studentName: studentRes.data.fullname,
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
