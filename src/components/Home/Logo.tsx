"use client";

import Link from "next/link";
import { Icons } from "../Icons";
import { preventBubbling } from "@/lib/utils";

import { useRouter } from "next/navigation";
import { useShowMobileNav } from "@/hooks/use-show-mobile-nav";

const Logo: React.FC = () => {
  const { showMobileNav } = useShowMobileNav();
  const router = useRouter();

  const callback = () => {
    showMobileNav ? router.back() : router.push("/");
  };

  return (
    <Link
      href="/"
      className="mr-2"
      onClick={(e) => preventBubbling(e, { callback })}
    >
      <Icons.logo />
    </Link>
  );
};

export default Logo;
