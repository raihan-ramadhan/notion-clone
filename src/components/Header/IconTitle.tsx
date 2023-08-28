"use client";

import { useTitle } from "@/store/use-title";
import { Document } from "@prisma/client";
import Image from "next/image";

interface IconTitleProps {
  doc: Document;
}

const IconTitle: React.FC<IconTitleProps> = ({ doc }) => {
  const { title } = useTitle();
  return (
    <div className="flex items-center gap-2 px-2 hover:bg-accent p-1 rounded-sm cursor-pointer">
      {doc.iconImage && (
        <Image
          height={24}
          width={24}
          alt="icon image"
          src={`${doc.iconImage.url}?timeStamp=${doc.iconImage.timeStamp}`}
          className="object-cover w-4 h-4 overflow-hidden shrink-0"
        />
      )}
      <span className="truncate flex-1 overflow-hidden">
        {title || doc.title || "Untitled"}
      </span>
    </div>
  );
};

export default IconTitle;
