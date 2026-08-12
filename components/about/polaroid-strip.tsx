"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useSyncExternalStore, useState, type ReactNode } from "react";

import { DottedPattern } from "@/components/ui/dotted-pattern";
import { ScratchToReveal } from "@/components/magicui/scratch-to-reveal";
import { dashboardData } from "@/components/dashboard/dashboard-data";

type Polaroid = {
  id: string;
  rotate: number;
  image?: string;
  video?: string;
  scratch?: boolean;
  location?: boolean;
};

const PHOTOS: Polaroid[] = [
  { id: "a", rotate: -8, image: "/polaroid-govind.jpg" },
  { id: "b", rotate: 6, image: "/polaroid-pixel.jpg" },
  { id: "c", rotate: -4, image: "/polaroid-dark.jpg" },
  { id: "d", rotate: 7, video: "/polaroid-video.3gp" },
  { id: "e", rotate: -6, scratch: true },
  { id: "f", rotate: 5, location: true },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return "📍";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function LocationPolaroidCard(): ReactNode {
  const [locationInfo, setLocationInfo] = useState<{
    city: string;
    country: string;
    code: string;
  } | null>(null);

  useEffect(() => {
    fetch("https://ip-api.com/json/?fields=city,country,countryCode,status")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && data.city && data.country) {
          setLocationInfo({
            city: data.city,
            country: data.country,
            code: data.countryCode || "IN",
          });
        } else {
          setLocationInfo({ city: "Trivandrum", country: "India", code: "IN" });
        }
      })
      .catch(() => {
        setLocationInfo({ city: "Trivandrum", country: "India", code: "IN" });
      });
  }, []);

  const flag = locationInfo ? getFlagEmoji(locationInfo.code) : "📍";

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-neutral-950 p-2 text-white flex flex-col justify-between items-center text-center border border-white/10 select-none">
      {/* Background Map Mesh Pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* Top Header Badge */}
      <div className="relative z-10 flex items-center gap-1.5 pt-1">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase text-emerald-400">
          Your Location
        </span>
      </div>

      {/* Center Location Content */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-1">
        <span className="text-2xl sm:text-3xl mb-0.5 drop-shadow-sm">{flag}</span>
        <h4 className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
          {locationInfo ? locationInfo.city : "Detecting..."}
        </h4>
        <p className="text-[10px] font-medium text-neutral-400 tracking-tight line-clamp-1">
          {locationInfo ? locationInfo.country : "Location"}
        </p>
      </div>

      {/* Bottom Subtext */}
      <div className="relative z-10 w-full pt-1 border-t border-white/10">
        <span className="text-[9px] font-medium text-neutral-400 tracking-tight block">
          Welcome! 👋
        </span>
      </div>
    </div>
  );
}

function ScratchPolaroidCard(): ReactNode {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 140, height: 180 });
  const [randomGif, setRandomGif] = useState<string>("");

  useEffect(() => {
    const gifs = dashboardData.scratchGifs;
    if (gifs && gifs.length > 0) {
      const selected = gifs[Math.floor(Math.random() * gifs.length)];
      if (selected) {
        setRandomGif(selected);
      }
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth || 140,
          height: containerRef.current.clientHeight || 180,
        });
      }
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden rounded-xl bg-neutral-950 flex items-center justify-center"
    >
      {randomGif ? (
        <ScratchToReveal
          width={dimensions.width}
          height={dimensions.height}
          minScratchPercentage={40}
          className="relative h-full w-full flex items-center justify-center overflow-hidden rounded-xl"
          gradientColors={["#A97CF8", "#F38CB8", "#FDCC92"]}
        >
          <div className="relative h-full w-full flex items-center justify-center p-2 bg-neutral-900">
            <img
              src={randomGif}
              alt="Scratch reveal sticker"
              className="h-full w-full object-contain pointer-events-none"
            />
          </div>
        </ScratchToReveal>
      ) : null}
    </div>
  );
}

function PolaroidCard({
  photo,
  index,
}: {
  photo: Polaroid;
  index: number;
}): ReactNode {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 220, damping: 18, mass: 0.6 });
  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const max = 18;
    const k = 0.25;
    mx.set(Math.max(-max, Math.min(max, dx * k)));
    my.set(Math.max(-max, Math.min(max, dy * k)));
  };

  const handleLeave = (): void => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      initial={{ opacity: 0, y: -120, filter: "blur(18px)", rotate: photo.rotate }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotate: photo.rotate }}
      transition={{
        duration: 0.9,
        delay: 0.05 + index * 0.08,
        ease: EASE,
      }}
      style={{
        x: tx,
        y: ty,
        rotate: photo.rotate,
      }}
      className="relative aspect-[3/4] w-[clamp(6rem,11vw,9rem)] shrink-0 overflow-hidden rounded-2xl border-6 border-neutral-300/40 bg-white p-1.5 dark:border-white/15 dark:bg-neutral-900"
    >
      {photo.location ? (
        <LocationPolaroidCard />
      ) : photo.scratch ? (
        <ScratchPolaroidCard />
      ) : photo.video ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="relative h-full w-full overflow-hidden rounded-xl object-cover"
        >
          <source src={photo.video} type="video/3gpp" />
          <source src={photo.video} type="video/mp4" />
        </video>
      ) : photo.image ? (
        <img
          src={photo.image}
          alt="Polaroid photo"
          className="relative h-full w-full overflow-hidden rounded-xl object-cover"
          draggable={false}
        />
      ) : (
        <DottedPattern className="relative h-full w-full overflow-hidden rounded-xl" />
      )}
    </motion.div>
  );
}

export function PolaroidStrip(): ReactNode {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return <div aria-hidden="true" className="h-[clamp(8rem,15vw,12rem)] w-full" />;
  }

  return (
    <div className="flex flex-wrap w-full items-start justify-center gap-1 px-4 sm:gap-1.5 sm:px-8">
      {PHOTOS.map((photo, i) => (
        <PolaroidCard key={photo.id} photo={photo} index={i} />
      ))}
    </div>
  );
}
