import SaveToPdf from "@/app/siswa/rekomendasi/_components/save-pdf";
import {
  type StudentData,
  type Recommendation,
} from "@/app/siswa/rekomendasi/page";
import { protectedFetch } from "@/lib/api";

export async function GET() {
  const recommendationsRes = await protectedFetch<Recommendation>(
    "/v1/recommendations/student",
  );

  if (!recommendationsRes.data)
    return Response.json({ error: "Rekomendasi tidak ditermukan" });

  const data_student = await protectedFetch<StudentData>(
    "/v1/students/profile",
  );

  if (!data_student.data)
    return Response.json({ error: "data siswa tidak ditermukan" });

  const pdfBytes = await SaveToPdf({
    topsis: recommendationsRes.data.topsis.result,
    topsis_ahp: recommendationsRes.data.topsis_ahp.result,
    ahp: recommendationsRes.data.ahp.result,
    fullname: data_student.data.fullname,
    nisn: data_student.data.nisn,
    school: data_student.data.school,
    consistency_avg: recommendationsRes.data.ahp.consistency_ratio,
  });

  return new Response(pdfBytes, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "private",
    },
  });
}
