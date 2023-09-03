"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Document } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import {
  IconImagePayload,
  RemoveIconImagePayload,
} from "@/lib/validators/route";
import axios, { AxiosError } from "axios";
import { toast, toastError } from "@/hooks/use-toast";
import MenuDropdown from "./MenuDropdown";
import { Icons } from "../../Icons";
import MenuDialog from "./MenuDialog";

interface IconImageProps {
  isCoverImage?: boolean;
  iconImage: Document["iconImage"];
  id: string;
}

const IconImage: React.FC<IconImageProps> = ({
  isCoverImage,
  iconImage,
  id,
}) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // eslint-disable-next-line no-unused-vars
  const [_, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);

  const onSuccess = async (result: any) => {
    if (result.event == "success") {
      try {
        if (isOpen) setIsOpen(false);
        setIsUpdating(true);

        const payload: IconImagePayload = {
          id,
          iconImageUrl: result.info.secure_url,
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
              axiosPayloadDesc: "Please provide iconImageUrl and id",
              error,
            });
            return;
          }
        }
        toastError({ error, title: "Failed update icon image" });
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const onDelete = async () => {
    try {
      if (isOpen) setIsOpen(false);
      setIsDeleting(true);

      const payload: RemoveIconImagePayload = { id, isIconImage: true };

      await axios.patch(`/api/images/remove/${id}`, payload);

      startTransition(() => {
        queryClient.invalidateQueries({ queryKey: ["docs"] });
        router.refresh();
        toast({
          title: "Successfully deleted the icon image",
          variant: "default",
        });
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          toastError({
            title: "Invalid payload axios.",
            axiosPayloadDesc: "Please provide isIconImage and id",
            error,
          });
          return;
        }
      }

      toastError({ error, title: "Failed delete icon image" });
    } finally {
      setIsDeleting(false);
    }
  };

  const Content = () => (
    <div className="relative">
      <Image
        className={cn("w-[125px] h-[125px] object-cover bg-accent")}
        alt="icons image"
        src={`${iconImage?.url}?timeStamp=${iconImage?.timeStamp}`}
        height="125"
        width="125"
        quality={95}
        priority
      />
      <div
        className={cn(
          "bg-black/50 absolute inset-0 w-full h-full hidden",
          (isUpdating || isDeleting) && "block"
        )}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max h-max text-white flex items-center gap-1">
          <Icons.loader className="h-3 w-3 animate-spin" />
          {isDeleting && (
            <span className="font-semibold text-sm">Deleting</span>
          )}
          {isUpdating && (
            <span className="font-semibold text-sm">Updating</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <MenuDropdown
        isCoverImage={isCoverImage}
        onDelete={onDelete}
        onSuccess={onSuccess}
        id={id}
      >
        <Content />
      </MenuDropdown>

      <MenuDialog
        onSuccess={onSuccess}
        onDelete={onDelete}
        id={id}
        isLoading={isUpdating || isDeleting}
        isCoverImage={isCoverImage}
        isOpen={isOpen}
        toggle={toggle}
      >
        <Content />
      </MenuDialog>
    </>
  );
};

export default IconImage;
