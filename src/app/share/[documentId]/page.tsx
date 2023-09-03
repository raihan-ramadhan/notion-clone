import { findDoc } from "@/actions/findDoc";
import Header from "@/components/Header";
import Output from "@/components/Editor/Output";
import { cn, isValidObjectID } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Metadata, ResolvingMetadata } from "next";

interface ParamsProps {
  params: { documentId: string };
}

const Page: React.FC<ParamsProps> = async ({ params: { documentId } }) => {
  const validObjectID = isValidObjectID(documentId);

  if (!validObjectID) return notFound();

  const doc = await findDoc(documentId);

  if (!doc) return notFound();

  const { title, coverImage, iconImage, editorJson } = doc;
  return (
    <div>
      <Header doc={doc} isShare />
      <ScrollArea className="h-[calc(100vh_-_48px)]" type="always">
        <main className="flex flex-col h-[inherit]">
          {coverImage && (
            <div className="h-[200px] md:h-[280px] w-full relative group shrink-0">
              <Image
                src={`${coverImage.url}?timeStamp=${coverImage.timeStamp}`}
                className="object-cover md:object-left z-0 bg-accent"
                alt="cover image"
                quality={95}
                priority
                fill
              />
            </div>
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
                <div
                  className={cn(
                    "relative",
                    !!coverImage &&
                      "absolute z-10 left-10 md:left-24 top-0 -translate-y-1/2"
                  )}
                >
                  <Image
                    className={cn("w-[125px] h-[125px] object-cover bg-accent")}
                    alt="icons image"
                    src={`${iconImage.url}?timeStamp=${iconImage.timeStamp}`}
                    height="125"
                    width="125"
                    quality={95}
                    priority
                  />
                </div>
              )}

              <h1 className="focus:outline-none text-4xl font-bold py-5 ">
                {title || "Untitled"}
              </h1>
            </div>

            <Output editorJson={editorJson} />
          </section>
        </main>
      </ScrollArea>
    </div>
  );
};

export default Page;

export async function generateMetadata(
  { params: { documentId } }: ParamsProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];

  const validObjectID = isValidObjectID(documentId);

  if (!validObjectID)
    return {
      title: "Not Found",
      openGraph: {
        images: [...previousImages],
      },
      icons: {
        icon: [
          {
            type: "image/x-icon",
            sizes: "any",
            url: "/favicon.ico",
          },
        ],
      },
    };

  // fetch data
  const document = await findDoc(documentId);

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: document?.title || "Untitled",
    openGraph: {
      images: [...previousImages],
    },
    icons: {
      icon: [
        {
          type: "image/x-icon",
          sizes: "any",
          url: document?.iconImage?.url ?? "/favicon.ico",
        },
      ],
    },
  };
}
