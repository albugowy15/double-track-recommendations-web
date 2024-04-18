import { columns } from "@/app/admin/dashboard/siswa/column";
import { DataTable } from "@/app/admin/dashboard/_components/data-table";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { UserPlus2 } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";
import { protectedFetch } from "@/lib/api";
import { type Student } from "@/types/data/student";

export const metadata: Metadata = {
  title: "Data Siswa",
  description: "Data Siswa yang telah terdaftar",
};

export default async function AdminStudentDashboardPage() {
  const [schoolResponse, studentResponse] = await Promise.all([
    protectedFetch<{ id: string; name: string }>("/v1/school"),
    protectedFetch<Student[]>("/v1/students"),
  ]);
  if (!studentResponse && !schoolResponse) return null;

  return (
    <div className="mx-auto">
      <section className="flex justify-between pb-6">
        <div>
          <Typography variant="h2">Data Siswa</Typography>
          <Typography variant="body1">
            Berikut adalah data siswa dari{" "}
            <span className="font-semibold">{schoolResponse.data?.name}</span>
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
        data={studentResponse.data ?? []}
        search={{
          column: "fullname",
          placeholder: "Cari siswa",
        }}
      />
    </div>
  );
}
