"use client";

import { AnimatePresence, motion } from "motion/react";
import { Mail, MessageCircle, Phone, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

const PHONE_NUMBER = "9995513314";
const WHATSAPP_URL = `https://wa.me/91${PHONE_NUMBER}`;
const CALL_URL = `tel:${PHONE_NUMBER}`;

export function ContactButton(): ReactNode {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setModalOpen(true)}
        aria-label="Contact me options"
        style={{ borderRadius: 14 }}
        className="focus-ring relative inline-flex h-11 cursor-pointer items-center justify-center bg-foreground px-5 text-sm font-semibold text-background shadow-md transition-all hover:opacity-95"
      >
        <span className="inline-flex items-center gap-2 whitespace-nowrap">
          <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Contact</span>
        </span>
      </motion.button>

      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative z-10 w-full max-w-sm overflow-hidden rounded-3xl border border-foreground/10 bg-background p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-foreground/8">
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-foreground">
                    Get in touch
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Choose how you&apos;d like to connect
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-full p-2 text-foreground/50 hover:bg-foreground/5 hover:text-foreground transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-5 flex flex-col gap-3">
                {/* WhatsApp Option */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setModalOpen(false)}
                  className="group relative flex items-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 transition-all duration-300 hover:bg-emerald-500/10 hover:border-emerald-500/40 hover:shadow-md"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-sm font-semibold text-foreground flex items-center gap-1">
                      WhatsApp Chat
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      +91 {PHONE_NUMBER}
                    </span>
                  </div>
                </a>

                {/* Call Dialer Option */}
                <a
                  href={CALL_URL}
                  onClick={() => setModalOpen(false)}
                  className="group relative flex items-center gap-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-3.5 transition-all duration-300 hover:bg-blue-500/10 hover:border-blue-500/40 hover:shadow-md"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-sm font-semibold text-foreground flex items-center gap-1">
                      Direct Phone Call
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      Open Dialer ({PHONE_NUMBER})
                    </span>
                  </div>
                </a>
              </div>

              <div className="mt-5 text-center">
                <span className="text-[11px] text-muted-foreground/70">
                  Govind Digital Marketing & Web Engineering
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
