"use client";

import { cn } from "@/lib/utils";
import { Icons, type IconsNames } from "../Icons";

interface SidebarMenuItem {
  onClick?: () => void;
  text: string;
  iconName: IconsNames;
  className?: string;
  isMobile?: boolean;
}

const SidebarMenuItem = ({
  onClick,
  text,
  iconName,
  className,
  isMobile,
}: SidebarMenuItem) => {
  const Icon = Icons[iconName];

  return (
    <button
      type="button"
      className={cn(
        "flex hover:bg-accent w-full items-center px-2 py-[2px] cursor-pointer rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className,
        isMobile && "px-1 py-2"
      )}
      onClick={onClick}
    >
      <Icon className={cn("h-6 w-6 p-1 shrink-0", isMobile && "h-8 w-8")} />
      <span
        className={cn(
          "pl-3 text-sm w-max truncate select-none",
          isMobile && "text-base"
        )}
      >
        {text}
      </span>
    </button>
  );
};

export default SidebarMenuItem;
