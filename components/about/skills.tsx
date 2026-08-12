"use client";

import type { ReactNode } from "react";
import { Marquee } from "@/components/ui/marquee";
import {
  IconCode,
  IconTestPipe,
  IconDatabase,
  IconLayoutKanban,
  IconChartBar,
  IconSparkles,
  IconBrain,
  IconAtom,
} from "@tabler/icons-react";

type SkillItem = {
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
};

const SKILLS: SkillItem[] = [
  { name: "Software Engineering", category: "Engineering", icon: IconCode },
  { name: "Software Testing", category: "QA & Testing", icon: IconTestPipe },
  { name: "Database Management", category: "Data", icon: IconDatabase },
  { name: "Project Management", category: "Management", icon: IconLayoutKanban },
  { name: "Data Analytics", category: "Analytics", icon: IconChartBar },
  { name: "AI Integration", category: "AI & ML", icon: IconSparkles },
  { name: "Machine Learning", category: "AI & ML", icon: IconBrain },
  { name: "Deep Learning", category: "AI & ML", icon: IconAtom },
];

interface SkillsProps {
  paused?: boolean;
}

export function Skills({ paused = false }: SkillsProps): ReactNode {
  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-3xl border border-foreground/8 bg-background p-3.5 sm:p-4 shadow-sm">
        {/* Left & Right Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent" />

        {/* Single Line Marquee Scroll */}
        <Marquee pauseOnHover pauseDurationOnHoverMs={5000} paused={paused} repeat={4} className="[--duration:30s] [--gap:0.75rem]">
          <div className="flex items-center gap-3">
            {SKILLS.map((skill) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.name}
                  className="group relative flex shrink-0 items-center gap-3 rounded-2xl border border-foreground/8 bg-background/80 p-3 min-w-[210px] shadow-2xs backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-foreground/6 text-foreground/75 transition-all duration-200 group-hover:scale-105 group-hover:bg-foreground/12 group-hover:text-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13.5px] font-medium tracking-tight text-foreground/90 group-hover:text-foreground truncate">
                      {skill.name}
                    </span>
                    <span className="text-[11px] font-normal tracking-tight text-foreground/45">
                      {skill.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Marquee>
      </div>
    </div>
  );
}
