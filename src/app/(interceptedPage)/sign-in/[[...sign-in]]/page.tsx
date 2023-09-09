import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";
import SignIn from "@/components/auth/SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In Notion Clone with clerk",
};

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="relative">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "self-start absolute -top-20 -translate-x-1/2 left-1/2"
          )}
        >
          <ChevronLeftIcon className="mr-2 h-4 w-4" /> Home
        </Link>
        <SignIn isPage />
      </div>
    </main>
  );
}
