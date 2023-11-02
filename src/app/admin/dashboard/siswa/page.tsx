'use client';

import { useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsPersonAdd } from 'react-icons/bs';

import { Button, LinkButton } from '@/components/Button';
import Modal from '@/components/Modal';
import Typography from '@/components/typography';

import { Student, students } from '@/data/siswa';

export default function StudentDasboardPage() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [listStudent, setListStudent] = useState(students);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleDelete = () => {
    setListStudent(
      listStudent.filter((student) => student !== selectedStudent),
    );
    setDeleteModal(false);
  };
  return (
    <>
      <div className='flex w-full items-center justify-between'>
        <Typography variant='h3'>Daftar Siswa</Typography>
        <LinkButton href='siswa/add' variant='outlined' icon={BsPersonAdd}>
          Tambah Siswa
        </LinkButton>
      </div>
      <div className='w-full overflow-x-auto pt-2 text-sm shadow-md sm:rounded-lg'>
        <table className='w-full text-left'>
          <thead className='bg-gray-200 uppercase'>
            <tr>
              <th scope='col' className='px-2.5 py-2'>
                No.
              </th>
              <th scope='col' className='px-2.5 py-2'>
                Nama Lengkap
              </th>
              <th scope='col' className='px-2.5 py-2'>
                NISN
              </th>
              <th scope='col' className='px-2.5 py-2'>
                Sekolah
              </th>
              <th scope='col' className='px-2.5 py-2'>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {listStudent.map((student, index) => (
              <tr className='border-b bg-white' key={student.id}>
                <th
                  scope='row'
                  className='whitespace-nowrap px-2.5 py-2 font-medium'
                >
                  {index + 1}
                </th>
                <td className='px-2.5 py-2'>{student.fullname}</td>
                <td className='px-2.5 py-2'>{student.nisn}</td>
                <td className='px-2.5 py-2'>{student.school}</td>
                <td className='flex flex-col items-center gap-2 px-2.5 py-2 md:flex-row'>
                  <Button
                    variant='danger'
                    icon={AiOutlineDelete}
                    size='sm'
                    onClick={() => {
                      setSelectedStudent(student);
                      setDeleteModal(true);
                    }}
                  >
                    Hapus
                  </Button>
                  <LinkButton
                    href={`/admin/dashboard/siswa/${student.id}`}
                    variant='filled'
                    icon={AiOutlineEdit}
                    size='sm'
                  >
                    Edit
                  </LinkButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        title='Konfirmasi menghapus data siswa'
        isOpen={deleteModal}
        setIsOpen={setDeleteModal}
      >
        <div className='flex flex-col gap-3 pt-3'>
          <Typography variant='body1'>
            Apakah Anda yakin ingin menghapus siswa berikut ?
          </Typography>
          <div>
            <Typography variant='body1'>
              <strong>Nama Lengkap</strong> : {selectedStudent?.fullname}
            </Typography>
            <Typography variant='body1'>
              <strong>NISN</strong> : {selectedStudent?.nisn}
            </Typography>
            <Typography variant='body1'>
              <strong>Sekolah</strong> : {selectedStudent?.school}
            </Typography>
          </div>

          <div className='flex justify-between'>
            <Button variant='text' onClick={handleDelete}>
              Ya, Hapus
            </Button>
            <Button variant='text' onClick={() => setDeleteModal(false)}>
              Batal
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
