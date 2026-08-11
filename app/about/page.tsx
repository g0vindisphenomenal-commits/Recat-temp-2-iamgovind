// import { Education } from "@/components/about/education";
import { Experience } from "@/components/about/experience";
import { PolaroidStrip } from "@/components/about/polaroid-strip";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import { Team } from "@/components/about/team";
import { ContactCard } from "@/components/contact/contact-card";
import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "About me, background, and how to get in touch.",
  path: "/about",
});

export default function AboutPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-312 pt-40 sm:pt-56">
        <PolaroidStrip />
      </section>

      <section className="mx-auto w-full max-w-[40rem] px-6 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24 lg:max-w-275 lg:grid lg:grid-cols-[1.4fr_1fr] lg:gap-8 lg:items-stretch">
        <FadeIn delay={0.5} className="h-full">
          <div className="rounded-4xl border border-foreground/5 bg-foreground/1.5 p-8 sm:p-12 dark:bg-foreground/3 h-full flex flex-col justify-center">
            <h1 className="font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2rem]">
              Hello! I&rsquo;m <span className="border-b border-foreground/30 pb-0.5">Govind</span>.
            </h1>
            <div className="mt-8 space-y-6 text-[17px] leading-[1.7] tracking-tight text-foreground/75 sm:text-[18px]">
              <p>
                A <strong className="font-semibold text-foreground">digital marketer and full-stack web developer</strong> passionate about crafting high-performance online experiences and growing brands. With expertise in performance campaigns, SEO, and modern web applications, I combine technical execution with marketing strategy to drive results.
              </p>
              <p>
                My approach merges data-driven marketing with modern engineering, allowing me to build speed-optimized sites and launch high-ROI campaigns that connect with the right audience.
              </p>
              <p>
                Based in Kerala, India, I partner with businesses globally to build scalable web platforms, optimize conversion rates, and manage strategic digital marketing pipelines.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.6} className="mt-8 lg:mt-0">
          <Team />
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-[40rem] px-6 pb-20 sm:px-10 sm:pb-28">
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-10">
            <Experience />
            {/* <Education /> */}
            <Skills />
            <Stack />
          </div>
        </FadeIn>
      </section>

      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
