"use client";
import Link from "next/link";
import { Icons } from "../Icons";
import DekstopAction from "./DekstopAction";
import { usePathname, useRouter } from "next/navigation";

interface NavProps {
  isPage?: boolean;
}

const Nav: React.FC<NavProps> = ({ isPage }) => {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <div className="h-[62px] fixed top-0 z-10 p-4 inset-x-0 bg-background ">
      <header className="sticky top-0 flex items-center justify-between">
        <a href="/" className="mr-2">
          <Icons.logo />
        </a>
        <DekstopAction />
        {pathName === "/mobile-nav" && !isPage && (
          <Icons.X
            onClick={() => router.back()}
            className="h-6 w-6 cursor-pointer lg:hidden"
          />
        )}
        {pathName !== "/mobile-nav" && (
          <Link href="/mobile-nav">
            <Icons.HamburgerMenu className="h-6 w-6 cursor-pointer lg:hidden" />
          </Link>
        )}
      </header>
    </div>
  );
};

export default Nav;
