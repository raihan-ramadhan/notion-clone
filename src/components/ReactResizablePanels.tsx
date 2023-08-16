"use client";

import axios from "axios";
import Sidebar from "./Sidebar";
import MobileSidebar from "./Sidebar/MobileSidebar";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { DocumentType } from "@/types/db";
import { useShowSidebar } from "@/store/use-show-sidebar";
import { useEffect, useRef } from "react";
import { useShowMobileSidebar } from "@/hooks/use-show-mobile-sidebar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  ImperativePanelHandle,
} from "react-resizable-panels";

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
  const { showDekstopSidebar, toggleDekstopSidebar } = useShowSidebar();
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
    onError: () => {
      return toast({
        title: "Something went wrong",
        description: "Failed make a new page",
        variant: "destructive",
      });
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

  useEffect(() => {
    const panel = ref.current;
    if (panel) {
      showDekstopSidebar ? panel.collapse() : panel.expand();
    }
  }, [showDekstopSidebar]);

  return (
    <PanelGroup direction="horizontal" onLayout={onLayout}>
      <Panel
        className={cn(
          "bg-secondary/50 max-w-[480px]",
          showDekstopSidebar && "min-w-[220px]",
          "hidden md:block"
        )}
        defaultSize={defaultLayout[0]}
        minSize={0}
        collapsible
        ref={ref}
      >
        <Sidebar
          toggleSidebar={toggleDekstopSidebar}
          addDoc={addDoc}
          query={query}
        />
      </Panel>
      <PanelResizeHandle
        className={cn(
          "w-[3px] bg-accent hover:bg-border",
          !showDekstopSidebar && "pointer-events-none",
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
