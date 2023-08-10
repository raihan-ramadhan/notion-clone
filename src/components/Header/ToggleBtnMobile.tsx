"use client";

import { cn } from "@/lib/utils";
import { Icons } from "../Icons";

interface ToggleBtnMobileProps {
  toggle: () => void;
}

const ToggleBtnMobile: React.FC<ToggleBtnMobileProps> = ({ toggle }) => {
  return (
    <div
      className={
        "group hover:bg-accent cursor-pointer rounded-sm relative h-6 w-6 block md:hidden"
      }
      onClick={toggle}
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
