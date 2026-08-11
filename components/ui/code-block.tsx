"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

type CodeBlockProps = {
  code: string;
  language?: string | undefined;
};


export function CodeBlock({ code, language = "text" }: CodeBlockProps): ReactNode {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <div className="relative my-6 overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/90 text-background dark:bg-foreground/10 dark:text-foreground">
      {/* Top Header Bar with Language badge and Copy Button */}
      <div className="flex items-center justify-between border-b border-background/10 bg-background/5 px-4 py-2 text-xs font-mono dark:border-foreground/10">
        <span className="font-semibold uppercase tracking-wider text-background/70 dark:text-foreground/70">
          {language}
        </span>
        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy code snippet"
          className="inline-flex items-center gap-1.5 rounded-lg bg-background/10 px-2.5 py-1 text-xs font-medium text-background transition-colors hover:bg-background/20 dark:bg-foreground/10 dark:text-foreground dark:hover:bg-foreground/20 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400 dark:text-emerald-400" />
              <span className="text-emerald-400 dark:text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 opacity-80" />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Text Content */}
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
