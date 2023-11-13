import { Loader2, Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { homeNavigation } from "@/config/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import UserNav from "@/components/layout/user-nav";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between border-b px-3 py-2 md:container">
      <nav className="hidden items-center space-x-4 md:flex lg:space-x-6">
        <Link
          className="font-bold transition-colors hover:text-primary"
          href="/"
        >
          DT Rekomendasi
        </Link>
        {homeNavigation.map((item) => (
          <Link
            className="text-sm font-medium transition-colors hover:text-primary"
            key={item.title}
            href={item.href}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger className="md:hidden" asChild>
          <Button aria-label="Menu" variant="outline" size="icon">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex flex-col items-start gap-3 py-4">
            <Link href="/" className="font-bold">
              DT Rekomendasi
            </Link>
            {homeNavigation.map((item, index) => (
              <SheetClose key={index} asChild>
                <Link href={item.href} key={item.title}>
                  {item.title}
                </Link>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <React.Suspense fallback={<Loader2 className="h-4 w-4 animate-spin" />}>
        <UserNav />
      </React.Suspense>
    </header>
  );
};

export default Navbar;
