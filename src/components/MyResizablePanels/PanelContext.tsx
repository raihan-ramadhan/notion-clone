"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from "react";
import { InitialDragState, ResizeEvent, ResizeHandler } from "./types";
import { getMovement } from "./utils";

interface PanelGroupContext {
  // eslint-disable-next-line no-unused-vars
  registerResizeHandle: (id: string) => ResizeHandler;
  // eslint-disable-next-line no-unused-vars
  startDragging: (event: ResizeEvent) => void;
  stopDragging: () => void;
  sidebarWidth?: number;
  isDragging: boolean;
}

export const PanelGroupContext = createContext<PanelGroupContext | null>(null);

interface PanelGroupProviderProps {
  children?: React.ReactNode;
  values: Pick<PanelGroupContext, "sidebarWidth"> & {};
  maxWidth?: number;
  minWidth?: number;
  // eslint-disable-next-line no-unused-vars
  onLayout: (size: number) => void;
}

export function PanelGroupProvider({
  children,
  values,
  maxWidth,
  minWidth,
  onLayout,
}: PanelGroupProviderProps) {
  const initialDragStateRef = useRef<InitialDragState | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState<number>(
    values.sidebarWidth ?? maxWidth ?? minWidth ?? 100
  );

  // eslint-disable-next-line no-unused-vars
  const registerResizeHandle = useCallback(
    (id: string) => {
      const resizeHandler = (event: ResizeEvent) => {
        event.preventDefault();

        let movement = getMovement(event, id, initialDragStateRef.current);

        if (movement === 0) return;

        if (minWidth && sidebarWidth + movement < minWidth) {
          if (sidebarWidth !== minWidth) {
            setSidebarWidth(minWidth);
          }
          return;
        }

        if (maxWidth && sidebarWidth + movement > maxWidth) {
          if (sidebarWidth !== maxWidth) {
            setSidebarWidth(maxWidth);
          }
          return;
        }

        setSidebarWidth((prev) => prev + movement);
      };

      return resizeHandler;
    },
    [maxWidth, minWidth, sidebarWidth]
  );

  const context: PanelGroupContext = useMemo(
    () => ({
      // eslint-disable-next-line no-unused-vars
      startDragging: (event: ResizeEvent) => setIsDragging(true),
      stopDragging: () => setIsDragging(false),
      isDragging,
      registerResizeHandle,
      sidebarWidth,
    }),
    [isDragging, registerResizeHandle, sidebarWidth]
  );

  useEffect(() => {
    onLayout(sidebarWidth);
  }, [sidebarWidth, onLayout]);

  return (
    <PanelGroupContext.Provider value={context}>
      {children}
    </PanelGroupContext.Provider>
  );
}

export function usePanelGroupContext() {
  const store = useContext(PanelGroupContext);
  if (!store)
    throw new Error(
      "useShowSidebar must be used within an ShowsidebarContextProvider"
    );
  return store;
}
