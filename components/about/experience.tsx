"use client";

import { ChevronDown, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, useRef, useEffect, type ReactNode } from "react";
import { BlurFade } from "@/components/ui/blur-fade";

type Entry = {
  company: string;
  role: string;
  period: string;
  slug?: string;
  brand?: string;
  logoUrl?: string;
  href?: string;
};

const ENTRIES: Entry[] = [
  {
    company: "Think Hub Academy",
    role: "Digital Marketing Executive",
    period: "2 yrs 8 mos",
    logoUrl: "/thinkhub.png",
    href: "https://thinkhub.academy/",
  },
  {
    company: "Freelance",
    role: "Digital Marketer & Developer",
    period: "2024 – Present",
    logoUrl: "/freelance.png",
  },
];

const COLLAPSED_COUNT = 2.5;
const ROW_HEIGHT = 64;
const ROW_GAP = 8;

export function Experience(): ReactNode {
  const [open, setOpen] = useState(false);
  const [expandedLogo, setExpandedLogo] = useState<string | null>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!expandedLogo) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (bubbleRef.current && !bubbleRef.current.contains(e.target as Node)) {
        setExpandedLogo(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expandedLogo]);

  const collapsedHeight =
    Math.floor(COLLAPSED_COUNT) * ROW_HEIGHT +
    Math.floor(COLLAPSED_COUNT) * ROW_GAP +
    (COLLAPSED_COUNT % 1) * ROW_HEIGHT;
  const hiddenCount = ENTRIES.length - Math.floor(COLLAPSED_COUNT);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
        Experience
      </h3>
      <div
        className={`border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative overflow-hidden rounded-4xl border p-2 sm:p-4 ${
          hiddenCount > 0 && !open ? "pb-0" : ""
        }`}
      >
        <motion.div
          className="relative"
          initial={false}
          animate={{
            height: hiddenCount > 0 && !open ? collapsedHeight : "auto",
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden" }}
        >
          <ul className="flex flex-col gap-2">
            {ENTRIES.map((entry, index) => {
              return (
                <BlurFade key={`${entry.company}-${entry.period}`} delay={0.05 * index} inView>
                  <motion.li
                    whileHover={{ y: -2, scale: 1.012 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="group relative list-none"
                  >
                    <div
                      className="bg-background border-foreground/5 flex items-center gap-4 rounded-3xl border p-2 w-full transition-all duration-300 hover:bg-foreground/2 hover:border-foreground/12 hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)]"
                      style={{ minHeight: ROW_HEIGHT }}
                    >
                      {/* Logo / DP Button - Click or touch pops up enlarged view */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            entry.logoUrl
                              ? setExpandedLogo(
                                  expandedLogo === entry.company ? null : entry.company
                                )
                              : undefined
                          }
                          className="ring-foreground/8 inline-flex h-12 w-12 shrink-0 items-center justify-center ring-1 dark:ring-white/10 overflow-hidden rounded-[14px] bg-transparent cursor-pointer transition-transform duration-300 hover:scale-105 relative select-none"
                          aria-label={`View ${entry.company} photo`}
                        >
                          {entry.logoUrl ? (
                            <img
                              src={entry.logoUrl}
                              alt={entry.company}
                              width={48}
                              height={48}
                              className="h-full w-full object-cover"
                              draggable={false}
                            />
                          ) : (
                            <span className="text-[18px] font-semibold tracking-tight text-white">
                              {entry.company.charAt(0)}
                            </span>
                          )}
                        </button>

                        {/* DP Popup Bubble */}
                        <AnimatePresence>
                          {expandedLogo === entry.company && entry.logoUrl && (
                            <motion.div
                              ref={bubbleRef}
                              initial={{ opacity: 0, scale: 0.5, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.5, y: 10 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                              className="absolute left-0 bottom-full mb-2 z-50"
                            >
                              <div className="relative rounded-2xl border border-foreground/10 bg-background shadow-xl overflow-hidden">
                                <img
                                  src={entry.logoUrl}
                                  alt={entry.company}
                                  className="w-36 h-36 sm:w-44 sm:h-44 object-cover"
                                  draggable={false}
                                />
                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-2.5">
                                  <p className="text-white text-[13px] font-semibold leading-tight">
                                    {entry.company}
                                  </p>
                                  <p className="text-white/75 text-[11px]">
                                    {entry.role}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedLogo(null);
                                  }}
                                  className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                              {/* Triangle pointer */}
                              <div className="absolute left-4 -bottom-1.5 w-3 h-3 bg-background border-r border-b border-foreground/10 rotate-45" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Text info */}
                      <div className="flex min-w-0 flex-col">
                        <span className="text-foreground text-[17px] font-semibold tracking-tight sm:text-[18px]">
                          {entry.company}
                        </span>
                        <span className="text-foreground/65 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">
                          {entry.role}
                          <span className="text-foreground/30 mx-2">•</span>
                          <span className="text-foreground/55">{entry.period}</span>
                        </span>
                      </div>

                      {/* Visit button - ONLY clicking this opens the website */}
                      {entry.href && (
                        <a
                          href={entry.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto text-[13px] font-medium text-foreground/70 transition-colors hover:text-foreground border border-foreground/10 hover:bg-foreground/5 rounded-xl px-3 py-1.5 inline-flex items-center gap-1 cursor-pointer focus-ring"
                        >
                          Visit
                          <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </a>
                      )}
                    </div>
                  </motion.li>
                </BlurFade>
              );
            })}
          </ul>
        </motion.div>

        <AnimatePresence>
          {hiddenCount > 0 && !open && (
            <motion.div
              key="fade"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0"
              style={{
                height: ROW_HEIGHT,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 80%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 80%)",
              }}
            />
          )}
        </AnimatePresence>

        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className={`focus-ring text-foreground flex w-full cursor-pointer items-center justify-center gap-1.5 bg-transparent text-[15px] font-medium tracking-tight ${
              open
                ? "relative mt-4"
                : "absolute inset-x-0 bottom-0 z-10 py-3 sm:py-4"
            }`}
          >
            {open ? "Show less" : `Show ${hiddenCount} more`}
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="inline-flex"
            >
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </motion.span>
          </button>
        )}
      </div>
    </div>
  );
}
