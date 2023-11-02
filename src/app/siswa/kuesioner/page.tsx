'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/Button';
import Modal from '@/components/Modal';
import Typography from '@/components/typography';

import { questionnare } from '@/data/kuesioner';

export default function QuestionnarePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const onSubmit = () => {
    setOpenModal(true);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mx-auto flex flex-col gap-3 lg:max-w-4xl'
      >
        <Typography variant='h4' className='text-center'>
          Kuesioner Preferensi Siswa Pada Keterampilan Double Track
        </Typography>
        <Typography variant='body1' className='text-center'>
          Diharapkan mengisi kuesioner ini dengan sungguh-sungguh dan teliti
          agar mendapatkan rekomendasi keterampilan yang dapat Anda ambil dengan
          akurat.
        </Typography>
        {questionnare.map((question, index) => (
          <div
            key={question.id}
            className='space-y-2 rounded border border-slate-500 p-3'
          >
            <Typography variant='body1'>
              {index + 1}. {question.question}{' '}
              <span className='text-red-500'>*</span>
            </Typography>
            <div
              className={clsx('flex justify-start gap-3', [
                question.options.length > 4
                  ? 'flex-col items-start md:flex-row md:items-end'
                  : 'flex-row items-end',
              ])}
            >
              <Typography variant='body1'>{question.minText}</Typography>
              {question.options?.map((option, index) => (
                <div key={index} className='flex flex-col items-center gap-1'>
                  <label className='text-sm'>{option}</label>
                  <input
                    type='radio'
                    value={option}
                    {...register(question.id, { required: true })}
                  />
                </div>
              ))}

              <Typography variant='body1'>{question.maxText}</Typography>
            </div>
            {errors[question.id] ? (
              <Typography variant='label1' className='text-red-600'>
                Pertanyaan ini wajib diisi
              </Typography>
            ) : null}
          </div>
        ))}
        <Button type='submit' variant='filled' className='w-fit'>
          Submit
        </Button>
      </form>

      <Modal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        title='Jawaban tidak konsisten'
      >
        <>
          <Typography variant='body1'>
            Indeks Konsisten (Consistency Index) dari hasil kuesioner Anda lebih
            dari 0,1
          </Typography>
          <Typography variant='body1' className='py-4 font-bold text-red-600'>
            Indeks Konsistensi Anda = 0,42333
          </Typography>
          <Typography variant='body1'>
            Apakah Anda yakin ingin melanjutkan?
          </Typography>

          <div className='my-3 rounded-lg border border-gray-600 bg-yellow-300 p-2'>
            <Typography variant='body1' className='font-bold'>
              Keterangan :{' '}
            </Typography>
            <Typography variant='body1'>
              Indeks Konsistensi sangat berpengaruh pada rekomendasi
              keterampilan. Semakin besar nilai indeks konsitensi akan berdampak
              semakin tidak akuratnya rekomendasi yang dihasilkan.
            </Typography>
          </div>
          <div className='py-2' />
          <div className='flex justify-between'>
            <Button
              variant='tonal'
              onClick={() => {
                router.replace('/siswa/rekomendasi');
                setOpenModal(false);
              }}
            >
              Ya, Lanjutkan
            </Button>
            <Button variant='outlined' onClick={() => setOpenModal(false)}>
              Tidak, Ulangi Kuesioner
            </Button>
          </div>
        </>
      </Modal>
    </>
  );
}
