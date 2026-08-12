"use client";
import React, { useState, useEffect } from "react";
import { IconCode, IconDotsVertical } from "@tabler/icons-react";
import styles from "./dashboard.module.css";
import { Marquee } from "@/components/ui/marquee";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { dashboardData } from "./dashboard-data";
import { useTheme } from "next-themes";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";
import { CustomCursor } from "@/components/ui/custom-cursor";

export default function Dashboard() {
  const [isActive, setIsActive] = useState(true);
  const dashboardIconClass = "h-3.5 w-3.5 text-foreground";

  return (
    <div className="flex flex-col w-full">
      <CustomCursor />
      <ul
        className={`grid w-full gap-2 sm:gap-2.5 ${styles.dashboardGrid}`}>
        <GridItem
          area="tools"
          icon={<IconCode className={dashboardIconClass} />}
          title="Development"
          transitionDuration="100ms"
        >
          <ToolsMarquee paused={!isActive} />
        </GridItem>
        <GridItem
          area="engagement"
          transitionDuration="150ms"
        >
          <EngagementTile isActive={isActive} setIsActive={setIsActive} />
        </GridItem>
      </ul>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
  transitionDuration?: string;
  tooltip?: string;
  cursorEmoji?: string;
}

const GridItem = ({ area, icon, title, children, transitionDuration = "300ms", tooltip, cursorEmoji }: GridItemProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleTap = () => {
    if (!tooltip) return;

    setShowTooltip(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const content = (
    <li
      data-cursor-emoji={cursorEmoji}
      className="min-h-[2rem] w-full list-none transition-all"
      style={{
        gridArea: area,
        transitionDuration,
        ...(cursorEmoji ? { cursor: "none" } : {}),
      }}
    >
      <div
        className="group relative flex h-full flex-col justify-between gap-3 overflow-hidden rounded-3xl border border-foreground/8 bg-background p-4 sm:p-5 shadow-sm transition-colors"
        style={{
          transitionDuration,
        }}
      >
        <SpotlightGlow />
        {(icon || title) && (
          <div className="relative flex flex-row items-center gap-2.5 sm:gap-3">
            {icon && (
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-foreground/10 bg-background">
                {icon}
              </span>
            )}
            {title && (
              <h3 className="text-sm font-medium tracking-tight text-foreground">
                {title}
              </h3>
            )}
          </div>
        )}
        <div>{children}</div>
      </div>
    </li>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip open={showTooltip} delayDuration={0}>
          <TooltipTrigger
            asChild
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={handleTap}
          >
            {content}
          </TooltipTrigger>
          <TooltipContent
            sideOffset={-16}
            side="top"
            align="center"
            collisionPadding={0}
            className="pointer-events-none whitespace-nowrap"
          >
            <p className="flex items-center gap-1.5">
              {tooltip}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
};

const Tool = ({ name, icon }: { name: string; icon: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            onTouchStart={() => setOpen(true)}
            className="flex items-center focus:outline-none cursor-pointer p-1 rounded-lg hover:bg-foreground/5 transition-colors"
          >
            <Image
              src={`${icon}`}
              alt={`${name} icon`}
              width={30}
              height={30}
              className="h-8 w-8"
              loading="eager"
            />
          </button>
        </TooltipTrigger>
        <TooltipContent sideOffset={5}>
          <p className="text-sm font-semibold text-muted-foreground">{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ToolsMarquee = ({ paused = false }: { paused?: boolean }) => {
  const { theme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const currentTheme = theme || resolvedTheme || "dark";

  const processedToolsData = dashboardData.tools.map(({ name, icon, themeDependent }) => ({
    name,
    icon: `/tools/${icon}${themeDependent && currentTheme === "dark" ? "-dark" : ""}.svg`,
  }));
  return (
    <div className="relative overflow-hidden">
      <div className="fade-mask-left transition-all duration-400" />
      <div className="fade-mask-right transition-all duration-400" />
      <Marquee pauseOnHover paused={paused} repeat={4} className="[--duration:25s] [--gap:1.5rem]">
        <div className="flex items-center gap-6">
          {processedToolsData.map(({ name, icon }) => (
            <Tool key={name} name={name} icon={icon} />
          ))}
        </div>
      </Marquee>
    </div>
  );
};

const EngagementTile = ({
  isActive,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

  return (
    <div className="flex flex-col gap-2.5 sm:gap-3 p-0.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 shrink-0">
            <Image
              src="/govind.jpg"
              alt="Advertising avatar"
              width={44}
              height={44}
              className="h-11 w-11 rounded-xl object-cover border border-foreground/10"
            />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center">
              {isActive ? (
                <>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </>
              ) : (
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-slate-400 dark:bg-zinc-500" />
              )}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight text-foreground">
              Advertising
            </span>
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              {isActive ? "Active Engagement" : "Off Engagement"}
            </span>
          </div>
        </div>

        <button
          type="button"
          aria-label="Toggle active status"
          onClick={() => setIsActive((prev) => !prev)}
          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
        >
          <IconDotsVertical className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-1">
        <div className="flex flex-col gap-1 pr-2 sm:pr-4">
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            3.5K+
          </span>
          <span className="text-xs text-muted-foreground tracking-tight">
            Leads Generated
          </span>
        </div>

        <div className="flex flex-col gap-1 border-l border-foreground/10 pl-3 sm:pl-5 pr-2 sm:pr-4">
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            2.11
          </span>
          <span className="text-xs text-muted-foreground tracking-tight">
            Years of Expertise
          </span>
        </div>

        <div className="flex flex-col gap-1 border-l border-foreground/10 pl-3 sm:pl-5">
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            324+
          </span>
          <span className="text-xs text-muted-foreground tracking-tight">
            Campaigns
          </span>
        </div>
      </div>
    </div>
  );
};
