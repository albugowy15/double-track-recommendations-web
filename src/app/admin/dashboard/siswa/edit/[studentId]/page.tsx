import StudentForm from "@/app/admin/dashboard/siswa/create/_components/student-form";
import { type Student, students } from "@/data/siswa";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Siswa",
};

function getSiswaDetail(studentId: string): Student {
  const student = students.find((val) => val.id == studentId);
  if (!student) {
    throw new Error("Siswa tidak ditemukan");
  }
  return student;
}

export default function EditStudentPage({
  params,
}: {
  params: { studentId: string };
}) {
  const student = getSiswaDetail(params.studentId);
  return <StudentForm data={student} />;
}
