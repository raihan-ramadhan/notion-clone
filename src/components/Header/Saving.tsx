"use client";

import { useSaving } from "@/store/use-saving";
import { Icons } from "../Icons";
import { cn } from "@/lib/utils";

const Saving: React.FC = () => {
  const { isSaving } = useSaving();

  return (
    <div
      className={cn(
        "items-center gap-1 opacity-0 hidden md:flex",
        isSaving && "opacity-60"
      )}
    >
      <Icons.loader className="h-3 w-3 animate-spin" />
      <span>Saving ...</span>
    </div>
  );
};

export default Saving;
