import { findDoc } from "@/actions/findDoc";
import Header from "@/components/Header";
import CoverImgUploadBtn from "@/components/Main/CoverImgUploadBtn";
import CoverImage from "@/components/Main/coverImage";
import IconImgUploadBtn from "@/components/Main/IconImgUploadBtn";
import { cn } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import { notFound, redirect } from "next/navigation";
import IconImage from "@/components/Main/IconImage";
import Editor from "@/components/Editor";
import { getIsOwner } from "@/actions/getIsOwner";
import { auth } from "@clerk/nextjs";
import Forbidden from "@/components/Main/Forbidden";
import Title from "@/components/Main/Title";
import { ScrollArea } from "@/components/ui/ScrollArea";

interface ParamsProps {
  params: { publicId: string };
}

const Page: React.FC<ParamsProps> = async ({ params: { publicId } }) => {
  const doc = await findDoc(publicId);

  if (!doc) return notFound();

  const { userId } = auth();

  if (!userId) {
    return redirect(`/$sign-in`);
  }

  const isOwner = await getIsOwner(publicId, userId);

  if (!isOwner) {
    return <Forbidden />;
  }

  const { title, coverImage, iconImage, id, editorJson } = doc;

  return (
    <>
      <Header doc={doc} />

      <ScrollArea className="h-[calc(100vh_-_48px)]" type="always">
        <main className="flex flex-col h-[inherit]">
          {coverImage && (
            <CoverImage coverImage={coverImage} id={id} publicId={publicId} />
          )}

          <section className="flex flex-col flex-1 w-full">
            <div
              className={cn(
                "group flex flex-col shrink-0 px-10 md:px-24 w-full max-w-[900px] mx-auto relative",
                iconImage && coverImage && "pt-[70px]",
                !iconImage && coverImage && "pt-[25px]",
                iconImage && !coverImage && "pt-16",
                !iconImage && !coverImage && "pt-10"
              )}
            >
              {iconImage && (
                <IconImage
                  id={id}
                  publicId={publicId}
                  isCoverImage={!!coverImage}
                  iconImage={iconImage}
                />
              )}

              {!(iconImage && coverImage) && (
                <div className="h-6 inline-flex gap-2 mt-5">
                  {!iconImage && (
                    <IconImgUploadBtn publicId={publicId} id={id} />
                  )}
                  {!coverImage && (
                    <CoverImgUploadBtn publicId={publicId} id={id} />
                  )}
                </div>
              )}

              <Title currentTitle={title} publicId={publicId} id={id} />
            </div>

            <Editor id={id} editorJson={editorJson} publicId={publicId} />
          </section>
        </main>
      </ScrollArea>
    </>
  );
};

export default Page;

export async function generateMetadata(
  { params: { publicId } }: ParamsProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const document = await findDoc(publicId);

  const { userId } = auth();

  if (!userId) {
    return redirect(`/$sign-in`);
  }

  const isOwner = await getIsOwner(publicId, userId);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: !document
      ? "Not Found"
      : !isOwner
      ? "Forbidden"
      : document.title || "Untitled",
    openGraph: {
      images: [...previousImages],
    },
    icons: {
      icon: [
        {
          type: "image/x-icon",
          sizes: "any",
          url: !isOwner
            ? "/favicon.ico"
            : document?.iconImage?.url ?? "/favicon.ico",
        },
      ],
    },
  };
}
