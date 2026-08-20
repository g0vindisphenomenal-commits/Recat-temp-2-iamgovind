"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  CheckCircle2,
  ExternalLink,
  Star,
  Hand,
} from "lucide-react";
import { FadeIn } from "@/components/ui/motion-primitives";

export type Review = {
  id: string;
  name: string;
  role?: string;
  avatarUrl?: string;
  rating: number;
  date?: string;
  text: string;
  location?: string;
};

const DEFAULT_REVIEWS: Review[] = [
  {
    id: "1",
    name: "prem nair",
    role: "Business Owner",
    rating: 5,
    date: "1 month ago",
    location: "Trivandrum, Kerala",
    text: "Govind fixed my suspended Google Business Profile and guided me through the entire process...",
  },
  {
    id: "2",
    name: "Gregory House",
    role: "Healthcare Services",
    rating: 5,
    date: "2 months ago",
    location: "Kochi, Kerala",
    text: "Govind did an outstanding job with web designing and meta ads for us. He built a clean, professional website...",
  },
  {
    id: "3",
    name: "Anish Kumar",
    role: "E-Commerce Founder",
    rating: 5,
    date: "3 months ago",
    location: "Calicut, Kerala",
    text: "Incredible SEO and digital marketing results. Our organic website traffic and lead quality grew noticeably within just a few months of working with Govind. Extremely reliable service!",
  },
  {
    id: "4",
    name: "Dr. Sarah Thomas",
    role: "Medical Practitioner",
    rating: 5,
    date: "4 months ago",
    location: "Dubai, UAE",
    text: "Professional, responsive, and exceptionally skilled in local business growth & Google Ads. Resolved complex listing and policy issues effortlessly for our clinic network.",
  },
  {
    id: "5",
    name: "Rahul V",
    role: "Tech Consultant",
    rating: 5,
    date: "5 months ago",
    location: "Bengaluru, India",
    text: "Working with Govind on website optimization and digital strategy was seamless. Remarkable attention to detail, transparent communication, and top-tier execution.",
  },
];

function GoogleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

function StarRating({ rating = 5 }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-foreground/10 text-foreground/20"
          }`}
        />
      ))}
    </div>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
  }),
};

export function ReviewSlider() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [[currentIndex, direction], setSlideState] = useState<[number, number]>([0, 0]);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    // Fetch reviews from your Firestore database or a local JSON file
    const fetchReviews = async () => {
      const data: Review[] = DEFAULT_REVIEWS;
      setReviews(data);
    };
    fetchReviews();
  }, []);

  const handleNext = useCallback(() => {
    if (reviews.length === 0) return;
    setSlideState(([prevIndex]) => [(prevIndex + 1) % reviews.length, 1]);
  }, [reviews.length]);

  const handlePrev = useCallback(() => {
    if (reviews.length === 0) return;
    setSlideState(([prevIndex]) => [(prevIndex - 1 + reviews.length) % reviews.length, -1]);
  }, [reviews.length]);

  const goToSlide = useCallback((targetIndex: number) => {
    setSlideState(([prevIndex]) => [
      targetIndex,
      targetIndex > prevIndex ? 1 : -1,
    ]);
  }, []);

  useEffect(() => {
    if (!isAutoplay || reviews.length <= 1) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay, handleNext, reviews.length]);

  const SWIPE_THRESHOLD = 40;
  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const swipeOffset = info.offset.x;
    const swipeVelocity = info.velocity.x;

    if (swipeOffset < -SWIPE_THRESHOLD || swipeVelocity < -300) {
      handleNext();
    } else if (swipeOffset > SWIPE_THRESHOLD || swipeVelocity > 300) {
      handlePrev();
    }
  };

  if (reviews.length === 0) return null;

  const currentReview = reviews[currentIndex];
  if (!currentReview) return null;

  return (
    <section className="relative w-full py-6 sm:py-10">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        <FadeIn className="flex flex-col items-center gap-4 text-center mb-8 sm:mb-12">
          {/* Tag Header */}
          <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/4 px-3.5 py-1 text-xs font-semibold tracking-wide text-foreground/80 shadow-2xs backdrop-blur-xs">
            <GoogleIcon className="h-3.5 w-3.5 shrink-0" />
            <span>Google Reviews</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <h2 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
            What Our Clients Say
          </h2>
          <p className="max-w-[46ch] text-[15px] sm:text-[17px] text-foreground/65 leading-relaxed">
            Real feedback from clients and business owners who trusted us with their web & digital growth solutions.
          </p>
        </FadeIn>

        {/* Main Review Display Container */}
        <div
          className="relative mx-auto w-full max-w-4xl"
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          {/* Card Frame - Touch & Mouse Drag / Swipe Enabled */}
          <div className="relative overflow-hidden rounded-3xl sm:rounded-4xl border border-foreground/8 bg-background p-6 sm:p-10 shadow-xs backdrop-blur-sm transition-all duration-300 hover:border-foreground/15">
            {/* Background Glows */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-amber-500/5 blur-3xl" />

            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="relative z-10 flex flex-col gap-6 cursor-grab active:cursor-grabbing select-none"
            >
              {/* Header inside Card */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-foreground/6 pb-5 pointer-events-none">
                <div className="flex items-center gap-3.5">
                  {/* Avatar / Initials */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-foreground/6 border border-foreground/10 text-foreground font-bold text-lg shadow-2xs">
                    {currentReview.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[17px] sm:text-[18px] text-foreground tracking-tight capitalize">
                        {currentReview.name}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </span>
                    </div>
                    {currentReview.location && (
                      <span className="text-xs text-foreground/55 tracking-tight">
                        {currentReview.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Rating & Google Badge */}
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <div className="flex items-center gap-2">
                    <StarRating rating={currentReview.rating} />
                    <span className="text-xs font-bold text-foreground/80">
                      {currentReview.rating}.0
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-foreground/50">
                    <GoogleIcon className="h-3.5 w-3.5" />
                    <span>Google Review</span>
                    {currentReview.date && <span>• {currentReview.date}</span>}
                  </div>
                </div>
              </div>

              {/* Review Quote Body with Drag & Motion */}
              <div className="min-h-[110px] sm:min-h-[100px] flex items-center overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentReview.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full relative"
                  >
                    <Quote className="absolute -left-2 -top-3 h-8 w-8 text-foreground/5 rotate-180 pointer-events-none" />
                    <p className="text-[16px] sm:text-[19px] leading-relaxed text-foreground/85 tracking-tight font-normal italic pl-2 sm:pl-4 border-l-2 border-amber-400/70 pointer-events-none">
                      &ldquo;{currentReview.text}&rdquo;
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slider Footer & Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-foreground/6">
                {/* Swipe helper tip & Dot Pagination */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    {reviews.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === currentIndex
                            ? "w-7 bg-foreground"
                            : "w-2 bg-foreground/20 hover:bg-foreground/40"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-foreground/40 select-none">
                    <Hand className="h-3 w-3" />
                    Swipe or drag
                  </span>
                </div>

                {/* Nav Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous Review"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/10 bg-background text-foreground/75 shadow-2xs transition-all hover:border-foreground/25 hover:bg-foreground/5 hover:text-foreground cursor-pointer focus-ring"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next Review"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/10 bg-background text-foreground/75 shadow-2xs transition-all hover:border-foreground/25 hover:bg-foreground/5 hover:text-foreground cursor-pointer focus-ring"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Google Profile Trust Banner */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-3 text-xs text-foreground/60">
            <div className="flex items-center gap-2">
              <GoogleIcon className="h-4 w-4 shrink-0" />
              <span className="font-semibold text-foreground/80">5.0 Star Rating</span>
              <span>on Google Business Profile</span>
            </div>
            <a
              href="https://www.google.com/search?q=Govind+digital+marketer+trivandrum"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-foreground/70 hover:text-foreground font-medium transition-colors underline-offset-4 hover:underline"
            >
              Verify on Google
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReviewSlider;
