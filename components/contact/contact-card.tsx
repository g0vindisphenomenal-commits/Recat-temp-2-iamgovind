"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  IconMail,
  IconBrandWhatsapp,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
} from "@tabler/icons-react";

import { ContactCardCtas } from "./contact-card-ctas";
import { FadeIn } from "@/components/ui/motion-primitives";
import { ShaderFlow } from "../shaders/shader-flow";

const CARD_FADE_MASK =
  "radial-gradient(ellipse 90% 110% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.15) 100%)";

export function ContactCard(): ReactNode {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

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
                  <h2 className="font-serif text-[2.5rem] font-medium leading-[1.08] tracking-tight text-foreground sm:text-[3rem] lg:text-[3.25rem] mb-4 min-h-[1.2em]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={hoveredLabel || "default"}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="block"
                      >
                        {hoveredLabel ? `${hoveredLabel}.` : "Let\u2019s connect."}
                      </motion.span>
                    </AnimatePresence>
                  </h2>
                  <p className="max-w-[29ch] text-[18px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px] mb-6">
                    I&rsquo;m always open to discussing new projects, creative
                    ideas, or opportunities to be part of your visions. Just reach out!
                  </p>
                  <ContactCardCtas />
                </div>
              </div>

              <div className="border-foreground/8 flex flex-col items-center justify-center gap-6 rounded-[1.1rem] border bg-background p-6 sm:p-8">
                {/* 5 SOCIAL ICONS: Gmail, WhatsApp, LinkedIn, Facebook, Instagram */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <BrandSocialIcon
                    href="mailto:superiorgovind@gmail.com"
                    label="Gmail"
                    onMouseEnter={() => setHoveredLabel("Gmail")}
                    onMouseLeave={() => setHoveredLabel(null)}
                  >
                    <IconMail className="h-5 w-5" />
                  </BrandSocialIcon>

                  <BrandSocialIcon
                    href="https://wa.me/919995513314"
                    label="WhatsApp"
                    onMouseEnter={() => setHoveredLabel("WhatsApp")}
                    onMouseLeave={() => setHoveredLabel(null)}
                  >
                    <IconBrandWhatsapp className="h-5 w-5" />
                  </BrandSocialIcon>

                  <BrandSocialIcon
                    href="https://www.linkedin.com/in/iamgovind-digital-marketing-expert-in-kerala-trivandrum/"
                    label="LinkedIn"
                    onMouseEnter={() => setHoveredLabel("LinkedIn")}
                    onMouseLeave={() => setHoveredLabel(null)}
                  >
                    <IconBrandLinkedin className="h-5 w-5" />
                  </BrandSocialIcon>

                  <BrandSocialIcon
                    href="https://www.facebook.com/iamg0vind/"
                    label="Facebook"
                    onMouseEnter={() => setHoveredLabel("Facebook")}
                    onMouseLeave={() => setHoveredLabel(null)}
                  >
                    <IconBrandFacebook className="h-5 w-5" />
                  </BrandSocialIcon>

                  <BrandSocialIcon
                    href="https://www.instagram.com/iamg0vind/"
                    label="Instagram"
                    onMouseEnter={() => setHoveredLabel("Instagram")}
                    onMouseLeave={() => setHoveredLabel(null)}
                  >
                    <IconBrandInstagram className="h-5 w-5" />
                  </BrandSocialIcon>
                </div>

                <div className="flex flex-col items-center justify-center text-center">
                  <p className="text-[13px] tracking-tight text-foreground/70">
                    i do
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
  onMouseEnter,
  onMouseLeave,
}: {
  href: string;
  label: string;
  children: ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}): ReactNode {
  const isExternal =
    href.startsWith("http") ||
    href.endsWith(".xml") ||
    href.endsWith(".pdf") ||
    href.startsWith("tel:") ||
    href.startsWith("sms:");
  const externalProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const mouseProps = {
    ...(onMouseEnter ? { onMouseEnter } : {}),
    ...(onMouseLeave ? { onMouseLeave } : {}),
  };

  return (
    <Link
      href={href}
      aria-label={label}
      className="border-foreground/8 hover:border-foreground/20 hover:scale-105 focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-background text-foreground/70 transition-all hover:text-foreground cursor-pointer"
      {...externalProps}
      {...mouseProps}
    >
      {children}
    </Link>
  );
}
