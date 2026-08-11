"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";

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
    company: "Freelance",
    role: "Digital Marketer & Developer",
    period: "2024 – Present",
    logoUrl: "/freelance.png",
  },
  {
    company: "Think Hub Academy",
    role: "Digital Marketing Executive",
    period: "2 yrs 8 mos",
    logoUrl: "/thinkhub.png",
    href: "https://thinkhub.academy/",
  },
];

const COLLAPSED_COUNT = 2.5;
const ROW_HEIGHT = 64;
const ROW_GAP = 8;

export function Experience(): ReactNode {
  const [open, setOpen] = useState(false);
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
        className={`border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative overflow-hidden rounded-4xl border px-2 pt-2 sm:px-4 sm:pt-4 ${
          open ? "pb-2 sm:pb-4" : "pb-0"
        }`}
      >
        <motion.div
          className="relative"
          initial={false}
          animate={{
            height: open ? "auto" : collapsedHeight,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden" }}
        >
          <ul className="flex flex-col gap-2">
            {ENTRIES.map((entry) => {
              const cardContent = (
                <div className="flex items-center gap-4 w-full">
                  <CompanyLogo entry={entry} />
                  <div className="flex min-w-0 flex-col">
                    <span className="text-foreground text-[17px] font-semibold tracking-tight sm:text-[18px] group-hover:text-foreground">
                      {entry.company}
                    </span>
                    <span className="text-foreground/65 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">
                      {entry.role}
                      <span className="text-foreground/30 mx-2">•</span>
                      <span className="text-foreground/55">{entry.period}</span>
                    </span>
                  </div>
                  {entry.href && (
                    <span className="ml-auto text-[13px] font-medium text-foreground/50 transition-colors group-hover:text-foreground border border-foreground/8 hover:bg-foreground/5 rounded-xl px-3 py-1.5 inline-flex items-center gap-0.5">
                      Visit
                      <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  )}
                </div>
              );

              return (
                <motion.li
                  key={`${entry.company}-${entry.period}`}
                  whileHover={{ y: -2, scale: 1.012 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="group relative list-none"
                >
                  {entry.href ? (
                    <a
                      href={entry.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-background border-foreground/5 flex items-center gap-4 rounded-3xl border p-2 w-full transition-all duration-300 hover:bg-foreground/2 hover:border-foreground/12 hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] focus-ring"
                      style={{ minHeight: ROW_HEIGHT }}
                    >
                      {cardContent}
                    </a>
                  ) : (
                    <div
                      className="bg-background border-foreground/5 flex items-center gap-4 rounded-3xl border p-2 w-full transition-all duration-300"
                      style={{ minHeight: ROW_HEIGHT }}
                    >
                      {cardContent}
                    </div>
                  )}
                </motion.li>
              );
            })}
          </ul>
        </motion.div>

        <AnimatePresence>
          {!open && (
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

function CompanyLogo({ entry }: { entry: Entry }): ReactNode {
  const initials = entry.company.charAt(0);
  return (
    <span
      className={`ring-foreground/8 inline-flex h-12 w-12 shrink-0 items-center justify-center ring-1 dark:ring-white/10 overflow-hidden ${entry.logoUrl ? "bg-transparent" : "bg-white"}`}
      aria-hidden="true"
      style={{
        borderRadius: 14,
        ...(entry.slug || entry.logoUrl ? {} : { backgroundColor: entry.brand }),
      }}
    >
      {entry.logoUrl ? (
        <img
          src={entry.logoUrl}
          alt=""
          width={48}
          height={48}
          className="h-full w-full object-cover"
          draggable={false}
        />
      ) : entry.slug ? (
        <img
          src={`/icons/${entry.slug}.svg`}

          alt=""
          width={24}
          height={24}
          className="h-6 w-6"
          draggable={false}
        />
      ) : (
        <span className="text-[18px] font-semibold tracking-tight text-white">
          {initials}
        </span>
      )}
    </span>
  );
}
