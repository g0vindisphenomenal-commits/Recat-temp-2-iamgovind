import Link from "next/link";
import type { ReactNode } from "react";

import { ContactCardCtas } from "./contact-card-ctas";
import { FadeIn } from "@/components/ui/motion-primitives";
import { ShaderFlow } from "../shaders/shader-flow";

const CARD_FADE_MASK =
  "radial-gradient(ellipse 90% 110% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.15) 100%)";

export function ContactCard(): ReactNode {
  return (
    <section className="mx-auto my-12 w-full max-w-275 px-6 sm:my-20 sm:px-10">
      <FadeIn>
        <div className="relative w-full overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
          <div className="relative w-full overflow-hidden rounded-[1.6rem]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-45 dark:opacity-25"
              style={{
                WebkitMaskImage: CARD_FADE_MASK,
                maskImage: CARD_FADE_MASK,
              }}
            >
              <ShaderFlow scale={3} brightness={3} />
            </div>

            <div className="relative grid gap-8 p-6 sm:gap-10 sm:p-7 md:grid-cols-[1.2fr_1fr] md:items-stretch md:gap-6 md:p-6">
              <div className="flex flex-col justify-between rounded-[1.1rem] border border-foreground/8 bg-background p-6 sm:p-8">
                <div>
                  <h2 className="font-serif text-[2.5rem] font-medium leading-[1.08] tracking-tight text-foreground sm:text-[3rem] lg:text-[3.25rem] mb-4">
                    Let&rsquo;s connect.
                  </h2>
                  <p className="max-w-[29ch] text-[18px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px] mb-6">
                    I&rsquo;m always open to discussing new projects, creative
                    ideas, or opportunities to be part of your visions. Just reach out!
                  </p>
                  <ContactCardCtas />
                </div>
              </div>

              <div className="border-foreground/8 flex flex-col items-center justify-center gap-6 rounded-[1.1rem] border bg-background p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <BrandSocialIcon
                    href="mailto:superiorgovind@gmail.com"
                    label="Email"
                  >
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </BrandSocialIcon>

                  <BrandSocialIcon
                    href="https://www.linkedin.com/in/iamgovind-digital-marketing-expert-in-kerala-trivandrum/"
                    label="LinkedIn"
                  >
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </BrandSocialIcon>

                  <BrandSocialIcon
                    href="https://www.facebook.com/iamg0vind/"
                    label="Facebook"
                  >
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C20.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </BrandSocialIcon>

                  <BrandSocialIcon
                    href="https://www.instagram.com/iamg0vind/"
                    label="Instagram"
                  >
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </BrandSocialIcon>

                  <BrandSocialIcon
                    href="/feed.xml"
                    label="RSS Feed"
                  >
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20 5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-3.2A12.36 12.36 0 0 0 4 7.64V4.44m0 6.4a9.16 9.16 0 0 1 9.16 9.16h-3.2A5.96 5.96 0 0 0 4 14.04v-3.2z" />
                    </svg>
                  </BrandSocialIcon>

                </div>

                <div className="flex flex-col items-center justify-center text-center">
                  <p className="text-[13px] tracking-tight text-foreground/70">
                    2026 &copy; Built with Next.js
                  </p>
                </div>


              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function BrandSocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}): ReactNode {
  const isExternal = href.startsWith("http") || href.endsWith(".xml") || href.endsWith(".pdf");
  const props = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Link
      href={href}
      aria-label={label}
      className="border-foreground/8 hover:border-foreground/15 focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-background text-foreground/70 transition-colors hover:text-foreground"
      {...props}
    >

      <div>{children}</div>
    </Link>
  );
}
