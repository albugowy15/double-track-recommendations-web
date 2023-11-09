"use client";

import { useState } from "react";

import Typography from "@/components/typography";

import { type Student, students } from "@/data/siswa";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StudentDasboardPage() {
  const [listStudent, setListStudent] = useState(students);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleDelete = () => {
    setListStudent(
      listStudent.filter((student) => student !== selectedStudent),
    );
  };
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <Typography variant="h3">Daftar Siswa</Typography>
        <Button variant="outline" asChild>
          <Link href="siswa/add">Tambah Siswa</Link>
        </Button>
      </div>
      <div className="w-full overflow-x-auto pt-2 text-sm shadow-md sm:rounded-lg">
        <table className="w-full text-left">
          <thead className="bg-gray-200 uppercase">
            <tr>
              <th scope="col" className="px-2.5 py-2">
                No.
              </th>
              <th scope="col" className="px-2.5 py-2">
                Nama Lengkap
              </th>
              <th scope="col" className="px-2.5 py-2">
                NISN
              </th>
              <th scope="col" className="px-2.5 py-2">
                Sekolah
              </th>
              <th scope="col" className="px-2.5 py-2">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {listStudent.map((student, index) => (
              <tr className="border-b bg-white" key={student.id}>
                <th
                  scope="row"
                  className="whitespace-nowrap px-2.5 py-2 font-medium"
                >
                  {index + 1}
                </th>
                <td className="px-2.5 py-2">{student.fullname}</td>
                <td className="px-2.5 py-2">{student.nisn}</td>
                <td className="px-2.5 py-2">{student.school}</td>
                <td className="flex flex-col items-center gap-2 px-2.5 py-2 md:flex-row">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setSelectedStudent(student);
                    }}
                  >
                    Hapus
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/admin/dashboard/siswa/${student.id}`}></Link>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
