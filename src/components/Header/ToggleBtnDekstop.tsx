import { cn } from "@/lib/utils";
import { Icons } from "../Icons";

interface ToggleBtnDekstopProps {
  toggle: () => void;
  showSidebar: boolean;
}

const ToggleBtnDekstop: React.FC<ToggleBtnDekstopProps> = ({
  showSidebar,
  toggle,
}) => {
  return (
    <div
      className={cn(
        "group hover:bg-accent cursor-pointer rounded-sm relative h-6 w-6 hidden md:block",
        showSidebar && "!hidden"
      )}
      onClick={toggle}
    >
      <Icons.DoubleArrowRight className="h-6 w-6 p-1 group-hover:opacity-100 opacity-0 absolute inset-0 pointer-events-none transition-opacity duration-75" />
      <Icons.HamburgerMenu className="h-6 w-6 group-hover:opacity-0 opacity-100 absolute inset-0 pointer-events-none transition-opacity duration-75" />
    </div>
  );
};

export default ToggleBtnDekstop;
