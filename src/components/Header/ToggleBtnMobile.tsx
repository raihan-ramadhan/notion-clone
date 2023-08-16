"use client";

import { cn } from "@/lib/utils";
import { Icons } from "../Icons";
import { useShowMobileSidebar } from "@/hooks/use-show-mobile-sidebar";

const ToggleBtnMobile: React.FC = () => {
  const { toggleMobileSidebar } = useShowMobileSidebar();

  return (
    <div
      className={
        "group hover:bg-accent cursor-pointer rounded-sm relative h-6 w-6 block md:hidden shrink-0 mr-2"
      }
      onClick={toggleMobileSidebar}
    >
      <Icons.DoubleArrowRight
        className={cn(
          "h-6 w-6 p-1 group-hover:opacity-100 opacity-0 absolute inset-0 pointer-events-none transition-opacity duration-75"
        )}
      />
      <Icons.HamburgerMenu
        className={cn(
          "h-6 w-6 p-[2px] group-hover:opacity-0 opacity-100 absolute inset-0 pointer-events-none transition-opacity duration-75"
        )}
      />
    </div>
  );
};

export default ToggleBtnMobile;
