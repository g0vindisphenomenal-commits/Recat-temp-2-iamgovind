import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/ui/motion-primitives";

import { POSTS } from "@/lib/blog-data";
import type { BlogPost } from "@/lib/blog-data";


export function BlogPosts(): ReactNode {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        <div className="columns-1 gap-6 md:columns-2 md:gap-7">
          {POSTS.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogCard({
  post,
  index,
}: {
  post: BlogPost;
  index: number;
}): ReactNode {
  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="mb-6 break-inside-avoid md:mb-7"
    >
      <Link href={`/blog/${post.id}`} className="block group">
        <article className="project-card flex cursor-pointer flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5">
          <header className="flex items-center justify-between px-1 pt-2">
            <span className="inline-flex items-center rounded-lg bg-foreground/5 px-2.5 py-1 text-xs font-semibold text-foreground/80">
              {post.category}
            </span>
            <div className="flex items-center gap-3 text-xs text-foreground/50">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </span>
            </div>
          </header>

          <div
            className="project-card__image ring-foreground/5 relative w-full overflow-hidden rounded-2xl bg-foreground/5 ring-1"
            style={{ aspectRatio: post.imageRatio }}
          >
            <div className="project-card__image-inner">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
                className="object-cover"
                priority={index < 2}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5 px-1 pb-1">
            <h3 className="text-[20px] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[22px] group-hover:text-foreground/80 transition-colors">
              {post.title}
            </h3>
            <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
              {post.description}
            </p>
          </div>

          <div className="mt-2 flex items-center gap-1 px-1 pb-2 text-[13px] font-medium text-foreground group-hover:text-foreground/80 transition-colors">
            <span>Read article</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </article>
      </Link>
    </FadeIn>
  );
}
