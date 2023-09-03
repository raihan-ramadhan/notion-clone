"use client";

import { toastError } from "@/hooks/use-toast";
import { UpdateTitlePayload } from "@/lib/validators/Documents";
import { useSaving } from "@/store/use-saving";
import { useTitle } from "@/store/use-title";
import { useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, startTransition, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface TitleProps {
  currentTitle: string;
  id: string;
}

const Title: React.FC<TitleProps> = ({ currentTitle, id }) => {
  const { setIsSaving } = useSaving();
  const queryClient = useQueryClient();
  const router = useRouter();

  const updateTitle = async (value: string) => {
    try {
      setIsSaving(true);
      const payload: UpdateTitlePayload = { title: value, id };

      await axios.patch(`/api/documents/title/${id}`, payload);

      startTransition(() => {
        // Force a cache invalidation.
        queryClient.invalidateQueries({ queryKey: ["docs"] });
        router.refresh();
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          toastError({
            title: "Invalid payload axios.",
            axiosPayloadDesc: "Please provide id and editorJson",
            error,
          });
          return;
        }
      }

      toastError({ error, title: "Failed update title" });
    } finally {
      startTransition(() => {
        setIsSaving(false);
      });
    }
  };

  const debouncedUpdates = useDebouncedCallback(async (value: string) => {
    await updateTitle(value);
  }, 1000);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    debouncedUpdates(e.target.value);
  };

  const [hydrated, setHydrated] = useState<boolean>(false);

  const { setTitle, title } = useTitle();

  useEffect(() => {
    setTitle(currentTitle);
  }, [currentTitle, setTitle]);

  useEffect(() => {
    setHydrated(true);
  }, [hydrated]);

  return (
    <div className="text-4xl font-bold relative h-20 flex flex-col justify-center w-full">
      <h1 className="outline-none py-5 opacity-0 sr-only">
        {title || currentTitle}
      </h1>
      <input
        className={
          "appearance-none outline-none py-5 absolute inset-0 bg-transparent"
        }
        type="text"
        value={hydrated ? title : currentTitle}
        onChange={handleChange}
        placeholder="Untitled"
      />
    </div>
  );
};

export default Title;
