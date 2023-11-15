import { columns } from "@/app/admin/dashboard/siswa/_column";
import { DataTable } from "@/app/admin/dashboard/siswa/_data-table";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { type Student, students } from "@/data/siswa";
import { UserPlus2 } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

async function getData(): Promise<Student[]> {
  return Promise.all(students);
}

export const metadata: Metadata = {
  title: "Data Siswa",
};

export default async function AdminStudentDashboardPage() {
  const students = await getData();
  return (
    <div className="mx-auto">
      <section className="flex justify-between pb-6">
        <div>
          <Typography variant="h2">Data Siswa</Typography>
          <Typography variant="body1">
            Berikut adalah data siswa dari{" "}
            <span className="font-semibold">SMA N 1 Surabaya</span>
          </Typography>
        </div>
        <Button variant="outline" asChild>
          <Link href="siswa/create">
            <UserPlus2 className="mr-2 h-5 w-5" />
            Tambah Siswa
          </Link>
        </Button>
      </section>
      <DataTable columns={columns} data={students} />
    </div>
  );
}
