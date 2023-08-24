import ToggleBtnDekstop from "./ToggleBtnDekstop";
import ToggleBtnMobile from "./ToggleBtnMobile";
import { Document } from "@prisma/client";
import { formatTimeToNow } from "@/lib/utils";
import Image from "next/image";

interface HeaderProps {
  doc: Document;
}

const Header: React.FC<HeaderProps> = ({ doc }) => {
  const { title, iconImage, updatedAt } = doc;

  return (
    <header className="p-3 h-[48px] flex items-center border-b border-border">
      <ToggleBtnDekstop />
      <ToggleBtnMobile />

      <div className="flex-1 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 px-2 hover:bg-accent p-1 rounded-sm cursor-pointer truncate">
          {iconImage && (
            <Image
              height={24}
              width={24}
              alt="icon image"
              src={`${iconImage.url}?timeStamp=${iconImage.timeStamp}`}
              className="object-cover w-4 h-4 overflow-hidden shrink-0"
            />
          )}
          <span className="truncate flex-1 overflow-hidden">{title}</span>
        </div>
        <span className="shrink-0 px-2 hover:bg-accent p-1 rounded-sm cursor-pointer">
          <span>Edited </span>
          <time dateTime={new Date(updatedAt).toDateString()}>
            {formatTimeToNow(new Date(updatedAt))}
          </time>
        </span>
      </div>
    </header>
  );
};

export default Header;
