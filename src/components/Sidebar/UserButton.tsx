"use client";

import {
  UserButton as UserButtonClerk,
  useUser,
} from "@clerk/nextjs/app-beta/client";
import { Icons } from "../Icons";

interface UserButtonProps {
  onClick: () => void;
}

const UserButton: React.FC<UserButtonProps> = ({ onClick }) => {
  const { user, isLoaded } = useUser();

  return (
    <div className="relative flex group h-[50px] shrink-0">
      {isLoaded ? (
        <>
          <UserButtonClerk
            appearance={{
              elements: {
                rootBox: "w-full bg-transparent group-hover:bg-accent h-[50px]",
                userButtonTrigger:
                  "p-3 cursor-pointer h-full w-full rounded-none flex justify-start focus:shadow-none",
                userButtonPopoverCard: "ml-3 rounded-lg [&_*]:text-primary",
                userButtonAvatarBox: "h-6 w-6 rounded-sm ",
                userPreviewAvatarBox: "rounded-sm",
                userButtonPopoverFooter: "[&_*]:text-primary/30",
              },
            }}
          />
          <div className="absolute top-1/2 -translate-y-1/2 font-semibold w-full flex-1 flex items-center pointer-events-none select-none ring-inset pl-12 pr-9 z-0">
            <span className="truncate overflow-hidden w-max">
              {user?.fullName}
            </span>
            <Icons.CaretSort className="h-4 w-4 shrink-0" />
          </div>
        </>
      ) : (
        <div className="h-[50px] cursor-pointer p-3 w-full flex gap-3 shrink-0 animate-pulse pr-10">
          <div className="h-6 w-6 bg-accent-foreground/50 rounded-sm" />
          <div className="flex-1 h-6 bg-accent-foreground/50 rounded-sm" />
        </div>
      )}
      <Icons.DoubleArrowLeft
        onClick={onClick}
        className="h-6 w-6 p-1 hover:bg-accent-foreground/20 rounded-sm absolute top-1/2 -translate-y-1/2 right-2 z-10 cursor-pointer"
      />
    </div>
  );
};

export default UserButton;
