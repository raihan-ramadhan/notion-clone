import { Dialog, DialogContentMobileSidebar } from "@/components/ui/Dialog";
import UserButton from "./UserButton";
import LinksDocuments from "./LinksDoc";
import { UseMutateFunction, UseQueryResult } from "@tanstack/react-query";
import { DocumentType } from "@/types/db";
import Search from "./Search";
import SidebarMenuItem from "./SidebarMenuItem";
import Setting from "./Setting";

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
    <Dialog open={showSidebar} onOpenChange={toggle}>
      <DialogContentMobileSidebar>
        <aside>
          <nav aria-label="Sidebar" className="flex flex-col h-screen">
            <UserButton onClick={toggle} />

            <div className="p-1">
              <Search docs={docs}>
                <div>
                  <SidebarMenuItem isMobile iconName="Search" text="Search" />
                </div>
              </Search>

              <SidebarMenuItem
                isMobile
                className="cursor-not-allowed"
                iconName="Clock"
                text="Updates"
              />

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
      </DialogContentMobileSidebar>
    </Dialog>
  );
};

export default MobileSidebar;
