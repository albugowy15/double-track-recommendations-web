import StudentForm from "@/app/admin/dashboard/siswa/create/_components/student-form";
import { type Student } from "@/data/siswa";
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
  username: string;
  nisn: string;
  school_name: string;
  email: Email;
}

async function getStudentById(studentId: string): Promise<Student | undefined> {
  const response = await protectedFetch<Student>(`/v1/siswa/${studentId}`);
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
  console.log("email : ", data?.siswa?.email?.String);
  return <StudentForm data={data?.siswa} />;
}
