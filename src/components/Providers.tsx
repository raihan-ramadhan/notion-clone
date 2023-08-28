"use client";

import { ShowsidebarProvider } from "@/lib/context/show-sidebar-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

const Providers = ({
  children,
  showSidebar,
}: {
  children: React.ReactNode;
  showSidebar: boolean;
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1 * 5000,
          },
        },
      })
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <ShowsidebarProvider showSidebar={showSidebar}>
          {children}
        </ShowsidebarProvider>
        {<ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ThemeProvider>
  );
};
export default Providers;
