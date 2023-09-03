"use client";

import { toastError } from "@/hooks/use-toast";
import {
  CoverImagePayload,
  RemoveCoverImagePayload,
} from "@/lib/validators/route";
import { useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

import Image from "next/image";
import { Document } from "@prisma/client";
import { Icons } from "../../Icons";
import { cn } from "@/lib/utils";
import Menu from "./Menu";
import MenuDialog from "./MenuDialog";

interface CoverImageProps {
  id: string;
  coverImage: Document["coverImage"];
}

const CoverImage: React.FC<CoverImageProps> = ({ id, coverImage }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const isLoading = isDeleting || isUpdating;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);

  const onSuccess = async (result: any) => {
    if (result.event == "success") {
      try {
        if (isOpen) setIsOpen(false);
        setIsUpdating(true);

        const payload: CoverImagePayload = {
          id,
          coverImageUrl: result.info.secure_url,
        };

        await axios.patch(`/api/images/${id}`, payload);

        startTransition(() => {
          queryClient.invalidateQueries({ queryKey: ["docs"] });
          router.refresh();
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
        toastError({ error, title: "Failed update cover image" });
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const onDelete = async () => {
    try {
      if (isOpen) setIsOpen(false);
      setIsDeleting(true);

      const payload: RemoveCoverImagePayload = { id, isCoverImage: true };

      await axios.patch(`/api/images/remove/${id}`, payload);

      startTransition(() => {
        queryClient.invalidateQueries({ queryKey: ["docs"] });
        router.refresh();
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          toastError({
            title: "Invalid payload axios.",
            axiosPayloadDesc: "Please provide isCoverImage and id",
            error,
          });
          return;
        }
      }

      toastError({ error, title: "Failed delete cover image" });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="h-[200px] md:h-[280px] w-full relative group shrink-0">
      <Image
        src={`${coverImage?.url}?timeStamp=${coverImage?.timeStamp}`}
        className="object-cover md:object-left z-0 bg-accent"
        alt="cover image"
        quality={95}
        priority
        fill
      />

      {/* Status */}
      <div
        className={cn(
          "bg-black/50 absolute inset-0 w-full h-full hidden",
          isLoading && "block"
        )}
      >
        <div className="absolute bottom-5 right-5 w-max h-max text-white flex items-center gap-1">
          <Icons.loader className="h-3 w-3 animate-spin" />
          {isDeleting && (
            <span className="font-semibold text-sm">Deleting</span>
          )}
          {isUpdating && (
            <span className="font-semibold text-sm">Updating</span>
          )}
        </div>
      </div>

      <div className="absolute inset-0 w-full h-full max-w-[900px] mx-auto px-10 md:px-24">
        {!isLoading ? (
          <Menu
            isDeleting={isDeleting}
            isUpdating={isUpdating}
            onDelete={onDelete}
            onSuccess={onSuccess}
            id={id}
          />
        ) : null}
        <MenuDialog
          isLoading={isLoading}
          isOpen={isOpen}
          onDelete={onDelete}
          onSuccess={onSuccess}
          id={id}
          toggle={toggle}
        />
      </div>
    </div>
  );
};

export default CoverImage;
