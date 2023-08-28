"use client";

import axios from "axios";
import Sidebar from "./Sidebar";
import MobileSidebar from "./Sidebar/MobileSidebar";

import { cn } from "@/lib/utils";
import { toast, toastError } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { DocumentType } from "@/types/db";
import { useEffect, useRef } from "react";
import { useShowMobileSidebar } from "@/hooks/use-show-mobile-sidebar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  ImperativePanelHandle,
} from "react-resizable-panels";
import { useShowSidebarContext } from "@/lib/context/show-sidebar-context";

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
  defaultLayout: number[];
  right: React.ReactNode;
}) {
  const { showMobileSidebar, toggleMobileSidebar } = useShowMobileSidebar();

  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };

  const router = useRouter();
  const ref = useRef<ImperativePanelHandle>(null);

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

  useEffect(() => {
    const panel = ref.current;
    if (panel) {
      showSidebar ? panel.collapse() : panel.expand();
    }
  }, [showSidebar]);

  return (
    <PanelGroup direction="horizontal" onLayout={onLayout}>
      <Panel
        className={cn(
          "bg-secondary/50 max-w-[480px]",
          showSidebar && "min-w-[220px]",
          "hidden md:block"
        )}
        defaultSize={defaultLayout[0]}
        minSize={0}
        collapsible
        ref={ref}
      >
        <Sidebar toggleSidebar={toggleSidebar} addDoc={addDoc} query={query} />
      </Panel>
      <PanelResizeHandle
        className={cn(
          "w-[3px] bg-accent hover:bg-border",
          !showSidebar && "pointer-events-none",
          "!hidden md:!block"
        )}
      />
      <Panel className="bg-background" defaultSize={defaultLayout[1]}>
        <MobileSidebar
          addDoc={addDoc}
          query={query}
          showSidebar={showMobileSidebar}
          toggle={toggleMobileSidebar}
        />
        {right}
      </Panel>
    </PanelGroup>
  );
}
