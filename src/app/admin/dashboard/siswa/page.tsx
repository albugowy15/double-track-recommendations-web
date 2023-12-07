import { columns } from "@/app/admin/dashboard/siswa/_column";
import { DataTable } from "@/app/admin/dashboard/_components/_data-table";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { UserPlus2 } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";
import { protectedFetch } from "@/lib/api";

// async function getData(): Promise<Student[]> {
//   return Promise.all(students);
// }

export const metadata: Metadata = {
  title: "Data Siswa",
};

export interface SchoolName {
  name: string;
}

export interface SchoolId {
  Int32: number;
  Valid: boolean;
}
export interface Email {
  String: string;
  Valid: boolean;
}

export interface Students {
  id: number;
  username: string;
  password: string;
  fullname: string;
  nisn: string;
  school_id: SchoolName;
  role: string;
  email: Email;
}

export interface Datas {
  school_name: SchoolName;
  students: Students;
}

async function getAllStudents() {
  const response = await protectedFetch<Datas[]>("/v1/admin/dashboard/siswa");
  return response;
}

export default async function AdminStudentDashboardPage() {
  // const students = await getData();
  const data = await getAllStudents();
  console.log("data : ", data);
  const studentData = data?.data?.students;

  return (
    <div className="mx-auto">
      <section className="flex justify-between pb-6">
        <div>
          <Typography variant="h2">Data Siswa</Typography>
          <Typography variant="body1">
            Berikut adalah data siswa dari{" "}
            <span className="font-semibold">
              {data?.data?.school_name?.name}
            </span>
          </Typography>
        </div>
        <Button variant="outline" asChild>
          <Link href="siswa/create">
            <UserPlus2 className="mr-2 h-5 w-5" />
            Tambah Siswa
          </Link>
        </Button>
      </section>
      <DataTable
        columns={columns}
        data={studentData}
        search={{
          column: "fullname",
          placeholder: "Cari siswa",
        }}
      />
    </div>
  );
}
