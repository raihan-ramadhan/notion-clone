import Link from "next/link";
import { auth } from "@clerk/nextjs/app-beta";
import { buttonVariants } from "@/components/ui/Button";
import { redirect } from "next/navigation";
import { getInitialDoc } from "@/actions/getInitialDoc";

const Page: React.FC = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect(`/$sign-in`);
  }

  const document = await getInitialDoc(userId);

  return (
    <div className="flex justify-center items-center w-full h-screen flex-col gap-5">
      <span className="text-7xl">404</span>
      <span>This content does not exist</span>
      <Link
        className={buttonVariants({ variant: "default" })}
        href={document?.id ? `/${document.id}` : "/"}
      >
        Back to my content
      </Link>
    </div>
  );
};

export default Page;
