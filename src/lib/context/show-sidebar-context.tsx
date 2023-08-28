/* eslint-disable no-unused-vars */
import { createStore, useStore } from "zustand";
import React, { createContext, useRef, useContext } from "react";

interface ShowSidebarProps {
  showSidebar: boolean;
}

interface ShowSidebarState extends ShowSidebarProps {
  toggleSidebar: () => void;
}

type ShowSidebarStore = ReturnType<typeof createShowSidebarStore>;

export const createShowSidebarStore = (
  initProps?: Partial<ShowSidebarProps>
) => {
  const DEFAULT_PROPS: ShowSidebarProps = {
    showSidebar: true,
  };
  return createStore<ShowSidebarState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    toggleSidebar: () =>
      set((state) => {
        const showSidebar = !state.showSidebar;
        document.cookie = `showSidebar:isShow=${JSON.stringify(showSidebar)}`;
        return { showSidebar };
      }),
  }));
};

export const ShowSidebarContext = createContext<ShowSidebarStore | null>(null);

type ShowsidebarProviderProps = React.PropsWithChildren<ShowSidebarProps>;

export function ShowsidebarProvider({
  children,
  ...props
}: ShowsidebarProviderProps) {
  const storeRef = useRef<ShowSidebarStore>();
  if (!storeRef.current) {
    storeRef.current = createShowSidebarStore(props);
  }
  return (
    <ShowSidebarContext.Provider value={storeRef.current}>
      {children}
    </ShowSidebarContext.Provider>
  );
}

export function useShowSidebarContext<T>(
  selector: (state: ShowSidebarState) => T
): T {
  const store = useContext(ShowSidebarContext);
  if (!store)
    throw new Error(
      "useShowSidebar must be used within an ShowsidebarContextProvider"
    );
  return useStore(store, selector);
}
