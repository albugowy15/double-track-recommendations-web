import { type Metadata } from "next";
import EditStudentForm from "./_components/edit-student-form";
import { protectedFetch } from "@/lib/api";
import { type Student } from "@/data/siswa";

export const metadata: Metadata = {
  title: "Edit Siswa",
};

export default async function EditStudentPage({
  params,
}: {
  params: { studentId: string };
}) {
  const studentResponse = await protectedFetch<Student>(
    "/v1/students/" + params.studentId,
  );
  if (!studentResponse?.data) return null;
  return (
    <EditStudentForm
      studentId={params.studentId}
      prevData={{
        fullname: studentResponse.data.fullname,
        nisn: studentResponse.data.nisn,
        username: studentResponse.data.username,
        email: studentResponse.data.email,
        phone_number: studentResponse.data.phone_number,
      }}
    />
  );
}
