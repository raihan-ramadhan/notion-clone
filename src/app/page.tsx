import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import UserButton from "@/components/UserButton";

export default function Home() {
  const { userId } = auth();
  return (
    <main>
      {!userId ? (
        <>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/sign-up"
          >
            Sign-up
          </Link>
          <Link
            className={buttonVariants({ variant: "default" })}
            href="/sign-in"
          >
            Sign-in
          </Link>
        </>
      ) : (
        <UserButton />
      )}
    </main>
  );
}
