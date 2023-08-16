import { notFound } from "next/navigation";
import React from "react";
import { cookies } from "next/headers";
import ReactResizablePanels from "@/components/ReactResizablePanels";
import { findDoc } from "@/actions/findDoc";

interface LayoutProps {
  children: React.ReactNode;
  params: { publicId: string };
}

function getDefaultLayout() {
  const layout = cookies().get("react-resizable-panels:layout");
  if (layout) {
    return JSON.parse(layout.value);
  }
  return [33, 67];
}

const Layout: React.FC<LayoutProps> = async ({
  children,
  params: { publicId },
}) => {
  const document = await findDoc(publicId);

  if (!document) return notFound();

  const defaultLayout = getDefaultLayout();

  return (
    <div className="h-screen w-full flex">
      <ReactResizablePanels defaultLayout={defaultLayout} right={children} />
    </div>
  );
};

export default Layout;
