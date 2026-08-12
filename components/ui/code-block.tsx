"use client";

import { Check, Copy } from "lucide-react";
import { useState, type ReactNode } from "react";

type CodeBlockProps = {
  code: string;
  language?: string | undefined;
};

export function CodeBlock({ code }: CodeBlockProps): ReactNode {
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
    <div className="group relative my-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d18] text-[#e2e8f0] p-5 sm:p-6 shadow-xl">
      {/* Floating Top-Right Copy Button */}
      <button
        onClick={handleCopy}
        type="button"
        aria-label="Copy code snippet"
        className="absolute top-4 right-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 hover:bg-white/10 hover:text-white cursor-pointer"
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-400" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>

      {/* Code Content */}
      <div className="overflow-x-auto pr-10">
        <pre className="font-mono text-[14px] leading-[1.65] tracking-tight whitespace-pre">
          <code dangerouslySetInnerHTML={{ __html: renderHighlightedCode(code) }} />
        </pre>
      </div>
    </div>
  );
}

function renderHighlightedCode(code: string): string {
  if (!code) return "";

  return code
    .split("\n")
    .map((line) => {
      let escaped = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Handle comments
      if (escaped.trim().startsWith("//") || escaped.trim().startsWith("/*")) {
        return `<span class="text-zinc-500 italic">${escaped}</span>`;
      }

      // Strings
      escaped = escaped.replace(/(["'`])(.*?)\1/g, '<span class="text-emerald-400">$1$2$1</span>');

      // Arrow functions =>
      escaped = escaped.replace(/=&gt;/g, '<span class="text-pink-400 font-semibold">=&gt;</span>');

      // Method / Function calls (.methodName( or funcName()
      escaped = escaped.replace(/(\.|\b)([a-zA-Z0-9_$]+)(\s*\()/g, (_match, prefix, name, paren) => {
        if (prefix === ".") {
          return `.<span class="text-purple-400 font-medium">${name}</span>${paren}`;
        }
        if (["if", "for", "while", "switch", "catch"].includes(name)) {
          return `<span class="text-sky-400">${name}</span>${paren}`;
        }
        return `<span class="text-purple-400 font-medium">${name}</span>${paren}`;
      });

      // Keywords
      const keywords = ["document", "window", "const", "let", "var", "function", "return", "import", "export", "from", "async", "await", "type", "interface", "class", "default", "try", "catch"];
      keywords.forEach((kw) => {
        const regex = new RegExp(`\\b${kw}\\b`, "g");
        escaped = escaped.replace(regex, `<span class="text-sky-400">${kw}</span>`);
      });

      return escaped;
    })
    .join("\n");
}
