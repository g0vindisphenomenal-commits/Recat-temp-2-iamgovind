import Link from "next/link";
import type { ReactNode } from "react";

export default function NotFound(): ReactNode {
  return (
    <main
      id="main-content"
      className="flex flex-1 flex-col items-center justify-center min-h-[60vh] px-6 text-center"
    >
      <div className="border border-foreground/8 bg-foreground/1.5 dark:bg-foreground/3 max-w-md w-full rounded-4xl p-8 sm:p-10 flex flex-col items-center gap-4">
        <span className="text-4xl sm:text-5xl font-black text-foreground/20 tracking-widest select-none">
          404
        </span>
        <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          Page Not Found
        </h1>
        <p className="text-foreground/65 text-[15px] leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center justify-center rounded-2xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-ring"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
