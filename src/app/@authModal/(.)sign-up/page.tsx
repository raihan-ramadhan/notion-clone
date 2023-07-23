"use client";

import SignUp from "@/components/auth/SignUp";
import CloseModal from "@/components/CloseModal";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10">
      <div className="centering-absolute flex flex-col-reverse">
        <div className="absolute top-5 right-14 z-10">
          <CloseModal />
        </div>
        <SignUp isModal />
      </div>
    </div>
  );
};

export default Page;
