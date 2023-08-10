"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "../ui/Button";
import NavMenu from "./NavMenu";
import { cn } from "@/lib/utils";

const DekstopAction: React.FC = () => {
  const pathName = usePathname();

  return (
    <nav
      aria-label="Primary Navigation"
      className="flex-1 hidden lg:flex justify-between items-center h-[30px]"
    >
      {pathName !== "/mobile-nav" && (
        <>
          {/* Left Menu */}
          <NavMenu />

          {/* Right Menu */}
          <div className="flex gap-2">
            <Link
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "text-base"
              )}
              href="/sign-in"
            >
              Log in
            </Link>
            <Link
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "text-base"
              )}
              href="/sign-up"
            >
              Get Notion free
            </Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default DekstopAction;
