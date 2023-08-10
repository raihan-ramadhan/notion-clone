import { notFound } from "next/navigation";
import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import ReactResizablePanels from "@/components/ReactResizablePanels";
import { findDoc } from "@/actions/findDoc";

interface paramsProps {
  params: { publicId: string };
}

interface LayoutProps extends paramsProps {
  children: React.ReactNode;
}

export async function generateMetadata(
  { params: { publicId } }: paramsProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const document = await findDoc(publicId);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: document?.title ?? "Not Found",
    openGraph: {
      images: [...previousImages],
    },
  };
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

  const defaultLayout = getDefaultLayout();

  if (!document) return notFound();

  return (
    <div className="h-screen w-full flex">
      <ReactResizablePanels defaultLayout={defaultLayout} right={children} />
    </div>
  );
};

export default Layout;
