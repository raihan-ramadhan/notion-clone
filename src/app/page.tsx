import PreventBubblingClient from "@/components/PreventBubblingClient";
import Nav from "@/components/Home/Nav";
import { buttonVariants } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/app-beta";
import { getInitialDoc } from "@/actions/getInitialDoc";
import { createUntitled } from "@/actions/createUntitled";

export default async function Home() {
  const { userId } = auth();

  if (userId) {
    const document = await getInitialDoc(userId);

    // find first document to redirect if already logged in
    if (document) {
      return redirect(`/${document.publicId}`);
    } else {
      //   if there is no doc yet make one then redirect
      const { publicId } = await createUntitled(userId);

      return redirect(`/${publicId}`);
    }
  }

  return (
    <div>
      <Nav />
      <main className="mt-[62px] h-[calc(100vh_-_62px)] xl:mx-auto px-[32px] sm:px-[70px] md:px-[125px] overflow-hidden">
        <section className="text-center flex flex-col items-center gap-3 mx-auto">
          <header className="xs:w-full w-[300px] flex flex-col items-center gap-4">
            <h1 className="text-center pt-20 items-center text-5xl md:text-6xl lg:text-7xl max-w-[780px] w-auto font-bold">
              Your
              <PreventBubblingClient>
                <a
                  className="inline-flex items-end cursor-not-allowed"
                  href="/product/wikis"
                >
                  <span className="flex items-end px-3">
                    <Image
                      priority
                      className="h-[45px] w-auto md:h-[58px] lg:h-[68px]"
                      src={"/images/wikis-icon.png"}
                      height={70}
                      width={52}
                      alt="wikis-icon"
                    />
                  </span>
                  <span className="underline ">wiki</span>
                </a>
              </PreventBubblingClient>
              ,
              <PreventBubblingClient>
                <a
                  className="inline-flex items-end cursor-not-allowed"
                  href="/product/docs"
                >
                  <span className="flex items-end px-3">
                    <Image
                      priority
                      className="h-[45px] w-auto md:h-[58px] lg:h-[68px] "
                      src={"/images/docs-icon.png"}
                      height={70}
                      width={52}
                      alt="docs-icon"
                    />
                  </span>
                  <span className="underline ">docs</span>,
                </a>
              </PreventBubblingClient>
              &
              <PreventBubblingClient>
                <a
                  className="inline-flex items-end cursor-not-allowed"
                  href="/product/projects"
                >
                  <span className="flex items-end px-3">
                    <Image
                      priority
                      className="h-[45px] w-auto md:h-[58px] lg:h-[68px]"
                      src={"/images/projects-icon.png"}
                      height={70}
                      width={52}
                      alt="projects-icon"
                    />
                  </span>
                  <span className="underline ">projects.</span>
                </a>
              </PreventBubblingClient>
              Together.
            </h1>
            <p className="font-semibold text-2xl max-w-[560px]">
              Notion is the connected workspace where better, faster work
              happens. Now with AI
            </p>
            <Link
              className={buttonVariants({ variant: "default" })}
              href="/sign-up"
            >
              Get Notion free
            </Link>
          </header>

          <picture>
            <source
              srcSet="/images/home-hero-dark.png"
              media="(prefers-color-scheme: dark)"
            />
            <Image
              className="max-w-[850px] w-full"
              src="/images/home-hero.png"
              alt="home-hero"
              height={260}
              width={852}
              priority
              role="presentation"
            />
          </picture>
        </section>

        <div className="w-[768px] md:w-[unset]">
          <picture>
            <source
              srcSet="/images/sidekick-desktop-app-dark.png"
              media="(prefers-color-scheme: dark)"
            />
            <Image
              className="h-auto w-full md:max-w-[1024px] mx-auto"
              src="/images/sidekick-desktop-app.png"
              alt="home-hero"
              width={1024}
              height={640}
              priority
            />
          </picture>
        </div>
      </main>
    </div>
  );
}
