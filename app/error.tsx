"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime application error caught:", error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="flex flex-1 flex-col items-center justify-center min-h-[60vh] px-6 text-center"
    >
      <div className="border border-foreground/8 bg-foreground/1.5 dark:bg-foreground/3 max-w-md w-full rounded-4xl p-8 sm:p-10 flex flex-col items-center gap-4">
        <span className="text-4xl sm:text-5xl font-black text-red-500/20 tracking-widest select-none">
          500
        </span>
        <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          Something went wrong
        </h1>
        <p className="text-foreground/65 text-[15px] leading-relaxed">
          An unexpected error occurred. Please try again or return home.
        </p>
        <div className="flex items-center gap-3 mt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-2xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-ring cursor-pointer"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl border border-foreground/15 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5 focus-ring"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
