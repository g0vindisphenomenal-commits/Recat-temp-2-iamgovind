"use client";

import { RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

type Chip = {
  label: string;
  slug: string;
  bg: string;
  fg: string;
  iconUrl?: string;
};

const CHIPS: Chip[] = [
  { label: "React", slug: "react", bg: "#1FB6CB", fg: "#ffffff" },
  { label: "Next.js", slug: "nextdotjs", bg: "#1f1f1f", fg: "#ffffff" },
  { label: "Spotify", slug: "spotify", bg: "#1DB954", fg: "#ffffff" },
  { label: "TypeScript", slug: "typescript", bg: "#2F74C0", fg: "#ffffff" },
  { label: "Cursor", slug: "cursor", bg: "#111111", fg: "#ffffff" },
  { label: "GitHub", slug: "github", bg: "#181717", fg: "#ffffff" },
  { label: "Vercel", slug: "vercel", bg: "#0a0a0a", fg: "#ffffff" },
  { label: "Google Ads", slug: "googleads", bg: "#4285F4", fg: "#ffffff" },
  { label: "WordPress", slug: "wordpress", bg: "#21759B", fg: "#ffffff" },
  { label: "Tailwind CSS", slug: "tailwindcss", bg: "#2BBCF5", fg: "#ffffff" },
  { label: "WooCommerce", slug: "woocommerce", bg: "#96588A", fg: "#ffffff" },
  { label: "Python", slug: "python", bg: "#3776AB", fg: "#ffffff" },
  { label: "Meta", slug: "meta", bg: "#0668E1", fg: "#ffffff" },
  { label: "Shopify", slug: "shopify", bg: "#96BF48", fg: "#ffffff" },
  { label: "Business Profile", slug: "googlemaps", bg: "#4285F4", fg: "#ffffff" },
  { label: "LinkedIn", slug: "linkedin", bg: "#0A66C2", fg: "#ffffff", iconUrl: "/linkedin.svg" },
  { label: "Angular", slug: "angular", bg: "#DD0031", fg: "#ffffff" },
];

const DEV_SLUGS = [
  "react", "nextdotjs", "shopify", "typescript", 
  "cursor", "github", "vercel", "wordpress", "tailwindcss", 
  "woocommerce", "python", "angular"
];


const ADS_SLUGS = [
  "meta", "googleads", "spotify", "linkedin", "googlemaps"
];

const CHIP_RADIUS = 14;
const ICON_RADIUS = 10;
const WALL_PAD = 16;
const CHIP_GAP = 24; // Gap between chips in the marquee line

type ChipState = {
  chip: Chip;
  body: Matter.Body;
  width: number;
  height: number;
  baseX: number; // Base position in the marquee chain
};

// Calculate chip width programmatically to guarantee perfect spacing and prevent sticking
const calculateChipWidth = (label: string): number => {
  // 4px left padding + 32px icon circle + 8px gap + 12px right padding = 56px base
  // Plus character width estimate: ~8.8px per letter
  const baseWidth = 56;
  const charWidth = 8.8;
  return Math.ceil(baseWidth + label.length * charWidth);
};

export function MarqueeStack(): ReactNode {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [filterMode, setFilterMode] = useState<"all" | "dev" | "ads">("all");
  const isHoveredRef = useRef(false);

  // Filter CHIPS array based on active mode
  const filteredChips = CHIPS.filter((chip) => {
    if (filterMode === "all") return true;
    if (filterMode === "dev") return DEV_SLUGS.includes(chip.slug);
    if (filterMode === "ads") return ADS_SLUGS.includes(chip.slug);
    return true;
  });

  // Duplicate the list of chips if they don't cover a safe scrolling threshold (e.g. 2500px)
  // to ensure they fill the marquee width without wrapping jumps or gaps.
  const getExtendedChips = (): Chip[] => {
    let list = [...filteredChips];
    if (list.length === 0) return list;
    
    let totalEst = 0;
    list.forEach((chip) => {
      totalEst += calculateChipWidth(chip.label) + CHIP_GAP;
    });

    const minWidth = 2500;
    const baseList = [...list];
    while (totalEst < minWidth) {
      list = [...list, ...baseList];
      totalEst = 0;
      list.forEach((chip) => {
        totalEst += calculateChipWidth(chip.label) + CHIP_GAP;
      });
    }
    return list;
  };

  const extendedChips = getExtendedChips();

  const getHeaderTitle = (): string => {
    if (filterMode === "all") return "Development and Ads";
    if (filterMode === "dev") return "Development";
    return "Ads and Marketing";
  };

  const handleToggleMode = (): void => {
    setFilterMode((current) => {
      if (current === "all") return "dev";
      if (current === "dev") return "ads";
      return "all";
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const Matter = await import("matter-js");
      if (cancelled) return;

      const {
        Engine,
        World,
        Bodies,
        Body,
        Mouse,
        MouseConstraint,
        Events,
      } = Matter;

      // Programmatically compute widths for deterministic layout mapping
      const dims = extendedChips.map((chip) => {
        const w = calculateChipWidth(chip.label);
        return { w, h: 36 };
      });

      let width = container.clientWidth;
      let height = container.clientHeight;

      const engine = Engine.create();
      engine.gravity.y = 0; // Starts floating/scrolling
      const world = engine.world;

      const wallThickness = 400;
      const floor = Bodies.rectangle(
        width / 2,
        height - WALL_PAD + wallThickness / 2,
        width * 3,
        wallThickness,
        { isStatic: true }
      );
      
      const leftWall = Bodies.rectangle(
        -9999,
        height / 2,
        wallThickness,
        height * 4,
        { isStatic: true }
      );
      const rightWall = Bodies.rectangle(
        9999,
        height / 2,
        wallThickness,
        height * 4,
        { isStatic: true }
      );

      World.add(world, [floor, leftWall, rightWall]);

      // Distribute filtered chips along a single line based on their programmatically calculated widths
      let currentX = 0;
      const chipStates: ChipState[] = extendedChips.map((chip, index) => {
        const d = dims[index] || { w: 120, h: 36 };
        const w = d.w + 12;
        const h = d.h + 10;
        
        const x = currentX + w / 2;
        const y = height / 2;

        const body = Bodies.rectangle(x, y, w, h, {
          chamfer: { radius: CHIP_RADIUS },
          restitution: 0.25,
          friction: 0.15,
          frictionAir: 0.015,
        });

        const state = { chip, body, width: w, height: h, baseX: currentX };
        currentX += w + CHIP_GAP;
        return state;
      });

      const totalChainWidth = currentX;

      World.add(
        world,
        chipStates.map((s) => s.body)
      );

      const mouse = Mouse.create(container);
      
      const wheelTarget = mouse.element as HTMLElement & {
        mousewheel?: EventListener;
      };
      if (wheelTarget.mousewheel) {
        wheelTarget.removeEventListener("wheel", wheelTarget.mousewheel);
        wheelTarget.removeEventListener(
          "DOMMouseScroll",
          wheelTarget.mousewheel
        );
      }

      const mc = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false },
        },
      });

      World.add(world, mc);

      Events.on(mc, "startdrag", () => {
        container.style.cursor = "grabbing";
      });
      Events.on(mc, "enddrag", () => {
        container.style.cursor = "grab";
      });

      let scrollOffset = 0;
      let animId: number;

      const update = (): void => {
        if (cancelled) return;

        Engine.update(engine, 1000 / 60);

        const isHovered = isHoveredRef.current;
        engine.gravity.y = isHovered ? 1.2 : 0;

        if (isHovered) {
          Body.setPosition(leftWall, { x: WALL_PAD - wallThickness / 2, y: height / 2 });
          Body.setPosition(rightWall, { x: width - WALL_PAD + wallThickness / 2, y: height / 2 });
        } else {
          Body.setPosition(leftWall, { x: -9999, y: height / 2 });
          Body.setPosition(rightWall, { x: 9999, y: height / 2 });
        }

        // Only scroll the offset when not hovered
        if (!isHovered) {
          scrollOffset = (scrollOffset + 1.2) % totalChainWidth;
        }

        chipStates.forEach((state) => {
          const body = state.body;

          // Disable/enable collisions dynamically to prevent chips from hitting each other or grouping up when scrolling
          body.collisionFilter.mask = isHovered ? 0xFFFFFFFF : 0;

          if (!isHovered) {
            // Compute target coordinate in the single line marquee
            let targetX = (state.baseX - scrollOffset) % totalChainWidth;
            if (targetX < -state.width) {
              targetX += totalChainWidth;
            }
            const targetY = height / 2;

            // Interpolate position
            const dx = targetX - body.position.x;
            const dy = targetY - body.position.y;

            // Warp directly if wrapping to prevent extreme kinetic velocity impulses
            if (Math.abs(dx) > width / 2) {
              Body.setPosition(body, { x: targetX, y: targetY });
              Body.setVelocity(body, { x: -1.2, y: 0 });
            } else {
              Body.setVelocity(body, {
                x: dx * 0.1,
                y: dy * 0.1,
              });
            }

            // Return rotation to upright position
            Body.setAngle(body, body.angle * 0.85);
            Body.setAngularVelocity(body, body.angularVelocity * 0.85);
          } else {
            // When hovered, ensure they don't break out of borders due to high speed drag
            if (body.position.x < -state.width) {
              Body.setPosition(body, { x: state.width / 2 + 10, y: 50 });
            } else if (body.position.x > width + state.width) {
              Body.setPosition(body, { x: width - state.width / 2 - 10, y: 50 });
            }
          }
        });

        // Update HTML elements' transforms
        chipStates.forEach((state, i) => {
          const el = chipRefs.current[i];
          if (!el) return;
          const pos = state.body.position;
          const angle = state.body.angle;
          el.style.transform = `translate3d(${pos.x - state.width / 2}px, ${
            pos.y - state.height / 2
          }px, 0) rotate(${angle}rad)`;
        });

        animId = requestAnimationFrame(update);
      };

      animId = requestAnimationFrame(update);

      const ro = new ResizeObserver((entries) => {
        if (!entries[0]) return;
        const w = entries[0].contentRect.width;
        const h = entries[0].contentRect.height;
        width = w;
        height = h;

        Body.setPosition(floor, {
          x: w / 2,
          y: h - WALL_PAD + wallThickness / 2,
        });
      });

      ro.observe(container);

      cleanup = () => {
        cancelAnimationFrame(animId);
        ro.disconnect();
        World.clear(world, false);
        Engine.clear(engine);
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [filterMode]); // Runs engine setup when filter mode changes

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <h3 className="text-foreground text-[15px] font-semibold tracking-tight transition-all duration-300">
          {getHeaderTitle()}
        </h3>
      </div>

      <div
        className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative h-24 overflow-hidden rounded-3xl border sm:h-28 cursor-grab select-none"
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
        onTouchStart={() => {
          isHoveredRef.current = true;
        }}
        onTouchEnd={() => {
          isHoveredRef.current = false;
        }}
      >
        <button
          type="button"
          onClick={handleToggleMode}
          aria-label="Filter marquee mode"
          className="focus-ring border-foreground/8 bg-background text-foreground/70 hover:text-foreground absolute top-2 right-2 z-20 inline-flex h-7 w-7 items-center justify-center rounded-lg border transition-colors"
        >
          <RotateCcw
            className="h-3.5 w-3.5"
            strokeWidth={2.25}
            aria-hidden="true"
          />
        </button>

        {/* Gradient overlays for fading edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent" />

        <div
          ref={containerRef}
          className="absolute inset-0"
          style={{ touchAction: "none" }}
        >
          {extendedChips.map((chip, i) => (
            <div
              key={`${filterMode}-${chip.label}-${i}`}
              ref={(el) => {
                chipRefs.current[i] = el;
              }}
              data-stack-chip
              className="absolute top-0 left-0 will-change-transform pointer-events-none"
              style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
            >
              <ChipPill chip={chip} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChipPill({ chip }: { chip: Chip }): ReactNode {
  return (
    <div
      className="dark:ring-1 dark:ring-white/15 inline-flex items-center gap-2 p-1 pr-3 text-[15px] font-medium tracking-tight sm:text-[16px] shrink-0"
      style={{
        backgroundColor: chip.bg,
        color: chip.fg,
        borderRadius: `${CHIP_RADIUS}px`,
      }}
    >
      <span
        className="inline-flex h-8 w-8 items-center justify-center bg-white/95"
        style={{ borderRadius: `${ICON_RADIUS}px` }}
        aria-hidden="true"
      >
        <img
          src={chip.iconUrl ?? `https://cdn.simpleicons.org/${chip.slug}`}
          alt=""
          width={18}
          height={18}
          className="h-5 w-5"
          draggable={false}
        />
      </span>
      <span>{chip.label}</span>
    </div>
  );
}
