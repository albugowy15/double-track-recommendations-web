"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { type Session } from "next-auth";
import {
  adminDashboardNavigation,
  adminNavigation,
  studentNavigation,
} from "@/config/navigation";

const AccountDropdown = ({ session }: { session: Session }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Akunku</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {session.user.role == "siswa" ? (
          <>
            {studentNavigation.map((item) => (
              <DropdownMenuItem key={item.title} asChild>
                <Link href={item.href}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </>
        ) : (
          <>
            {adminNavigation.map((item) => (
              <DropdownMenuItem key={item.title} asChild>
                <Link href={item.href}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </DropdownMenuItem>
            ))}

            {adminDashboardNavigation.slice(1).map((item) => (
              <DropdownMenuItem className="md:hidden" key={item.title} asChild>
                <Link href={item.href}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            const signOut = (await import("next-auth/react")).signOut;
            void signOut();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
