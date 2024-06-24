import { Loader2, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { homeNavigation, type Navigation } from "@/config/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import UserNav from "@/components/layout/user-nav";

interface NavItemProps {
  nav: Navigation;
}

function NavItem(props: NavItemProps) {
  const isExternalLink = props.nav.href.startsWith("http");
  if (isExternalLink) {
    return (
      <a
        className="text-sm font-medium transition-colors hover:text-primary"
        href={props.nav.href}
        target="_blank"
      >
        {props.nav.title}
      </a>
    );
  }
  return (
    <Link
      className="text-sm font-medium transition-colors hover:text-primary"
      href={props.nav.href}
    >
      {props.nav.title}
    </Link>
  );
}

const Navbar = () => {
  return (
    <header className="flex items-center justify-between border-b px-3 py-2 md:container">
      <nav className="hidden items-center space-x-6 md:flex lg:space-x-6">
        <Link href="/">
          <Image
            alt="logo double track"
            src="/images/double_track_logo.png"
            height={70}
            width={140}
          />
        </Link>
        {homeNavigation.map((item) => (
          <NavItem nav={item} key={item.href} />
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
            <Link href="/">
              <Image
                alt="logo double track"
                src="/images/double_track_logo.png"
                height={70}
                width={140}
              />
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
