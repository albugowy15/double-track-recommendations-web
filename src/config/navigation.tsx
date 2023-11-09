import { FileQuestion, LayoutDashboard, Star, User2 } from 'lucide-react';

export interface Navigation {
  href: string;
  title: string;
  icon?: React.ReactNode;
  description?: string;
}

export const homeNavigation: Navigation[] = [
  {
    href: '/panduan',
    title: 'Panduan',
  },
  {
    title: 'Tentang',
    href: '/tentang',
  },
];

export const studentNavigation: Navigation[] = [
  {
    href: '/siswa/kuesioner',
    title: 'Kuesioner',
    icon: <FileQuestion className='mr-2 h-4 w-4' />,
    description: 'Kuesioner siswa',
  },
  {
    href: '/siswa/profil',
    title: 'Profil',
    icon: <User2 className='mr-2 h-4 w-4' />,
    description: 'Profil siswa',
  },
  {
    href: '/siswa/rekomendasi',
    title: 'Rekomendasi',
    icon: <Star className='mr-2 h-4 w-4' />,
    description: 'Hasil rekomendasi',
  },
];

export const adminNavigation: Navigation[] = [
  {
    href: '/admin/profil',
    title: 'Profil',
    icon: <User2 className='mr-2 h-4 w-4' />,
    description: 'Profil admin',
  },
  {
    href: '/admin/dashboard',
    title: 'Dashboard',
    icon: <LayoutDashboard className='mr-2 h-4 w-4' />,
    description: 'Dashboard admin',
  },
  // {
  //   href: '/admin/dashboard/hasil-rekomendasi',
  //   title: 'Hasil Rekomendasi',
  //   description: 'Dashboard admin hasil rekomendasi',
  // },
  // {
  //   href: '/admin/dashboard/kuesioner',
  //   title: 'Kuesioner',
  //   description: 'Dashboard admin kuesioner',
  // },
  // {
  //   href: '/admin/dashboard/siswa',
  //   title: 'Siswa',
  //   description: 'Dashboard admin siswa',
  // },
];
