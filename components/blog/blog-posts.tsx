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
      <div className="mx-auto w-full max-w-312 px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-7">
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
      className="h-full"
    >
      <Link href={`/blog/${post.id}`} className="block group h-full">
        <article className="project-card flex h-full cursor-pointer flex-col justify-between gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5 transition-all duration-300 hover:border-foreground/20 hover:shadow-md">
          <div className="flex flex-col gap-4">
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
              className="project-card__image ring-foreground/5 relative w-full overflow-hidden rounded-2xl bg-foreground/5 ring-1 aspect-[16/10]"
            >
              <div className="project-card__image-inner">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                  priority={index < 3}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 px-1">
              <h3 className="text-[19px] font-medium leading-[1.25] tracking-tight text-foreground sm:text-[21px] group-hover:text-foreground/80 transition-colors">
                {post.title}
              </h3>
              <p className="text-[14px] leading-normal tracking-tight text-foreground/65 line-clamp-3">
                {post.description}
              </p>
            </div>
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
