"use client";

import { formatTimeToNow } from "@/lib/utils";
import { useEffect, useState } from "react";

interface UpdatedProps {
  updatedAt: Date;
}

const Updated: React.FC<UpdatedProps> = ({ updatedAt }) => {
  const [Edited, setEdited] = useState<string>(
    formatTimeToNow(new Date(updatedAt))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setEdited(formatTimeToNow(new Date(updatedAt)));
    }, 60000); // 60000 milliseconds = 1 minute

    // test1();
    return () => {
      clearInterval(interval);
    };
  }, [updatedAt]);

  useEffect(() => {
    setEdited(formatTimeToNow(new Date(updatedAt)));
  }, [updatedAt]);

  return (
    <span className="h-[28px] shrink-0 font-normal px-0 flex w-max items-center pointer-events-none">
      <div className="opacity-60 dark:opacity-40 gap-1 flex items-center">
        <span>Edited</span>
        <time
          dateTime={new Date(updatedAt).toDateString()}
          // we expect hydration warning error here, because every 1 minute we update our time so frequently in the development it will cause hydration warning because time updating while app get compile and the result is text in server and client no same (the hydration warning just appear on development)
          suppressHydrationWarning
        >
          {Edited}
        </time>
      </div>
    </span>
  );
};

export default Updated;
