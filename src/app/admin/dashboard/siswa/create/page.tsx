import StudentForm from "@/app/admin/dashboard/siswa/create/_components/student-form";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Tambah Siswa",
};

export default function AddStudentPage() {
  return <StudentForm />;
}
