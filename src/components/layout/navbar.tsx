'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { AiOutlineHome, AiOutlineInfoCircle } from 'react-icons/ai';
import { BiLogIn } from 'react-icons/bi';
import { BsBook } from 'react-icons/bs';
import { CgMenuGridR } from 'react-icons/cg';

import BasicLink from '@/components/BasicLink';
import { Button } from '@/components/Button';
import Modal from '@/components/Modal';
import Typography from '@/components/typography';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
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

          <Button variant='filled' icon={BiLogIn} onClick={() => signIn()}>
            Login
          </Button>
        </nav>
      </div>
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
          </div>
          <div className='flex justify-end'>
            <Button variant='filled' onClick={() => setOpenMenu(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </header>
  );
};

export default Navbar;
