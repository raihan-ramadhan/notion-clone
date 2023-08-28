"use client";

import { Icons } from "../Icons";
import { ScrollArea } from "../ui/ScrollArea";
import { Button } from "../ui/Button";
import { ReloadIcon } from "@radix-ui/react-icons";
import Links from "./Links";
import { DocumentType } from "@/types/db";
import { cn } from "@/lib/utils";

interface LinksDocProps {
  addDoc: () => void;
  refetch: () => void;
  status: "success" | "error" | "pending";
  docs: DocumentType[] | undefined;
  isMobile?: boolean;
  toggle?: () => void;
}

const LinksDoc: React.FC<LinksDocProps> = ({
  addDoc,
  docs = [],
  status,
  refetch,
  isMobile,
  toggle,
}) => {
  return (
    <ScrollArea
      className="flex-1 w-full px-2"
      viewportClassName="[&>div]:!block"
      type="auto"
    >
      <ul className="p-1 h-full space-y-1 pb-20">
        {status == "success" ? (
          <>
            <Links docs={docs} isMobile={isMobile} toggle={toggle} showMore />
            <li>
              <button
                className={cn(
                  "flex hover:bg-accent w-full items-center px-2 py-[2px] cursor-pointer rounded-sm",
                  isMobile && "px-1 py-2"
                )}
                type="button"
                onClick={addDoc}
                tabIndex={0}
              >
                <Icons.Plus
                  className={cn("h-6 w-6 p-1 shrink-0", isMobile && "h-8 w-8")}
                />
                <span
                  className={cn("pl-3 text-sm w-max", isMobile && "text-base")}
                >
                  Add a page
                </span>
              </button>
            </li>
          </>
        ) : status == "error" ? (
          <div className="px-4 py-2 rounded-sm text-sm bg-destructive/20 space-y-2 text-center">
            <p className="text-xs text-foreground/50 font-semibold">
              *Something went wrong
            </p>
            <Button variant="destructive" size={"sm"} onClick={() => refetch()}>
              <ReloadIcon className="w-4 h-4 p-[2px] shrink-0" /> Please Refetch
            </Button>
          </div>
        ) : (
          // prettier-ignore
          <div className="animate-pulse space-y-1 [&>div]:h-12 [&>div]:md:h-7 [&>div]:rounded-sm [&>div]:bg-accent">
            <div  /><div  /><div  /><div  /><div  /><div  /><div  /><div  /><div  /><div  /><div  />
            <div  /><div  /><div  /><div  /><div  /><div  /><div  /><div  /><div  /><div  /><div  />
            <div  /><div  /><div  /><div  /><div  /><div  /><div  /><div  /><div  /><div  /><div  />
          </div>
        )}
      </ul>
    </ScrollArea>
  );
};

export default LinksDoc;
