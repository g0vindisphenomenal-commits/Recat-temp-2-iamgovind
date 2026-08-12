"use client";

import { useState, type ReactNode } from "react";
import Dashboard from "@/components/dashboard/dashboard";
import { Skills } from "@/components/about/skills";

export function HomeDashboardSection(): ReactNode {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="flex flex-col gap-8">
      <Dashboard isActive={isActive} setIsActive={setIsActive} />
      <Skills paused={!isActive} />
    </div>
  );
}
