import { ArrowLeft, Calendar, CheckCircle2, Clock, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { ContactCard } from "@/components/contact/contact-card";
import { CodeBlock } from "@/components/ui/code-block";
import { FadeIn } from "@/components/ui/motion-primitives";

import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog-data";
import type { BlogPost, BlogPostSection } from "@/lib/blog-data";
import { createMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return createMetadata({
      title: "Article Not Found",
      description: "The requested article could not be found.",
    });
  }

  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.id}`,
    image: post.image,
  });
}

export default async function BlogPostPage({ params }: PageProps): Promise<ReactNode> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.id, 2);

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      {/* Top Bar Navigation & Article Header */}
      <article className="mx-auto w-full max-w-275 px-6 pt-36 pb-12 sm:px-10 sm:pt-48 sm:pb-16">
        <FadeIn delay={0.1}>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to insights
          </Link>
        </FadeIn>

        <FadeIn delay={0.2} className="flex flex-col gap-6">
          {/* Category & Meta info */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-lg bg-foreground/5 px-3 py-1 text-xs font-semibold text-foreground/80">
              {post.category}
            </span>
            <span className="text-foreground/30">•</span>
            <div className="flex items-center gap-4 text-xs text-foreground/50">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Article Title */}
          <h1 className="font-serif text-[2.5rem] font-medium leading-[1.08] tracking-tight text-foreground sm:text-[3.25rem] lg:text-[3.75rem]">
            {post.title}
          </h1>

          {/* Article Excerpt */}
          <p className="max-w-3xl text-[19px] leading-[1.5] tracking-tight text-foreground/70 sm:text-[21px]">
            {post.description}
          </p>

          {/* Author Badge */}
          <div className="mt-2 flex items-center gap-3.5 border-t border-foreground/8 pt-6">
            <div className="relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-foreground/10 bg-foreground/5">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">{post.author.name}</span>
              <span className="text-xs text-foreground/60">{post.author.role}</span>
            </div>
          </div>
        </FadeIn>

        {/* Hero Featured Image */}
        <FadeIn delay={0.3} className="mt-10 mb-12 sm:mt-12 sm:mb-16">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-foreground/8 bg-foreground/5 shadow-sm ring-1 ring-foreground/5">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(min-width: 1200px) 1100px, 100vw"
              className="object-cover"
            />
          </div>
          {post.imageAlt && (
            <p className="mt-3 text-center text-xs text-foreground/45 italic">
              {post.imageAlt}
            </p>
          )}
        </FadeIn>

        {/* Article Body Content */}
        <FadeIn delay={0.4} className="mx-auto max-w-[44rem]">
          <div className="space-y-6 text-foreground/80">
            {post.sections.map((section, idx) => (
              <RenderSection key={idx} section={section} />
            ))}
          </div>

          {/* Tags Section */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-foreground/8 pt-8">
              <span className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mr-2">
                Topics:
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-foreground/4 px-3 py-1 text-xs font-medium text-foreground/75"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Back to all posts link block */}
          <div className="mt-10 flex items-center justify-between rounded-2xl border border-foreground/8 bg-foreground/1.5 p-6 dark:bg-foreground/3">
            <div className="flex flex-col">
              <span className="font-serif text-lg font-medium text-foreground">Enjoyed this article?</span>
              <span className="text-xs text-foreground/60">Explore more marketing & development insights.</span>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-xs font-semibold text-background transition-opacity hover:opacity-90"
            >
              All Articles
              <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
            </Link>
          </div>
        </FadeIn>
      </article>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="w-full border-t border-foreground/8 bg-foreground/1 dark:bg-foreground/2 py-16">
          <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2rem]">
                Continue reading
              </h2>
              <Link
                href="/blog"
                className="text-xs font-semibold text-foreground/70 hover:text-foreground transition-colors"
              >
                View all insights →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relPost, index) => (
                <RelatedCard key={relPost.id} post={relPost} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}

function RenderSection({ section }: { section: BlogPostSection }): ReactNode {
  switch (section.type) {
    case "heading":
      return (
        <h2 className="font-serif text-[1.75rem] font-medium leading-[1.25] tracking-tight text-foreground sm:text-[2.25rem] mt-10 mb-4 pt-4 border-t border-foreground/5">
          {section.content}
        </h2>
      );
    case "paragraph":
      return (
        <p className="text-[17px] leading-[1.75] tracking-tight text-foreground/80 sm:text-[18px]">
          {section.content}
        </p>
      );
    case "blockquote":
      return (
        <blockquote className="my-8 rounded-3xl border-l-4 border-foreground bg-foreground/2 p-6 sm:p-8 dark:bg-foreground/4">
          <p className="font-serif text-[19px] italic leading-[1.6] text-foreground sm:text-[21px]">
            &ldquo;{section.content}&rdquo;
          </p>
          {section.author && (
            <footer className="mt-3 text-xs font-semibold uppercase tracking-wider text-foreground/60">
              — {section.author}
            </footer>
          )}
        </blockquote>
      );
    case "takeaways":
      return (
        <div className="my-8 rounded-3xl border border-foreground/10 bg-foreground/2 p-6 sm:p-8 dark:bg-foreground/4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
            <Sparkles className="h-4 w-4 text-foreground/75" />
            <span>{section.content || "Key Takeaways"}</span>
          </div>
          {section.items && (
            <ul className="space-y-3">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] sm:text-[16px] text-foreground/80 leading-snug">
                  <CheckCircle2 className="h-4 w-4 text-foreground/60 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    case "code":
      return <CodeBlock code={section.code || ""} language={section.language} />;

    default:
      return null;
  }
}

function RelatedCard({ post, index }: { post: BlogPost; index: number }): ReactNode {
  return (
    <FadeIn delay={index * 0.1}>
      <Link href={`/blog/${post.id}`} className="block group h-full">
        <article className="project-card flex h-full cursor-pointer flex-col justify-between rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5">
          <div className="flex flex-col gap-4">
            <header className="flex items-center justify-between px-1 pt-2">
              <span className="inline-flex items-center rounded-lg bg-foreground/5 px-2.5 py-1 text-xs font-semibold text-foreground/80">
                {post.category}
              </span>
              <span className="text-xs text-foreground/50">{post.readTime}</span>
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
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 px-1 pb-1">
              <h3 className="text-[18px] font-medium leading-[1.25] tracking-tight text-foreground sm:text-[20px] group-hover:text-foreground/80 transition-colors">
                {post.title}
              </h3>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-1 px-1 pb-2 text-[13px] font-medium text-foreground group-hover:text-foreground/80 transition-colors">
            <span>Read article</span>
            <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
          </div>
        </article>
      </Link>
    </FadeIn>
  );
}
