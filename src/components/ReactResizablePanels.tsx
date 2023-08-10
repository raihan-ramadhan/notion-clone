"use client";

import { useMemo, useRef, useState } from "react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  ImperativePanelHandle,
} from "react-resizable-panels";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import Header from "./Header";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { nanoid } from "nanoid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { DocumentType } from "@/types/db";

import dynamic from "next/dynamic";
import { useShowMobileSidebar } from "@/hooks/use-show-mobile-sidebar";
// const MobileSidebar = dynamic(() => import("./Sidebar/MobileSidebar"), {
//   ssr: false,
// });

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
  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };

  const router = useRouter();
  const ref = useRef<ImperativePanelHandle>(null);

  const { showMobileSidebar, toggleMobileSidebar } = useShowMobileSidebar();

  const [showDekstopSidebar, setShowDekstopSidebar] = useState<boolean>(true);
  const toggleDekstopSidebar = () => {
    const panel = ref.current;
    if (panel) {
      showDekstopSidebar ? panel.collapse() : panel.expand();
    }
    setShowDekstopSidebar(!showDekstopSidebar);
  };

  const query = useDocs();
  const queryClient = useQueryClient();

  const { mutate: addDoc } = useMutation({
    mutationFn: async () => {
      const newId = nanoid(12);

      const { data: newDoc }: { data: string } = await axios.post(
        "/api/untitled",
        { publicId: newId }
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

  const MobileSidebar = useMemo(
    () =>
      dynamic(() => import("./Sidebar/MobileSidebar"), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showMobileSidebar]
  );

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
          "hidden md:block"
        )}
      />
      <Panel className="bg-background" defaultSize={defaultLayout[1]}>
        <MobileSidebar
          addDoc={addDoc}
          query={query}
          showSidebar={showMobileSidebar}
          toggle={toggleMobileSidebar}
        />
        <Header
          showDekstopSidebar={showDekstopSidebar}
          toggleDekstopSidebar={toggleDekstopSidebar}
          toggleMobileSidebar={toggleMobileSidebar}
        />
        {right}
      </Panel>
    </PanelGroup>
  );
}
