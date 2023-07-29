"use client";

import SignIn from "@/components/auth/SignIn";
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
    <div className="fixed inset-0 flex justify-center items-center bg-zinc-900/30 dark:bg-white/20 backdrop-blur-sm z-30 overflow-hidden">
      <SignIn isModal />
    </div>
  );
};

export default Page;
