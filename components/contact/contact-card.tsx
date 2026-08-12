import Link from "next/link";
import type { ReactNode } from "react";
import {
  IconMail,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconRss,
} from "@tabler/icons-react";

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
                    <IconMail className="h-5 w-5" />
                  </BrandSocialIcon>

                  <BrandSocialIcon
                    href="https://www.linkedin.com/in/iamgovind-digital-marketing-expert-in-kerala-trivandrum/"
                    label="LinkedIn"
                  >
                    <IconBrandLinkedin className="h-5 w-5" />
                  </BrandSocialIcon>

                  <BrandSocialIcon
                    href="https://www.facebook.com/iamg0vind/"
                    label="Facebook"
                  >
                    <IconBrandFacebook className="h-5 w-5" />
                  </BrandSocialIcon>

                  <BrandSocialIcon
                    href="https://www.instagram.com/iamg0vind/"
                    label="Instagram"
                  >
                    <IconBrandInstagram className="h-5 w-5" />
                  </BrandSocialIcon>

                  <BrandSocialIcon
                    href="/feed.xml"
                    label="RSS Feed"
                  >
                    <IconRss className="h-5 w-5" />
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
