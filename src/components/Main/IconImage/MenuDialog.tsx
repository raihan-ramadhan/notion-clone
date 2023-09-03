import { Icons } from "@/components/Icons";
import {
  Dialog,
  DialogContentMore,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import {
  CLOUDINARY_ICON_IMAGE_FOLDER,
  CLOUDINARY_UPLOAD_PRESET,
} from "@/config/cloudinary";
import { cn } from "@/lib/utils";
import { CldUploadWidget } from "next-cloudinary";
import React from "react";

interface MoreDialogProps {
  // eslint-disable-next-line no-unused-vars
  onSuccess: (result: any) => void;
  onDelete: () => void;
  isLoading: boolean;
  children: React.ReactNode;
  isCoverImage?: boolean;
  id: string;
  isOpen: boolean;
  toggle: () => void;
}

const MenuDialog: React.FC<MoreDialogProps> = ({
  isLoading,
  children,
  isCoverImage,
  onDelete,
  id,
  onSuccess,
  toggle,
  isOpen,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger
        className={cn(
          "block md:hidden md:!pointer-events-none outline-none focus-visible:shadow-lg focus-visible:shadow-foreground/30 w-max",
          isCoverImage &&
            "absolute z-10 left-10 md:left-24 top-0 -translate-y-1/2"
        )}
      >
        {children}
      </DialogTrigger>
      <DialogContentMore className="block md:hidden md:!pointer-events-none z-10">
        <DialogHeader className="h-[48px] relative border-b border-border">
          <DialogTitle className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            Image Actions
          </DialogTitle>
          <button
            onClick={() => toggle()}
            type="button"
            disabled={isLoading}
            className="absolute right-5 top-[50%] translate-y-[-50%] !m-0 text-blue-400 font-semibold cursor-pointer"
          >
            Done
          </button>
        </DialogHeader>
        <CldUploadWidget
          uploadPreset={CLOUDINARY_UPLOAD_PRESET}
          options={{
            maxFiles: 1,
            resourceType: "image",
            folder: CLOUDINARY_ICON_IMAGE_FOLDER,
            publicId: id,
            cropping: true,
            croppingAspectRatio: 1,
            showSkipCropButton: false,
            croppingShowDimensions: true,
            croppingCoordinatesMode: "custom",
          }}
          onSuccess={onSuccess}
          signatureEndpoint={"/api/sign-cloudinary-params"}
        >
          {({ open }) => {
            return (
              <button
                onClick={() => {
                  open?.();
                  toggle();
                }}
                className="flex hover:bg-accent w-full items-center px-3 py-2 cursor-pointer rounded-sm"
                type="button"
              >
                <Icons.Update className="h-8 w-8 p-1 shrink-0" />
                <span className="pl-3 text-base w-max">Change</span>
              </button>
            );
          }}
        </CldUploadWidget>
        <button
          className="flex hover:bg-accent w-full items-center px-3 py-2 cursor-pointer rounded-sm"
          type="button"
          onClick={onDelete}
        >
          <Icons.Delete className="h-8 w-8 p-1 shrink-0" />
          <span className="pl-3 text-base w-max">Remove</span>
        </button>
      </DialogContentMore>
    </Dialog>
  );
};

export default MenuDialog;
