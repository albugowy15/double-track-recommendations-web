import {
  BarChart2,
  FileQuestion,
  KeyRound,
  LayoutDashboard,
  Newspaper,
  Star,
  User2,
  Users,
} from "lucide-react";

export interface Navigation {
  href: string;
  title: string;
  icon?: React.ReactNode;
  description?: string;
}

export const homeNavigation: Navigation[] = [
  {
    href: "/panduan",
    title: "Panduan",
  },
];

export const studentNavigation: Navigation[] = [
  {
    href: "/siswa/kuesioner",
    title: "Kuesioner",
    icon: <FileQuestion className="mr-2 h-4 w-4" />,
    description: "Kuesioner siswa",
  },
  {
    href: "/siswa/profile",
    title: "Profil",
    icon: <User2 className="mr-2 h-4 w-4" />,
    description: "Profil siswa",
  },
  {
    href: "/siswa/ubah-password",
    title: "Ubah Password",
    icon: <KeyRound className="mr-2 h-4 w-4" />,
    description: "Ubah Password Akun Siswa",
  },
  {
    href: "/siswa/rekomendasi",
    title: "Rekomendasi",
    icon: <Star className="mr-2 h-4 w-4" />,
    description: "Hasil rekomendasi",
  },
];

export const adminNavigation: Navigation[] = [
  {
    href: "/admin/profil",
    title: "Profil",
    icon: <User2 className="mr-2 h-4 w-4" />,
    description: "Profil admin",
  },
  {
    href: "/admin/ubah-password",
    title: "Ubah Password",
    icon: <KeyRound className="mr-2 h-4 w-4" />,
    description: "Ubah Password Akun Admin",
  },
  {
    href: "/admin/dashboard",
    title: "Dashboard",
    icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    description: "Dashboard admin",
  },
];

export const adminDashboardNavigation: Navigation[] = [
  {
    href: "/admin/dashboard",
    title: "Ringkasan",
    icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    description: "Dashboard admin",
  },
  {
    href: "/admin/dashboard/hasil-rekomendasi",
    title: "Hasil Rekomendasi",
    icon: <BarChart2 className="mr-2 h-4 w-4" />,
    description: "Dashboard admin hasil rekomendasi",
  },
  {
    href: "/admin/dashboard/kuesioner",
    title: "Kuesioner",
    icon: <Newspaper className="mr-2 h-4 w-4" />,
    description: "Dashboard admin kuesioner",
  },
  {
    href: "/admin/dashboard/siswa",
    title: "Siswa",
    icon: <Users className="mr-2 h-4 w-4" />,
    description: "Dashboard admin siswa",
  },
];
