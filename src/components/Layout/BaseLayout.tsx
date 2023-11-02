import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  AiOutlineAppstore,
  AiOutlineBulb,
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineSolution,
} from 'react-icons/ai';
import { BiLogIn } from 'react-icons/bi';
import {
  BsBook,
  BsFillPersonFill,
  BsNewspaper,
  BsPersonCircle,
} from 'react-icons/bs';
import { CgMenuGridR } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';

import BasicLink from '@/components/BasicLink';
import { Button } from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import Loader from '@/components/Loader';
import Modal from '@/components/Modal';
import Typography from '@/components/typography';

export const Navbar = () => {
  const { data: session, status } = useSession();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <header className='w-full border bg-white shadow-sm'>
        <div className='container mx-auto flex items-center justify-between px-3 py-2'>
          <BasicLink href='/' className='text-base font-bold md:text-xl'>
            DT Rekomendasi
          </BasicLink>
          <nav className='flex items-center gap-2'>
            <Button
              variant='outlined'
              icon={CgMenuGridR}
              onClick={() => setOpenMenu(true)}
            >
              Menu
            </Button>
            {status == 'loading' ? (
              <Loader />
            ) : (
              <>
                {session?.user ? (
                  <Dropdown
                    menuButton={
                      <div className='flex h-fit items-center justify-center rounded-full border border-neutral-400 p-2.5 hover:bg-neutral-900'>
                        <BsFillPersonFill className='text-base text-primary-400' />
                      </div>
                    }
                    options={
                      <>
                        {session.user.role == 'admin' ? (
                          <Menu.Item>
                            {({ active }) => (
                              <BasicLink
                                className={clsx(
                                  'flex w-full items-center gap-3 rounded px-2 py-1.5 ',
                                  [
                                    active
                                      ? 'bg-primary-500 text-neutral-50'
                                      : 'text-neutral-200',
                                  ],
                                )}
                                href='/admin/profil'
                              >
                                <BsNewspaper
                                  className={clsx([
                                    active ? 'text-white' : 'text-primary-500',
                                  ])}
                                />
                                Profil
                              </BasicLink>
                            )}
                          </Menu.Item>
                        ) : (
                          <Menu.Item>
                            {({ active }) => (
                              <BasicLink
                                className={clsx(
                                  'flex w-full items-center gap-3 rounded px-2 py-1.5 ',
                                  [
                                    active
                                      ? 'bg-primary-500 text-neutral-50'
                                      : 'text-neutral-200',
                                  ],
                                )}
                                href='/siswa/profil'
                              >
                                <BsPersonCircle
                                  className={clsx([
                                    active ? 'text-white' : 'text-primary-500',
                                  ])}
                                />
                                Profil
                              </BasicLink>
                            )}
                          </Menu.Item>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => signOut()}
                              className={clsx(
                                'flex w-full items-center gap-3 rounded px-2 py-1.5 ',
                                [
                                  active
                                    ? 'bg-primary-500 text-neutral-50'
                                    : 'text-neutral-200',
                                ],
                              )}
                            >
                              <FiLogOut
                                className={clsx([
                                  active ? 'text-white' : 'text-primary-500',
                                ])}
                              />
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </>
                    }
                  />
                ) : (
                  <Button
                    variant='filled'
                    icon={BiLogIn}
                    onClick={() => signIn()}
                  >
                    Login
                  </Button>
                )}
              </>
            )}
          </nav>
        </div>
      </header>
      <Modal isOpen={openMenu} setIsOpen={setOpenMenu} title='Menu Navigation'>
        <div className='py-2'>
          <Typography variant='body1' className='text-neutral-400'>
            Berikut daftar menu yang dapat diakses
          </Typography>
          <div className='flex w-full flex-col divide-y divide-neutral-700 py-2 text-neutral-100'>
            <BasicLink
              onClick={() => setOpenMenu(false)}
              href='/'
              className='flex items-center gap-3 py-3 hover:text-primary-400'
            >
              <AiOutlineHome className='text-lg' />
              Home
            </BasicLink>
            <BasicLink
              onClick={() => setOpenMenu(false)}
              href='/panduan'
              className='flex items-center gap-3 py-3 hover:text-primary-400'
            >
              <BsBook className='text-lg' />
              Panduan
            </BasicLink>
            <BasicLink
              onClick={() => setOpenMenu(false)}
              className='flex items-center gap-3 py-3 hover:text-primary-400'
              href='/trending'
            >
              <AiOutlineInfoCircle className='text-lg' />
              Tentang
            </BasicLink>
            {session?.user.role === 'siswa' ? (
              <>
                <BasicLink
                  onClick={() => setOpenMenu(false)}
                  className='flex items-center gap-3 py-3 hover:text-primary-400'
                  href='/siswa/kuesioner'
                >
                  <AiOutlineSolution className='text-lg' />
                  Kuesioner
                </BasicLink>
                <BasicLink
                  onClick={() => setOpenMenu(false)}
                  className='flex items-center gap-3 py-3 hover:text-primary-400'
                  href='/siswa/rekomendasi'
                >
                  <AiOutlineBulb className='text-lg' />
                  Rekomendasi
                </BasicLink>
              </>
            ) : null}
            {session?.user.role === 'admin' ? (
              <BasicLink
                onClick={() => setOpenMenu(false)}
                className='flex items-center gap-3 py-3 hover:text-primary-400'
                href='/admin/dashboard'
              >
                <AiOutlineAppstore className='text-lg' />
                Dashboard
              </BasicLink>
            ) : null}
          </div>
          <div className='flex justify-end'>
            <Button variant='filled' onClick={() => setOpenMenu(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export const Footer = () => {
  return (
    <footer className='mt-auto w-full border bg-white'>
      <Typography
        variant='label1'
        className='py-2 text-center text-neutral-400'
      >
        Copyright 2023 - Mohamad Kholid Bughowi & Maula Izza Azizi
      </Typography>
    </footer>
  );
};

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <div className='container mx-auto px-3 py-6'>{children}</div>
      <Footer />
    </div>
  );
};

export default BaseLayout;
