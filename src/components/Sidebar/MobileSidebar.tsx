import UserButton from "./UserButton";
import LinksDocuments from "./LinksDoc";
import { UseMutateFunction, UseQueryResult } from "@tanstack/react-query";
import { DocumentType } from "@/types/db";
import Search from "./Search";
import SidebarMenuItem from "./SidebarMenuItem";
import Setting from "./Setting";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
  showSidebar: boolean;
  toggle: () => void;
  addDoc: UseMutateFunction<string, Error, void, unknown>;
  query: UseQueryResult<DocumentType[] | undefined, Error>;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  showSidebar,
  toggle,
  addDoc,
  query,
}) => {
  const { status, data: docs, refetch } = query;

  return (
    <>
      {/* background overlay */}
      <div
        onClick={toggle}
        className={cn(
          `fixed inset-0 z-50 bg-zinc-900/30 dark:bg-white/20 backdrop-blur-sm !duration-200 cursor-pointer md:!hidden`,
          showSidebar
            ? "opacity-100 visible ease-out"
            : "opacity-0 invisible ease-in"
        )}
      />
      {/* real mobile sidebar */}
      <aside
        className={cn(
          `fixed z-50 top-0 bottom-0 w-[calc(100%_-_80px)] sm:w-[320px] md:w-0 md:!hidden max-w-lg gap-4 border bg-background shadow-[5px_0_5px] shadow-foreground/30 focus-within:outline-none !duration-200`,
          showSidebar ? "left-0 ease-out" : "-left-full ease-in"
        )}
      >
        <nav aria-label="Sidebar" className="flex flex-col h-screen">
          <UserButton onClick={toggle} />

          <div className="py-1 px-3">
            <Search docs={docs}>
              <div>
                <SidebarMenuItem isMobile iconName="Search" text="Search" />
              </div>
            </Search>

            <Setting>
              <div>
                <SidebarMenuItem isMobile iconName="Gear" text="Setting" />
              </div>
            </Setting>

            <SidebarMenuItem
              isMobile
              onClick={addDoc}
              iconName="PlusCircle"
              text="New page"
            />
          </div>

          <LinksDocuments
            addDoc={addDoc}
            docs={docs}
            refetch={refetch}
            status={status}
            isMobile
            toggle={toggle}
          />
        </nav>
      </aside>
    </>
  );
};

export default MobileSidebar;
