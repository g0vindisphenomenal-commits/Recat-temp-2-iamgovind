"use client";

import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  pauseDurationOnHoverMs?: number;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  paused?: boolean;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  pauseDurationOnHoverMs = 5000,
  children,
  vertical = false,
  repeat = 4,
  paused = false,
  onMouseEnter,
  onMouseLeave,
  ...props
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseEnterContainer = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseEnter?.(e);
    if (pauseOnHover) {
      setIsHoverPaused(true);
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
      hoverTimerRef.current = setTimeout(() => {
        setIsHoverPaused(false);
      }, pauseDurationOnHoverMs);
    }
  };

  const handleMouseLeaveContainer = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(e);
    handleMouseLeaveOrUp();
  };

  const isCurrentlyPaused = paused || isDragging || (pauseOnHover && isHoverPaused);

  return (
    <div
      {...props}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseLeaveOrUp}
      onMouseEnter={handleMouseEnterContainer}
      onMouseLeave={handleMouseLeaveContainer}
      onMouseMove={handleMouseMove}
      className={cn(
        "group flex overflow-x-auto overflow-y-hidden touch-pan-x select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            style={isCurrentlyPaused ? { animationPlayState: "paused" } : undefined}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "[animation-play-state:paused]": isCurrentlyPaused,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
