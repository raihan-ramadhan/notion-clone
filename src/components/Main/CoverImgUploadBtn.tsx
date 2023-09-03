"use client";

import {
  CLOUDINARY_COVER_IMAGE_FOLDER,
  CLOUDINARY_UPLOAD_PRESET,
} from "@/config/cloudinary";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/Button";
import { Icons } from "../Icons";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { toast, toastError } from "@/hooks/use-toast";
import { CoverImagePayload } from "@/lib/validators/route";

interface CoverImageBtnProps {
  id: string;
}

const CoverImgUploadBtn: React.FC<CoverImageBtnProps> = ({ id }) => {
  // eslint-disable-next-line no-unused-vars
  const [_, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onUpload = async (result: any) => {
    if (result.event == "success") {
      try {
        setIsLoading(true);

        const payload: CoverImagePayload = {
          id,
          coverImageUrl: result.info.secure_url,
        };

        await axios.patch(`/api/images/${id}`, payload);

        startTransition(() => {
          router.refresh();
          toast({
            title: "Successfully added the cover image",
            variant: "default",
          });
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 422) {
            toastError({
              title: "Invalid payload axios.",
              axiosPayloadDesc: "Please provide coverImageUrl and id",
              error,
            });
            return;
          }
        }

        toastError({ error, title: "Failed upload cover image" });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <CldUploadWidget
      uploadPreset={CLOUDINARY_UPLOAD_PRESET}
      options={{
        maxFiles: 1,
        resourceType: "image",
        folder: CLOUDINARY_COVER_IMAGE_FOLDER,
        publicId: id,
        cropping: true,
        croppingAspectRatio: 3,
        showSkipCropButton: false,
        croppingShowDimensions: true,
        croppingCoordinatesMode: "custom",
      }}
      onUpload={onUpload}
      signatureEndpoint="/api/sign-cloudinary-params"
    >
      {({ open }) => {
        return (
          <Button
            onClick={() => open?.()}
            type="button"
            className="cursor-pointer text-sm md:!opacity-0 group-hover:!opacity-80 transition-opacity duration-200 px-2 gap-2"
            variant={"ghost"}
            size={"sm"}
            disabled={isLoading}
          >
            <Icons.Image className="h-4 w-4" />
            <span>Add Cover</span>
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};

export default CoverImgUploadBtn;
