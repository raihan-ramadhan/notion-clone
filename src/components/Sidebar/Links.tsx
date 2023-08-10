"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { type DocumentType } from "../../types/db";
import { Icons } from "../Icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";

import More from "./More";
import { DeleteDocumentPayload } from "@/lib/validators/Documents";
import { MouseEvent } from "react";

interface Redirect {
  data: string | null;
}

export type MutationProps = {
  publicId: string;
  id: string;
  callback?: () => void;
};

interface LinksProps {
  docs: DocumentType[] | undefined;
  size?: "medium" | "default";
  showMore?: boolean;
  isMobile?: boolean;
  toggle?: () => void;
}

export default function Links({
  docs = [],
  size,
  showMore,
  isMobile,
  toggle,
}: LinksProps) {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const currentDoc = params.publicId;

  const { mutate } = useMutation({
    mutationFn: async ({ publicId, id, callback }: MutationProps) => {
      if (callback) callback();

      const payload: DeleteDocumentPayload = {
        publicId,
        id,
        currentDoc,
      };

      const { data: redirect }: Redirect = await axios.delete(
        `/api/documents/${publicId}`,
        { data: payload }
      );

      return redirect;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 422) {
          return toast({
            title: "Invalid payload axios.",
            description: "Please provide publicId, currentDoc, and id",
            variant: "destructive",
          });
        }
      }

      return toast({
        title: "Something went wrong",
        description: `Failed delete a page`,
        variant: "destructive",
      });
    },
    onSuccess: (redirect) => {
      queryClient.invalidateQueries({ queryKey: ["docs"] });

      if (redirect) {
        router.push(redirect);
      }

      return toast({
        title: "Successfully deleted the doc",
        variant: "default",
      });
    },
  });

  const handleClick = (e: MouseEvent<HTMLElement>, link: string) => {
    if (isMobile) {
      e.preventDefault();

      if (toggle) toggle();
      setTimeout(() => router.push(`/${link}`), 200);
    }
  };

  return (
    <>
      {docs.map((doc) => (
        <li key={doc.publicId}>
          <Link
            tabIndex={0}
            href={`/${doc.publicId}`}
            onClick={(e) => handleClick(e, doc.publicId)}
            className={cn(
              "flex hover:bg-accent w-full items-center px-2 py-[2px] cursor-pointer rounded-sm transition-colors duration-200 overflow-x-hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              currentDoc == doc.publicId && size != "medium" && "bg-accent",
              size == "medium" && "px-4 py-3 rounded-none",
              isMobile && "px-1 py-2"
            )}
          >
            <Icons.FileText
              className={cn("h-6 w-6 p-1 shrink-0", isMobile && "h-8 w-8")}
            />
            <span
              className={cn(
                "pl-3 h-6 leading-6 text-sm truncate flex-1 select-none",
                isMobile && "text-base"
              )}
            >
              {doc.title}
            </span>

            {showMore && <More doc={doc} mutate={mutate} isMobile={isMobile} />}
          </Link>
        </li>
      ))}
    </>
  );
}