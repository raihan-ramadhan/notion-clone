import ToggleBtnDekstop from "./ToggleBtnDekstop";
import ToggleBtnMobile from "./ToggleBtnMobile";

interface HeaderProps {
  toggleDekstopSidebar: () => void;
  showDekstopSidebar: boolean;
  toggleMobileSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({
  showDekstopSidebar,
  toggleDekstopSidebar,
  toggleMobileSidebar,
}) => {
  return (
    <header className="p-3 h-[48px] flex items-center border-b border-border">
      <ToggleBtnDekstop
        toggle={toggleDekstopSidebar}
        showSidebar={showDekstopSidebar}
      />
      <ToggleBtnMobile toggle={toggleMobileSidebar} />
    </header>
  );
};

export default Header;
