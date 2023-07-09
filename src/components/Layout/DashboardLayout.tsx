import clsx from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';
import {
  BsFillClipboardDataFill,
  BsFillPersonVcardFill,
  BsNewspaper,
} from 'react-icons/bs';

import BasicLink from '@/components/BasicLink';
import { Footer, Navbar } from '@/components/Layout/BaseLayout';

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

  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <div className='mx-auto flex w-full flex-col md:flex-row md:gap-4'>
        <section className='flex justify-center gap-2 py-3 md:hidden'>
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
                  className={clsx('mr-1 inline', [
                    router.pathname !== menu.path && 'text-primary-500',
                  ])}
                  size={20}
                />
              </span>{' '}
              {menu.name}
            </BasicLink>
          ))}
        </section>
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
  );
}
