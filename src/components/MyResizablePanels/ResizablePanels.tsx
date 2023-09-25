"use client";

import axios from "axios";
import Sidebar from "../Sidebar";
import MobileSidebar from "../Sidebar/MobileSidebar";
import { cn } from "@/lib/utils";
import { toast, toastError } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { DocumentType } from "@/types/db";
import { useShowMobileSidebar } from "@/hooks/use-show-mobile-sidebar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useShowSidebarContext } from "@/lib/context/show-sidebar-context";
import PanelGroup from "./PanelGroup";
import PanelSidebar from "./PanelSidebar";
import PanelResizeHandler from "./PanelResizeHandler";

interface Data {
  data: DocumentType[] | undefined;
}

const useDocs = () => {
  return useQuery({
    staleTime: 10 * (60 * 1000), // 10 mins
    queryKey: ["docs"],
    queryFn: async () => {
      const { data }: Data = await axios.get("/api/documents");
      return data;
    },
  });
};

export default function ReactResizablePanels({
  defaultLayout,
  right,
}: {
  defaultLayout: number;
  right: React.ReactNode;
}) {
  const { showMobileSidebar, toggleMobileSidebar } = useShowMobileSidebar();

  const router = useRouter();

  const query = useDocs();
  const queryClient = useQueryClient();

  const { mutate: addDoc } = useMutation({
    mutationFn: async () => {
      const { data: newDoc }: { data: string } = await axios.post(
        "/api/untitled"
      );

      return newDoc;
    },
    onError: (error: any) => {
      return toastError({ error, title: "Failed make a new document" });
    },
    onSuccess: (newDoc) => {
      queryClient.invalidateQueries({ queryKey: ["docs"] });

      router.push("/" + newDoc);

      return toast({
        title: "Successfully added the doc",
        variant: "default",
      });
    },
  });

  const showSidebar = useShowSidebarContext((s) => s.showSidebar);
  const toggleSidebar = useShowSidebarContext((s) => s.toggleSidebar);

  const onLayout = (sizes: number) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };

  return (
    <PanelGroup
      defaultLayout={defaultLayout}
      maxWidth={480}
      minWidth={220}
      onLayout={onLayout}
    >
      <PanelSidebar
        className="bg-secondary/50 hidden md:block"
        collapse={!showSidebar}
      >
        <Sidebar toggleSidebar={toggleSidebar} addDoc={addDoc} query={query} />
      </PanelSidebar>
      <PanelResizeHandler
        id={"my-PanelResizeHandler"}
        disabled={!showSidebar}
        className={cn("w-[4px] bg-accent hover:bg-border hidden md:block")}
      />
      <div className="bg-background flex-1">
        <MobileSidebar
          addDoc={addDoc}
          query={query}
          showSidebar={showMobileSidebar}
          toggle={toggleMobileSidebar}
        />
        {right}
      </div>
    </PanelGroup>
  );
}
