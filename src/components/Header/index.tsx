import ToggleBtnDekstop from "./ToggleBtnDekstop";
import ToggleBtnMobile from "./ToggleBtnMobile";
import { Document } from "@prisma/client";
import Saving from "./Saving";
import Updated from "./Updated";
import IconTitle from "./IconTitle";
import Share from "./Share";

interface HeaderProps {
  doc?: Document;
  isShare?: boolean;
}

const Header: React.FC<HeaderProps> = ({ doc, isShare }) => {
  return (
    <header className="p-3 h-[48px] flex items-center border-b border-border">
      {isShare ? null : (
        <>
          <ToggleBtnDekstop />
          <ToggleBtnMobile />
        </>
      )}

      {doc && (
        <div className="flex-1 flex items-center justify-between text-sm">
          <div className="flex gap-3 items-center truncate">
            <IconTitle doc={doc} />
            <Saving />
          </div>
          <div className="flex gap-2">
            <Updated updatedAt={doc.updatedAt} />
            <Share isShare={isShare} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
