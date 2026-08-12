"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useSyncExternalStore, type ReactNode } from "react";

type Polaroid = {
  id: string;
  rotate: number;
  src: string;
  caption: string;
  aspectClass: string;
};

const PHOTOS: Polaroid[] = [
  {
    id: "a",
    rotate: -6,
    src: "/team-photo-1.jpg",
    caption: "Think Hub Academy Team",
    aspectClass: "aspect-[16/10] w-[clamp(8.5rem,15vw,13rem)]",
  },
  {
    id: "b",
    rotate: 5,
    src: "/team-photo-2.jpg",
    caption: "Team Outing & Collaborators",
    aspectClass: "aspect-[16/10] w-[clamp(8.5rem,15vw,13rem)]",
  },
  {
    id: "c",
    rotate: -3,
    src: "/team-photo-3.jpg",
    caption: "Govind & Growth Team",
    aspectClass: "aspect-[16/10] w-[clamp(8.5rem,15vw,13rem)]",
  },
  {
    id: "d",
    rotate: 6,
    src: "/govind.jpg",
    caption: "Govind Portrait",
    aspectClass: "aspect-[3/4] w-[clamp(6.5rem,11vw,9.5rem)]",
  },
  {
    id: "e",
    rotate: -5,
    src: "/cybertruckfilms-actual.png",
    caption: "CyberTruck Films",
    aspectClass: "aspect-[16/10] w-[clamp(8rem,14vw,12rem)]",
  },
  {
    id: "f",
    rotate: 4,
    src: "/marhabahospitality.png",
    caption: "Marhaba Hospitality",
    aspectClass: "aspect-[16/10] w-[clamp(8rem,14vw,12rem)]",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

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
      className={`group relative ${photo.aspectClass} shrink-0 overflow-hidden rounded-2xl bg-white p-2 border border-black/10 shadow-lg transition-all duration-300 hover:z-20 hover:scale-105 hover:shadow-2xl dark:bg-neutral-900 dark:border-white/10`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
        <img
          src={photo.src}
          alt={photo.caption}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          draggable={false}
        />
      </div>
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
    <div className="flex flex-wrap w-full items-center justify-center gap-2.5 px-4 sm:gap-3 sm:px-8">
      {PHOTOS.map((photo, i) => (
        <PolaroidCard key={photo.id} photo={photo} index={i} />
      ))}
    </div>
  );
}
