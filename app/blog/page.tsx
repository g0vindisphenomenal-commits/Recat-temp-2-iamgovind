import { BlogPosts } from "@/components/blog/blog-posts";
import { ContactCard } from "@/components/contact/contact-card";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Blog — Recent Writing",
  description: "Thoughts on software engineering, design, marketing, and things I find interesting.",
  path: "/blog",
});

export default function BlogPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col relative z-10 pt-32 sm:pt-40 pb-16 px-4">
      <div className="mx-auto w-full max-w-4xl">
        <BlogPosts />
      </div>

      <div className="mt-20">
        <ContactCard />
      </div>
      <div className="h-12 sm:h-16" />
    </main>
  );
}
