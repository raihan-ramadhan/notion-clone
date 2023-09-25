import LinksDoc from "./LinksDoc";
import SidebarMenuItem from "./SidebarMenuItem";
import UserButton from "./UserButton";

import Search from "./Search";
import Setting from "./Setting";
import { DocumentType } from "@/types/db";
import { UseMutateFunction, UseQueryResult } from "@tanstack/react-query";

interface Sidebar {
  toggleSidebar: () => void;
  addDoc: UseMutateFunction<string, Error, void, unknown>;
  query: UseQueryResult<DocumentType[] | undefined, Error>;
}

const Sidebar: React.FC<Sidebar> = ({ toggleSidebar, addDoc, query }) => {
  const { status, data: docs, refetch } = query;

  return (
    <aside>
      <nav aria-label="Sidebar" className="flex flex-col h-screen">
        <UserButton onClick={toggleSidebar} />
        <div className="p-1 shrink-0 px-3">
          <Search docs={docs}>
            <div>
              <SidebarMenuItem iconName="Search" text="Search" />
            </div>
          </Search>

          <Setting>
            <div>
              <SidebarMenuItem iconName="Gear" text="Setting" />
            </div>
          </Setting>

          <SidebarMenuItem
            onClick={addDoc}
            iconName="PlusCircle"
            text="New page"
          />
        </div>
        <LinksDoc
          addDoc={addDoc}
          docs={docs}
          refetch={refetch}
          status={status}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
