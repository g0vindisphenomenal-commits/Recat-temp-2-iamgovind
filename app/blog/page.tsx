import { BlogPosts } from "@/components/blog/blog-posts";
import { ContactCard } from "@/components/contact/contact-card";
import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description: "Insights on SEO, digital marketing, and modern web development.",
  path: "/blog",
});

export default function BlogPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-275 px-6 pt-44 pb-12 sm:px-10 sm:pt-56 sm:pb-16">
        <FadeIn className="flex flex-col items-center gap-5 text-center">
          <h1 className="font-serif text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3.25rem] lg:text-[3.75rem]">
            Insights & thoughts
          </h1>
          <p className="max-w-[36ch] text-[20px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px]">
            Growth strategies, web development, and digital marketing ideas.
          </p>
        </FadeIn>
      </section>
      <BlogPosts />
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
