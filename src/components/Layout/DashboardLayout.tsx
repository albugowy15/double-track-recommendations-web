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
import { Footer, Navbar } from '@/components/Layout/BaseLayout';
import Modal from '@/components/Modal';
import Typography from '@/components/Typography';

const dashboradMenu = [
  {
    path: '/admin/dashboard',
    name: 'Beranda',
    icon: BsFillHouseDoorFill,
  },
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
        <div className='mx-auto flex w-full flex-col md:flex-row md:gap-4'>
          <button
            className='m-2 flex justify-center rounded border bg-white p-2 hover:cursor-pointer md:hidden'
            onClick={() => setIsMenuOpen(true)}
          >
            <Typography variant='label1' className='flex items-center gap-2'>
              <FiMenu size={16} />
              Menu
            </Typography>
          </button>
          {/* <section className='flex justify-center overflow-scroll py-3 md:hidden'>
          {dashboradMenu.map((menu, index) => (
            <BasicLink
              key={index}
              href={menu.path}
              className={clsx('rounded-lg px-2 py-1.5 text-sm', [
                router.pathname === menu.path
                  ? 'bg-primary-500 text-slate-100 hover:bg-primary-500 hover:text-slate-100'
                  : 'hover:bg-slate-200',
              ])}
            >
              {menu.name}
            </BasicLink>
          ))}
        </section> */}
          <aside className='hidden h-screen flex-col gap-2 bg-white p-6 md:flex'>
            {dashboradMenu.map((menu, index) => (
              <BasicLink
                key={index}
                href={menu.path}
                className={clsx('rounded-lg px-4 py-2 hover:bg-slate-200', [
                  router.pathname === menu.path &&
                    'bg-primary-500 text-slate-100 hover:bg-primary-500 hover:text-slate-100',
                ])}
              >
                <span>
                  <menu.icon
                    className={clsx('mr-3 inline', [
                      router.pathname !== menu.path && 'text-primary-500',
                    ])}
                    size={20}
                  />
                </span>{' '}
                {menu.name}
              </BasicLink>
            ))}
          </aside>
          <main className='p-5'>{children}</main>
        </div>
        <Footer />
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
            {dashboradMenu.map((menu, index) => (
              <BasicLink
                key={index}
                onClick={() => setIsMenuOpen(false)}
                href={menu.path}
                className={clsx('flex items-center gap-3 py-3', [
                  router.pathname === menu.path
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
