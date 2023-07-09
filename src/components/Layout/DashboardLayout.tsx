import clsx from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';
import {
  BsFillClipboardDataFill,
  BsFillHouseDoorFill,
  BsFillPersonVcardFill,
  BsNewspaper,
} from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';

import BasicLink from '@/components/BasicLink';
import { Button } from '@/components/Button';
import { Navbar } from '@/components/Layout/BaseLayout';
import Modal from '@/components/Modal';
import Typography from '@/components/Typography';

const dashboradMenu = [
  {
    path: '/admin/dashboard/siswa',
    name: 'Siswa',
    icon: BsFillPersonVcardFill,
  },
  {
    path: '/admin/dashboard/hasil-rekomendasi',
    name: 'Hasil Rekomendasi',
    icon: BsFillClipboardDataFill,
  },
  {
    path: '/admin/dashboard/kuesioner',
    name: 'Kuesioner',
    icon: BsNewspaper,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <div className='flex min-h-screen flex-col'>
        <Navbar />
        <div className='mx-auto flex w-full flex-col lg:flex-row lg:gap-4'>
          <button
            className='m-2 flex justify-center rounded border bg-white p-2 hover:cursor-pointer lg:hidden'
            onClick={() => setIsMenuOpen(true)}
          >
            <Typography variant='label1' className='flex items-center gap-2'>
              <FiMenu size={16} />
              Menu
            </Typography>
          </button>

          <aside className='hidden h-screen w-[30%] flex-col gap-2 bg-white p-6 lg:flex'>
            <BasicLink
              href='/admin/dashboard'
              className={clsx('rounded-lg px-4 py-2 ', [
                router.pathname === '/admin/dashboard'
                  ? 'bg-primary-500 text-slate-100'
                  : 'hover:bg-slate-200',
              ])}
            >
              <span>
                <BsFillHouseDoorFill
                  className={clsx('mr-3 inline', [
                    router.pathname === '/admin/dashboard' && 'text-white',
                  ])}
                  size={20}
                />
              </span>{' '}
              Beranda
            </BasicLink>
            {dashboradMenu.map((menu, index) => (
              <BasicLink
                key={index}
                href={menu.path}
                className={clsx('rounded-lg px-4 py-2 ', [
                  router.pathname.startsWith(menu.path)
                    ? 'bg-primary-500 text-slate-100'
                    : 'hover:bg-slate-200',
                ])}
              >
                <span>
                  <menu.icon
                    className={clsx('mr-3 inline', [
                      router.pathname.startsWith(menu.path) && 'text-white',
                    ])}
                    size={20}
                  />
                </span>{' '}
                {menu.name}
              </BasicLink>
            ))}
          </aside>
          <main className='w-full p-5'>{children}</main>
        </div>
      </div>
      <Modal
        title='Menu Dashboard'
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
      >
        <div className='py-2'>
          <Typography variant='body1' className='text-neutral-400'>
            Berikut daftar menu dashboard admin yang dapat diakses
          </Typography>
          <div className='flex w-full flex-col divide-y divide-neutral-700 py-2 text-neutral-100'>
            <BasicLink
              onClick={() => setIsMenuOpen(false)}
              href='/admin/dashboard'
              className={clsx('flex items-center gap-3 py-3', [
                router.pathname === '/admin/dashboard'
                  ? 'text-primary-400'
                  : 'hover:text-slate-700',
              ])}
            >
              <BsFillHouseDoorFill className='text-lg' />
              Beranda
            </BasicLink>
            {dashboradMenu.map((menu, index) => (
              <BasicLink
                key={index}
                onClick={() => setIsMenuOpen(false)}
                href={menu.path}
                className={clsx('flex items-center gap-3 py-3', [
                  router.pathname.startsWith(menu.path)
                    ? 'text-primary-400'
                    : 'hover:text-slate-700',
                ])}
              >
                <menu.icon className='text-lg' />
                {menu.name}
              </BasicLink>
            ))}
          </div>

          <div className='flex justify-end'>
            <Button variant='outlined' onClick={() => setIsMenuOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
