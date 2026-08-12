"use client";

import {
  IconArrowLeft,
  IconArrowUpRight,
  IconCheck,
  IconChevronDown,
  IconFilter,
  IconX,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useMemo, useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";
import { TransitionLink } from "@/components/ui/transition-link";
import { POSTS } from "@/lib/blog-data";

export function BlogPosts(): ReactNode {
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close filter dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    POSTS.forEach((post) => {
      post.tags?.forEach((t) => tagsSet.add(t));
    });
    return Array.from(tagsSet);
  }, []);

  // Extract all unique years
  const allYears = useMemo(() => {
    const yearsSet = new Set<string>();
    POSTS.forEach((post) => {
      const year = new Date(post.date).getFullYear();
      if (!isNaN(year)) yearsSet.add(year.toString());
    });
    return Array.from(yearsSet).sort((a, b) => Number(b) - Number(a));
  }, []);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    return POSTS.filter((post) => {
      const matchesTag =
        selectedTag === "all" || post.tags?.includes(selectedTag);
      const postYear = new Date(post.date).getFullYear().toString();
      const matchesYear = selectedYear === "all" || postYear === selectedYear;
      return matchesTag && matchesYear;
    }).sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });
  }, [selectedTag, selectedYear, sortOrder]);

  const hasActiveFilters =
    selectedTag !== "all" || selectedYear !== "all" || sortOrder !== "newest";

  const clearFilters = () => {
    setSelectedTag("all");
    setSelectedYear("all");
    setSortOrder("newest");
  };

  return (
    <div className="w-full">
      {/* Top Header Row with Back Link & Filter Toggle */}
      <FadeIn delay={0.005}>
        <div className="flex items-center justify-between gap-4 mb-8">
          <TransitionLink
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back home
          </TransitionLink>

          {/* Right-aligned Top Filter Toggle & Popover */}
          <div className="relative" ref={filterRef}>
            <button
              type="button"
              onClick={() => setFilterOpen((prev) => !prev)}
              aria-label="Filter blog posts"
              aria-expanded={filterOpen}
              className={`group inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium transition-all cursor-pointer ${
                hasActiveFilters || filterOpen
                  ? "border-foreground/30 bg-foreground/10 text-foreground shadow-sm"
                  : "border-foreground/10 bg-background text-muted-foreground hover:border-foreground/20 hover:text-foreground"
              }`}
            >
              <IconFilter className="h-4 w-4 transition-transform duration-200 group-hover:scale-105" />
              <span>Filter</span>
              {hasActiveFilters && (
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              )}
              <IconChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  filterOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Filter Popover Dropdown */}
            <AnimatePresence>
              {filterOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute right-0 top-full z-50 mt-2 w-72 sm:w-80 rounded-2xl border border-foreground/12 bg-background/95 p-4 shadow-2xl backdrop-blur-xl ring-1 ring-black/5"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                      Filter & Sort
                    </span>
                    {hasActiveFilters && (
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      >
                        Reset all
                      </button>
                    )}
                  </div>

                  <div className="mt-3.5 space-y-4">
                    {/* Sort Order */}
                    <div>
                      <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                        Order
                      </span>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSortOrder("newest")}
                          className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer text-left flex items-center justify-between ${
                            sortOrder === "newest"
                              ? "bg-foreground text-background"
                              : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
                          }`}
                        >
                          <span>Newest first</span>
                          {sortOrder === "newest" && (
                            <IconCheck className="h-3.5 w-3.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setSortOrder("oldest")}
                          className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer text-left flex items-center justify-between ${
                            sortOrder === "oldest"
                              ? "bg-foreground text-background"
                              : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
                          }`}
                        >
                          <span>Oldest first</span>
                          {sortOrder === "oldest" && (
                            <IconCheck className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Time / Year Filter */}
                    {allYears.length > 0 && (
                      <div>
                        <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                          Time (Year)
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedYear("all")}
                            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                              selectedYear === "all"
                                ? "bg-foreground text-background"
                                : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
                            }`}
                          >
                            All Time
                          </button>
                          {allYears.map((yr) => (
                            <button
                              key={yr}
                              type="button"
                              onClick={() => setSelectedYear(yr)}
                              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                                selectedYear === yr
                                  ? "bg-foreground text-background"
                                  : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
                              }`}
                            >
                              {yr}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tags Filter */}
                    {allTags.length > 0 && (
                      <div>
                        <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                          Topic Tags
                        </span>
                        <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                          <button
                            type="button"
                            onClick={() => setSelectedTag("all")}
                            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                              selectedTag === "all"
                                ? "bg-foreground text-background"
                                : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
                            }`}
                          >
                            All Tags
                          </button>
                          {allTags.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => setSelectedTag(tag)}
                              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                                selectedTag === tag
                                  ? "bg-foreground text-background"
                                  : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
                              }`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Heading Section */}
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 text-foreground">
          Recent{" "}
          <span className="font-script font-normal text-[1.05em] leading-none align-baseline text-foreground">
            writing
          </span>
          .
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          Thoughts on software engineering, design, and things I find interesting.
        </p>

        {/* Active Filter Pills Bar */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-10 pt-2 pb-2 border-y border-border/40 text-xs">
            <span className="text-muted-foreground font-medium">
              Active filters:
            </span>
            {selectedTag !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-foreground/10 px-2.5 py-1 text-foreground font-medium">
                Tag: {selectedTag}
                <button
                  type="button"
                  onClick={() => setSelectedTag("all")}
                  className="hover:opacity-75 cursor-pointer"
                >
                  <IconX className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedYear !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-foreground/10 px-2.5 py-1 text-foreground font-medium">
                Year: {selectedYear}
                <button
                  type="button"
                  onClick={() => setSelectedYear("all")}
                  className="hover:opacity-75 cursor-pointer"
                >
                  <IconX className="h-3 w-3" />
                </button>
              </span>
            )}
            {sortOrder !== "newest" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-foreground/10 px-2.5 py-1 text-foreground font-medium">
                Sort: Oldest first
                <button
                  type="button"
                  onClick={() => setSortOrder("newest")}
                  className="hover:opacity-75 cursor-pointer"
                >
                  <IconX className="h-3 w-3" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground transition-colors ml-auto underline cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}
      </FadeIn>

      {/* Blog List Items */}
      {filteredPosts.length === 0 ? (
        <FadeIn delay={0.01}>
          <div className="rounded-2xl border border-dashed border-border p-8 text-center my-8">
            <p className="text-muted-foreground mb-4">
              No posts matching the selected filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 rounded-xl bg-foreground px-4 py-2 text-xs font-semibold text-background transition-opacity hover:opacity-90 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </FadeIn>
      ) : (
        <ul className="flex flex-col divide-y divide-border/60">
          {filteredPosts.map((post, idx) => (
            <FadeIn
              key={post.id}
              delay={0.01 + idx * 0.04}
              className="pt-8 pb-8 first:pt-0"
            >
              <li>
                <TransitionLink
                  href={`/blog/${post.id}`}
                  className="group flex items-start gap-4 sm:gap-6"
                >
                  {post.image && (
                    <div
                      className="relative aspect-video w-28 sm:w-44 shrink-0 overflow-hidden rounded-md border border-border/60 bg-foreground/5"
                      style={{ viewTransitionName: `post-image-${post.id}` }}
                    >
                      <Image
                        src={post.image}
                        alt={post.imageAlt ?? post.title}
                        fill
                        sizes="(max-width: 640px) 112px, 176px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        priority={idx < 3}
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-3 sm:gap-6 mb-2">
                      <h2
                        className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground transition-colors"
                        style={{ viewTransitionName: `post-title-${post.id}` }}
                      >
                        <span className="pb-1 bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                          {post.title}
                        </span>
                        <IconArrowUpRight className="inline-block ml-1 h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                      </h2>
                      <time className="shrink-0 text-xs text-muted-foreground tabular-nums mt-1">
                        {post.date}
                      </time>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-3 text-sm sm:text-base line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                      <span>{post.readTime}</span>
                      {post.tags && post.tags.length > 0 && (
                        <>
                          <span aria-hidden>·</span>
                          <span className="lowercase">
                            {post.tags.join(", ")}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </TransitionLink>
              </li>
            </FadeIn>
          ))}
        </ul>
      )}
    </div>
  );
}
