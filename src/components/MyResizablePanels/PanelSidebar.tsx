"use client";

import { forwardRef, ComponentPropsWithRef } from "react";
import { usePanelGroupContext } from "./PanelContext";

type PanelSidebarProps = ComponentPropsWithRef<"div"> & {
  collapse?: boolean;
};

const PanelSidebar = forwardRef<HTMLDivElement, PanelSidebarProps>(
  (
    // eslint-disable-next-line no-unused-vars
    { children, className, collapse, ...rest },
    ref
  ) => {
    const { sidebarWidth } = usePanelGroupContext();

    return (
      <div
        ref={ref}
        className={className}
        style={{
          width: collapse ? 0 : sidebarWidth,
          display: collapse ? "none" : undefined,
        }}
      >
        {children}
      </div>
    );
  }
);

PanelSidebar.displayName = "PanelSidebar";

export default PanelSidebar;
