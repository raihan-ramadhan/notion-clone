"use client";

import { cn } from "@/lib/utils";
import { Icons } from "../Icons";
import { useShowSidebar } from "@/store/use-show-sidebar";

const ToggleBtnDekstop: React.FC = () => {
  const { showDekstopSidebar, toggleDekstopSidebar } = useShowSidebar();

  return (
    <div
      className={cn(
        "group hover:bg-accent cursor-pointer rounded-sm relative h-6 w-6 hidden md:block shrink-0 mr-2",
        showDekstopSidebar && "!hidden"
      )}
      onClick={toggleDekstopSidebar}
    >
      <Icons.DoubleArrowRight className="h-6 w-6 p-1 group-hover:opacity-100 opacity-0 absolute inset-0 pointer-events-none transition-opacity duration-75" />
      <Icons.HamburgerMenu className="h-6 w-6 p-[2px] group-hover:opacity-0 opacity-100 absolute inset-0 pointer-events-none transition-opacity duration-75" />
    </div>
  );
};

export default ToggleBtnDekstop;
