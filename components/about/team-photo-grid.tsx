"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const TEAM_PHOTOS = [
  {
    src: "/team-photo-1.jpg",
    title: "Think Hub Academy",
    subtitle: "Digital Marketing & Developer Team",
  },
  {
    src: "/team-photo-3.jpg",
    title: "Collaborative Projects",
    subtitle: "Growth & Engineering Partners",
  },
  {
    src: "/team-photo-2.jpg",
    title: "Team Outings",
    subtitle: "Creative Collaborators in Trivandrum",
  },
];

export function TeamPhotoGrid(): ReactNode {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
      {TEAM_PHOTOS.map((photo) => (
        <motion.div
          key={photo.src}
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="group relative aspect-[16/9] sm:aspect-[16/10] overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-sm"
        >
          <img
            src={photo.src}
            alt={photo.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-3 text-white">
            <span className="text-xs font-semibold tracking-tight">
              {photo.title}
            </span>
            <span className="text-[10px] text-white/70 truncate">
              {photo.subtitle}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
