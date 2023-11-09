'use client';

import { LogIn, LogOut, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { type Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import {
  adminNavigation,
  homeNavigation,
  studentNavigation,
} from '@/config/navigation';

interface NavbarProps {
  session: Session | null;
}
const Navbar = ({ session }: NavbarProps) => {
  return (
    <header className='w-full border shadow-sm'>
      <div className='container mx-auto flex items-center justify-between px-3 py-2'>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href='/' legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <strong className='text-lg'>DT Rekomendasi</strong>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {homeNavigation.map((item, index) => (
              <NavigationMenuItem key={index}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <span className='font-medium'>{item.title}</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {session ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon'>
                  <UserCircle className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Akunku</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {session.user.role == 'siswa' ? (
                  <>
                    {studentNavigation.map((item, index) => (
                      <DropdownMenuItem key={index} asChild>
                        <Link href={item.href}>
                          {item.icon}
                          {item.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </>
                ) : (
                  <>
                    {adminNavigation.map((item, index) => (
                      <DropdownMenuItem key={index} asChild>
                        <Link href={item.href}>
                          {item.icon}
                          {item.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className='mr-2 h-4 w-4' />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button variant='outline' onClick={() => signIn()}>
            <LogIn className='mr-2 h-4 w-4' />
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
