import { findDoc } from "@/actions/findDoc";
import Header from "@/components/Header";
import CoverImageBtn from "@/components/Main/CoverImageBtn";
import IconImageBtn from "@/components/Main/IconImageBtn";
import { cn } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ParamsProps {
  params: { publicId: string };
}

const Page: React.FC<ParamsProps> = async ({ params: { publicId } }) => {
  const doc = await findDoc(publicId);

  if (!doc) return notFound();

  const { title, coverImage, iconImage } = doc;

  return (
    <>
      <Header doc={doc} />
      <main className="overflow-y-auto h-[calc(100vh_-_48px)] overflow-hidden">
        {coverImage ? (
          <div className="h-[280px] w-full relative">
            <Image
              src={coverImage}
              className="object-cover object-left-bottom z-0"
              alt="cover image"
              quality={95}
              priority
              fill
            />
          </div>
        ) : null}

        <section className="relative max-w-[900px] mx-auto px-24">
          <div
            className={cn(
              "group",
              iconImage && coverImage && "pt-[70px]",
              !iconImage && coverImage && "pt-[25px]",
              iconImage && !coverImage && "pt-16",
              !iconImage && !coverImage && "pt-10"
            )}
          >
            {iconImage && (
              <Image
                className={cn(
                  "w-[125px] h-[125px] object-cover",
                  coverImage && "absolute z-10 left-24 top-0 -translate-y-1/2 "
                )}
                alt="icons image"
                src={iconImage}
                quality={95}
                height={125}
                width={125}
                priority
              />
            )}

            {!(iconImage && coverImage) && (
              <div className="h-6 inline-flex gap-2 pt-5">
                {!iconImage && <IconImageBtn />}
                {!coverImage && <CoverImageBtn />}
              </div>
            )}

            <h2 className="focus:outline-none text-4xl font-semibold py-5">
              {title}
            </h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum
            earum exercitationem porro rerum nostrum itaque maxime fugit nulla
            laudantium veritatis repellat, doloribus perspiciatis deleniti quis
            dolorum quasi similique minima officiis impedit commodi? Nesciunt
            nulla maxime pariatur fugit recusandae inventore delectus
            reprehenderit modi, accusantium autem, voluptates asperiores
            maiores, illo animi nemo repellat? Illum dignissimos aut corrupti
            quisquam quos consequuntur dolore recusandae accusantium molestias,
            error maxime mollitia voluptas facilis consequatur veritatis
            voluptatibus id impedit dolor explicabo ducimus asperiores. Nam,
            tempore velit aliquid, non error incidunt dolor, in blanditiis et
            ducimus atque. Eligendi facere maiores accusamus ut reprehenderit
            iure quia veniam deserunt ratione.
          </p>
        </section>
      </main>
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

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: document?.title ?? "Not Found",
    openGraph: {
      images: [...previousImages],
    },
    icons: {
      icon: [
        {
          type: "image/x-icon",
          sizes: "any",
          url: document?.iconImage ?? "/favicon.ico",
        },
      ],
    },
  };
}
