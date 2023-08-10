"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useShowMobileNav() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const SEARCH_PARAMS_SHOW_MOBILE_NAV = searchParams.get("showMobileNav");

  const showMobileNav = SEARCH_PARAMS_SHOW_MOBILE_NAV?.toString() == "1";

  const toggleMobileNav = () => {
    if (showMobileNav) {
      router.back();
    } else {
      router.push("?showMobileNav=1");
    }
  };

  return { showMobileNav, toggleMobileNav };
}
