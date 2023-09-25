"use client";

import { PanelGroupProvider } from "./PanelContext";

interface PanelGroupProps {
  children: React.ReactNode;
  defaultLayout?: number;
  maxWidth?: number;
  minWidth?: number;
  // eslint-disable-next-line no-unused-vars
  onLayout: (size: number) => void;
}

const PanelGroup: React.FC<PanelGroupProps> = ({
  children,
  defaultLayout,
  maxWidth,
  minWidth,
  onLayout,
}) => {
  return (
    <PanelGroupProvider
      values={{ sidebarWidth: defaultLayout }}
      maxWidth={maxWidth}
      minWidth={minWidth}
      onLayout={onLayout}
    >
      <div className="flex h-full w-full">{children}</div>
    </PanelGroupProvider>
  );
};

export default PanelGroup;
