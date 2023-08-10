import { Separator } from "../ui/Separator";

import Link from "next/link";
import { buttonVariants } from "../ui/Button";
import MobileNavMenu from "./MobileNavMenu";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/ScrollArea";

interface MobileNavProps {
  isPage?: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({ isPage }) => {
  return (
    <ScrollArea
      className={cn(
        "fixed inset-0 top-[62px] bg-background z-20",
        !isPage && "lg:hidden"
      )}
      ScrollAreaStyle={{ position: "fixed" }}
    >
      <nav role="menu">
        <div className="px-4">
          <Separator />
        </div>
        <div className="px-4 pb-36">
          <MobileNavMenu />

          {/* SignIn and SignUp */}
          <div className="flex flex-col gap-4 mt-6">
            <Link
              className={buttonVariants({ variant: "default" })}
              href="/sign-up?showMobileNav=1"
            >
              Get Notion free
            </Link>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/sign-in?showMobileNav=1"
            >
              Log in
            </Link>
          </div>
        </div>
      </nav>
    </ScrollArea>
  );
};

export default MobileNav;
