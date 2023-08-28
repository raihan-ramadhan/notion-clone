import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";

import { cn, preventBubbling } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import { DocumentType } from "@/types/db";

interface MoreDropDownprops {
  // eslint-disable-next-line no-unused-vars
  onDelete: (prop: DocumentType) => void;
  toggleOpen: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  isMobile?: boolean;
  isLoading: boolean;
  isOpen: boolean;
  doc: DocumentType;
}

const MoreDropDown: React.FC<MoreDropDownprops> = ({
  isOpen,
  toggleOpen,
  openMenu,
  closeMenu,
  isMobile,
  onDelete,
  doc,
  isLoading,
}) => {
  return (
    <AlertDialog>
      <DropdownMenu open={isOpen} onOpenChange={toggleOpen}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            onClick={(e) => preventBubbling(e, { callback: openMenu })}
            className={cn(
              "h-5 w-5 p-[2px] hover:bg-accent-foreground/20 rounded-sm focus-visible:ring-[1px] focus-visible:ring-ring focus:outline-none",
              isMobile && "h-7 w-7"
            )}
          >
            <Icons.DotsHorizontalIcon
              className={cn("h-4 w-4 p-[1px]", isMobile && "h-6 w-6")}
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="center"
          side="right"
          sideOffset={10}
          onClick={preventBubbling}
        >
          <AlertDialogTrigger>
            <DropdownMenuItem className="text-start min-w-[150px] cursor-pointer flex items-center">
              <Icons.Delete className="w-5 h-5" />
              <span className="w-full pl-2">Delete</span>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent
        overlayCallback={(e) => {
          preventBubbling(e, { noPreventDefault: true });
        }}
        onClick={(e) => {
          preventBubbling(e, { noPreventDefault: true });
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            {doc.title} Doc and remove your doc from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading} onClick={closeMenu}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            variant={"destructive"}
            onClick={(e) =>
              preventBubbling(e, {
                callback: () => onDelete(doc),
              })
            }
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <Icons.loader className="w-4 h-4 p-[2px] animate-spin" />
                Deleting
              </span>
            ) : (
              <span>Delete</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MoreDropDown;
