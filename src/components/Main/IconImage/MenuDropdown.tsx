"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/DropdownMenu";
import { Icons } from "../../Icons";

import {
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_ICON_IMAGE_FOLDER,
} from "@/config/cloudinary";

import { CldUploadWidget } from "next-cloudinary";
import { cn } from "@/lib/utils";

interface IconImageProps {
  // eslint-disable-next-line no-unused-vars
  onSuccess: (result: any) => void;
  onDelete: () => void;
  children: React.ReactNode;
  id: string;
  isCoverImage?: boolean;
}

const MenuDropdown: React.FC<IconImageProps> = ({
  id,
  children,
  onSuccess,
  onDelete,
  isCoverImage,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "hidden pointer-events-none md:block md:pointer-events-auto  outline-none focus-visible:shadow-lg focus-visible:shadow-foreground/30 w-max",
          isCoverImage &&
            "absolute z-10 left-10 md:left-24 top-0 -translate-y-1/2"
        )}
      >
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[125px] mt-2">
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
              <DropdownMenuItem
                onClick={() => open?.()}
                className="flex gap-2 cursor-pointer"
              >
                <Icons.Update className="h-4 w-4" />
                <span className="select-none">Change</span>
              </DropdownMenuItem>
            );
          }}
        </CldUploadWidget>

        <DropdownMenuItem
          onClick={onDelete}
          className="flex gap-2 cursor-pointer"
        >
          <Icons.Delete className="h-4 w-4" />
          <span className="select-none">Remove</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuDropdown;
