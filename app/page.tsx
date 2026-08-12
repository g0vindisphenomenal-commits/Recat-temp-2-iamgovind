import { ContactCard } from "@/components/contact/contact-card";
import { Hero } from "@/components/hero/hero";
import { Projects } from "@/components/projects/projects";
import Dashboard from "@/components/dashboard/dashboard";
import { createMetadata, siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "iamgovind",
  description: siteConfig.description,
  path: "/",
});


export default function HomePage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col gap-12 sm:gap-16">
      <div className="flex flex-col gap-4 sm:gap-6">
        <Hero />
        <section className="mx-auto w-full max-w-275 px-6 sm:px-10">
          <Dashboard />
        </section>
      </div>
      <Projects withHeadline viewMoreVisible />
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}

