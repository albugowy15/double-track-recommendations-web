import StudentForm from "@/app/admin/dashboard/siswa/create/_components/student-form";
import { protectedFetch } from "@/lib/api";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Siswa",
};

export interface Email {
  String: string;
  Valid: boolean;
}

export interface StudentById {
  id: number;
  fullname: string;
  nisn: string;
  username: string;
  email: string;
}

async function getStudentById(studentId: string) {
  const response = await protectedFetch<StudentById>(`/v1/siswa/${studentId}`);
  return response.data;
}

// function getSiswaDetail(studentId: string): Student {
//   const student = students.find((val) => val.id == studentId);
//   if (!student) {
//     throw new Error("Siswa tidak ditemukan");
//   }
//   return student;
// }

export default async function EditStudentPage({
  params,
}: {
  params: { studentId: string };
}) {
  const data = await getStudentById(params.studentId);
  return <StudentForm prevData={data} />;
}
