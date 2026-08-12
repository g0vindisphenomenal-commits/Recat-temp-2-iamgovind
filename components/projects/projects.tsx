import {
  ArrowRight,
  Cpu,
  ExternalLink,
  Film,
  Globe,
  ShoppingBag,
  Store,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/ui/motion-primitives";

/**
 * Project imagery below is mockup-only. All visuals are sourced from
 * Dribbble and credit belongs to the original creators on dribbble.com.
 * Replace these with your own work before shipping.
 */

type Project = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  iconLabel: string;
  title: string;
  description: string;
  meta: string;
  imageRatio: number;
  image: string;
  imageAlt: string;
  href?: string;
};

const PROJECTS: Project[] = [
  {
    id: "marhabahospitality",
    icon: ShoppingBag,
    iconLabel: "Marhaba Hospitality",
    title: "E-Commerce Supply Platform for Hotels & Resorts",
    description:
      "Designed and developed a premium hospitality supplying website based in Dubai, operating similarly to an e-commerce platform. Built with an Angular frontend and a Python backend, the platform enables commercial clients to browse extensive hospitality catalog categories and seamlessly request custom bulk order quotations.",
    meta: "Full Stack Developer (Angular & Python), 2026",
    imageRatio: 1024 / 768,
    image: "/marhabahospitality.png",
    imageAlt: "Marhaba Hospitality supplying website mockup",
    href: "https://marhabahospitality.com/",
  },
  {
    id: "reshmihappyhome",
    icon: Store,
    iconLabel: "Reshmi Happy Home",
    title: "E-Commerce Website for Electronics & Appliances",
    description:
      "Designed and developed a robust e-commerce platform for Reshmi Happy Home, an electronics and home appliances store. Built with WordPress and WooCommerce, the site features a custom bottom mobile navigation panel, a dedicated client dashboard, advanced off-canvas product filters, and optimized checkout pipelines for streamlined shopping.",
    meta: "Full Stack Developer (WordPress & WooCommerce), 2026",
    imageRatio: 1024 / 768,
    image: "/reshmihappyhome-actual.png",
    imageAlt: "Reshmi Happy Home e-commerce website mockup",
    href: "https://reshmihappyhome.com/",
  },
  {
    id: "cybertruckfilms",
    icon: Film,
    iconLabel: "Cybertruck Films",
    title: "Cinematic Website for a Video Production Company",
    description:
      "Designed and developed the official website for Cybertruck Films, a professional video production company specializing in cinematic ads, brand films, photoshoots, and digital content creation. Built on WordPress, the site features a sleek, dark-themed user interface, integrated video showreels, and portfolio grids showcasing their creative projects.",
    meta: "Designer & Developer (WordPress), 2026",
    imageRatio: 1024 / 768,
    image: "/cybertruckfilms-actual.png",
    imageAlt: "Cybertruck Films website mockup",
    href: "https://cybertruckfilms.com/",
  },
  {
    id: "microbotit",
    icon: Cpu,
    iconLabel: "MicrobotIT",
    title: "Educational Website for Microbot Institute of Technology",
    description:
      "Designed and developed a modern, high-performance website for a premier technical institute in Kochi specializing in advanced hardware and PC engineering. Built on Angular, the site features a dark high-tech aesthetic, interactive course catalogs, labs overview, and enrollment pipelines designed to showcase their hands-on, practical-first training philosophy.",
    meta: "Frontend Developer (Angular), 2026",
    imageRatio: 1024 / 640,
    image: "/microbotit.png",
    imageAlt: "Microbot Institute of Technology website mockup",
    href: "https://microbotit.com/",
  },
  {
    id: "rijasrazak",
    icon: Globe,
    iconLabel: "Rijasrazak.com",
    title: "Portfolio Website for a Digital Marketer & Influencer",
    description:
      "Designed and developed a professional portfolio website for a digital marketer and social media influencer based in Thrissur. The project focused on creating a clean, modern layout that effectively showcases services, influencer brand deals, expertise, and content creation. Emphasis was placed on user experience, responsive design, and clear call-to-actions to support personal branding and audience engagement.",
    meta: "Designer & Developer, 2026",
    imageRatio: 1024 / 768,
    image: "/rijasrazak-actual.png",
    imageAlt: "Rijasrazak.com website mockup",
    href: "https://rijasrazak.com/",
  },
];

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
}: ProjectsProps): ReactNode {
  const items = viewMoreVisible ? PROJECTS.slice(0, 4) : PROJECTS;

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <h2 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
              My projects
            </h2>
            <p className="max-w-full text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              From playful experiments to thoughtful systems, a look at the
              work I&rsquo;m proud to have shipped.
            </p>
          </FadeIn>
        ) : null}

        <div className="columns-1 gap-6 md:columns-2 md:gap-7">
          {items.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {viewMoreVisible ? (
          <div className="mt-12 flex justify-center sm:mt-16">
            <Link
              href="/projects"
              className="border border-foreground/8 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              View all projects
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}): ReactNode {
  const Icon = project.icon;

  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="mb-6 break-inside-avoid md:mb-7"
    >
      <article className="project-card group flex h-full flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-foreground/15">
        <header className="flex items-center justify-between gap-2.5 px-1 pt-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="border-foreground/10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background">
              <Icon className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium tracking-tight text-foreground truncate">
              {project.iconLabel}
            </span>
          </div>

          {project.href ? (
            <Link
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-foreground/12 bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/85 shadow-2xs backdrop-blur-md transition-all duration-200 hover:border-foreground/25 hover:bg-foreground/10 hover:text-foreground cursor-pointer"
            >
              Visit
              <ExternalLink className="h-3 w-3" />
            </Link>
          ) : null}
        </header>

        <div
          className="project-card__image ring-foreground/5 relative w-full overflow-hidden rounded-2xl bg-foreground/5 ring-1"
          style={{ aspectRatio: project.imageRatio }}
        >
          <div className="project-card__image-inner">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={index < 2}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 px-1 pb-1">
          <h3 className="text-[20px] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[22px]">
            {project.title}
          </h3>
          <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
            {project.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 px-1 pb-2">
          <p className="text-[12px] tracking-tight text-foreground/50 truncate">
            {project.meta}
          </p>
          {project.href ? (
            <Link
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1 text-[12px] font-medium text-foreground/75 transition-colors hover:text-foreground cursor-pointer"
            >
              Visit site
              <ArrowRight className="h-3 w-3 -rotate-45 transition-transform duration-200 hover:translate-x-0.5 hover:-translate-y-0.5" />
            </Link>
          ) : null}
        </div>
      </article>
    </FadeIn>
  );
}
