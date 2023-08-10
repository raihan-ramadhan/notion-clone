"use client";

import { Icons } from "../Icons";
import DekstopAction from "./DekstopAction";
import MobileNav from "./MobileNav";
import { Button } from "../ui/Button";
import Link from "next/link";
import { useShowMobileNav } from "@/hooks/use-show-mobile-nav";

const Nav: React.FC = () => {
  const { showMobileNav, toggleMobileNav } = useShowMobileNav();

  return (
    <div className="h-[62px] fixed top-0 z-10 p-4 inset-x-0 bg-background">
      <header className="sticky top-0 flex items-center justify-between">
        <Link href="/" className="mr-2">
          <Icons.logo />
        </Link>
        <DekstopAction />
        <Button
          onClick={toggleMobileNav}
          variant={"ghost"}
          className="h-9 w-9 p-0 lg:hidden"
        >
          {showMobileNav ? (
            <Icons.X className="h-6 w-6 cursor-pointer lg:hidden" />
          ) : (
            <Icons.HamburgerMenu className="h-6 w-6 cursor-pointer lg:hidden" />
          )}
        </Button>
        {showMobileNav ? <MobileNav /> : null}
      </header>
    </div>
  );
};

export default Nav;
