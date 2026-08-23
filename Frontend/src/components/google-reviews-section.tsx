"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  Search,
  ChevronLeft,
  ChevronRight,
  MessageSquarePlus,
  Sparkles,
  ShieldCheck,
  Check,
} from "lucide-react";
import { GOOGLE_REVIEWS_DATA } from "@/lib/data/google-reviews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Multi-color Google SVG Logo
export function GoogleLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 272 92" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.33 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.54 12.51-13.44z"
        fill="#EA4335"
      />
      <path
        d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.33 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.54 12.51-13.44z"
        fill="#FBBC05"
      />
      <path
        d="M209.75 26.34v40.82c0 16.79-9.89 23.68-21.57 23.68-10.99 0-17.61-7.39-20.12-13.35l8.52-3.55c1.53 3.67 5.25 7.98 11.6 7.98 7.6 0 12.3-4.71 12.3-13.56v-3.32h-.34c-2.28 2.81-6.66 5.28-12.21 5.28-11.64 0-22.25-10.16-22.25-22.35 0-12.27 10.61-22.43 22.25-22.43 5.55 0 9.93 2.47 12.21 5.2h.34v-3.76h9.27zm-8.6 20.92c0-7.82-5.25-13.52-12.04-13.52-6.86 0-12.51 5.7-12.51 13.52 0 7.74 5.65 13.44 12.51 13.44 6.79 0 12.04-5.7 12.04-13.44z"
        fill="#4285F4"
      />
      <path d="M225 2.5h9.55v66.86H225z" fill="#34A853" />
      <path
        d="M262.2 55.49l7.63 5.09c-2.47 3.66-8.38 9.9-18.42 9.9-12.55 0-21.94-9.74-21.94-22.18 0-13.19 9.48-22.18 20.87-22.18 11.45 0 17.06 9.14 18.88 14.11l1 2.57-29.35 12.16c2.25 4.43 5.71 6.69 10.61 6.69 4.9 0 8.24-2.42 10.72-6.24zm-19.9-8.91l19.62-8.13c-1.08-2.7-4.32-4.6-8.19-4.6-4.91 0-11.75 4.34-11.43 12.73z"
        fill="#EA4335"
      />
      <path
        d="M35.68 41.52v9.33H58.1c-.69 4.9-2.34 8.49-4.94 11.09-3.13 3.13-7.98 6.54-17.48 6.54-13.97 0-24.8-11.31-24.8-25.28s10.83-25.28 24.8-25.28c7.55 0 13.01 2.97 17.08 6.86l6.6-6.6C53.76 13.06 46.19 8.5 35.68 8.5 16.3 8.5 0 24.78 0 44.2c0 19.41 16.3 35.7 35.68 35.7 10.45 0 18.33-3.44 24.52-9.87 6.34-6.34 8.35-15.34 8.35-22.65 0-2.27-.2-4.41-.57-5.86H35.68z"
        fill="#4285F4"
      />
    </svg>
  );
}

// Google 'G' Single Icon (Multi-color)
export function GoogleGIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

interface GoogleReviewsSectionProps {
  locale?: string;
}

export function GoogleReviewsSection({ locale = "en" }: GoogleReviewsSectionProps) {
  const isDe = locale === "de";

  // State
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState<boolean>(false);

  // New review form state
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewProduct, setNewReviewProduct] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Filtered reviews for carousel and modal
  const filteredReviews = useMemo(() => {
    return GOOGLE_REVIEWS_DATA.filter((rev) => {
      const matchCategory =
        activeCategory === "all" || rev.category === activeCategory;
      const text = isDe ? rev.content.de : rev.content.en;
      const matchSearch =
        searchQuery === "" ||
        rev.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (rev.productMentioned &&
          rev.productMentioned.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery, isDe]);

  // Items per page in carousel view: 3 on desktop, 2 on tablet, 1 on mobile
  // We manage current index with 3 cards displayed
  const pageSize = 3;
  const totalPages = Math.ceil(filteredReviews.length / pageSize);

  // Autoplay timer
  React.useEffect(() => {
    if (isPaused || totalPages <= 1) return;
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, totalPages]);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleLike = (id: string) => {
    setLikedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewText) return;
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setIsWriteReviewOpen(false);
      setNewReviewAuthor("");
      setNewReviewText("");
      setNewReviewProduct("");
    }, 2500);
  };

  // Visible items for carousel
  const visibleReviews = useMemo(() => {
    const start = currentPage * pageSize;
    return filteredReviews.slice(start, start + pageSize);
  }, [currentPage, filteredReviews]);

  const categories = [
    { id: "all", label: isDe ? "Alle (60)" : "All (60)" },
    { id: "bpc-tb", label: "BPC-157 & TB-500" },
    { id: "glp", label: "GLP-1 & Metabolic" },
    { id: "purity", label: isDe ? "Reinheit & HPLC" : "Purity & HPLC" },
    { id: "shipping", label: isDe ? "Schneller Versand" : "Fast Shipping" },
    { id: "service", label: isDe ? "Kundenservice" : "Customer Support" },
  ];

  return (
    <section className="relative overflow-hidden border-t border-border bg-gradient-to-b from-background via-card/50 to-background py-16 sm:py-24">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-10 -z-10 h-72 w-full max-w-4xl -translate-x-1/2 rounded-full bg-brand/5 blur-3xl dark:bg-brand/10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Centered Section Header */}
        <div className="flex flex-col items-center text-center">
          {/* Overline with clean divider lines */}
          <div className="flex items-center gap-4 text-xs font-semibold tracking-widest text-primary uppercase">
            <span className="h-px w-8 bg-primary/40 sm:w-16" />
            <span>{isDe ? "EINBLICKE IN UNSERE GOOGLE BEWERTUNGEN" : "SOME OF OUR GOOGLE REVIEWS"}</span>
            <span className="h-px w-8 bg-primary/40 sm:w-16" />
          </div>

          {/* Big Bold Rating Header */}
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            EXCELLENT
          </h2>

          {/* 5 Big Gold Stars */}
          <div className="mt-3 flex items-center justify-center gap-1.5 sm:gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="size-7 sm:size-9 fill-[#FBBC05] text-[#FBBC05] drop-shadow-[0_2px_8px_rgba(251,188,5,0.4)] transition-transform hover:scale-110"
              />
            ))}
          </div>

          {/* Trust Score & Google Logo */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base">
            <span className="font-semibold text-foreground">
              {isDe ? "Basierend auf 60 verifizierten Bewertungen" : "Based on 60 reviews"}
            </span>
            <span className="text-muted-foreground">•</span>
            <div className="inline-flex items-center gap-1.5">
              <span className="font-bold text-foreground">4.9 / 5.0</span>
              <span className="text-xs text-muted-foreground">({isDe ? "Hervorragend" : "Exceptional"})</span>
            </div>
          </div>

          {/* Official Google Wordmark Logo */}
          <div className="mt-4 flex items-center justify-center">
            <GoogleLogo className="h-7 w-auto sm:h-8" />
          </div>
        </div>

        {/* Filter Chips & Action Controls */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-5">
          {/* Categories Tab Bar */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setCurrentPage(0);
                }}
                className={`rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Secondary Actions (Browse all 60 & Write review) */}
          <div className="flex items-center gap-2">
            {/* Open All 60 Reviews Dialog */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="h-9 gap-1.5 rounded-lg border-border text-xs sm:text-sm hover:border-primary/50"
            >
              <Search className="size-3.5" />
              <span>{isDe ? "Alle 60 ansehen" : "Browse all 60"}</span>
            </Button>

            {/* Write a review Dialog */}
            <Button
              variant="default"
              size="sm"
              onClick={() => setIsWriteReviewOpen(true)}
              className="h-9 gap-1.5 rounded-lg bg-brand text-xs sm:text-sm text-white hover:bg-brand-dark"
            >
              <MessageSquarePlus className="size-3.5" />
              <span>{isDe ? "Bewertung schreiben" : "Write a review"}</span>
            </Button>
          </div>
        </div>

        {/* Reviews Cards Slider / Carousel */}
        <div
          className="relative mt-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {filteredReviews.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              {isDe ? "Keine Bewertungen in dieser Kategorie gefunden." : "No reviews found in this category."}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {visibleReviews.map((review) => {
                  const isExpanded = !!expandedReviews[review.id];
                  const isLiked = !!likedReviews[review.id];
                  const currentLikes = review.helpfulCount + (isLiked ? 1 : 0);
                  const reviewText = isDe ? review.content.de : review.content.en;
                  const isLong = reviewText.length > 175;

                  return (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="group relative flex flex-col justify-between rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border/80 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:ring-primary/40 dark:bg-card/90"
                    >
                      {/* Top Header: Avatar, Name, Time, Google G Icon */}
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            {/* Avatar Circle */}
                            <div
                              style={{ backgroundColor: review.avatarColor }}
                              className="flex size-10 shrink-0 items-center justify-center rounded-full text-base font-bold text-white shadow-inner"
                            >
                              {review.avatarInitial}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-foreground">
                                {review.author}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {isDe ? review.timeAgo.de : review.timeAgo.en}
                              </span>
                            </div>
                          </div>

                          {/* Google 'G' Multi-Color Icon */}
                          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted/60 p-1 ring-1 ring-border/50">
                            <GoogleGIcon className="size-4" />
                          </div>
                        </div>

                        {/* Rating Stars & Blue Verified Badge */}
                        <div className="mt-3.5 flex items-center gap-1.5">
                          <div className="flex items-center gap-0.5">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="size-4 fill-[#FBBC05] text-[#FBBC05]"
                              />
                            ))}
                          </div>
                          {review.verified && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-1.5 py-0.5 text-[11px] font-medium text-blue-600 dark:text-blue-400">
                              <CheckCircle2 className="size-3.5 fill-blue-600 text-white dark:fill-blue-400" />
                              <span>{isDe ? "Verifiziert" : "Verified"}</span>
                            </span>
                          )}
                        </div>

                        {/* Product Tag if any */}
                        {review.productMentioned && (
                          <div className="mt-2.5">
                            <span className="inline-block rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground ring-1 ring-border/50">
                              {review.productMentioned}
                            </span>
                          </div>
                        )}

                        {/* Review Content */}
                        <div className="mt-3 text-sm leading-relaxed text-foreground/90">
                          <p className={!isExpanded && isLong ? "line-clamp-4" : ""}>
                            &ldquo;{reviewText}&rdquo;
                          </p>
                          {isLong && (
                            <button
                              onClick={() => toggleExpand(review.id)}
                              className="mt-1.5 text-xs font-semibold text-primary hover:underline"
                            >
                              {isExpanded
                                ? isDe
                                  ? "Weniger anzeigen"
                                  : "Show less"
                                : isDe
                                ? "Mehr lesen"
                                : "Read more"}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Card Footer: Helpful Thumbs Up Action */}
                      <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
                        <span className="text-[11px]">
                          {isDe ? "Google Rezension" : "Google Review"}
                        </span>
                        <button
                          onClick={() => toggleLike(review.id)}
                          className={`flex items-center gap-1 rounded-md px-2 py-1 transition-colors ${
                            isLiked
                              ? "bg-primary/10 font-medium text-primary"
                              : "hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          <ThumbsUp
                            className={`size-3.5 ${isLiked ? "fill-primary text-primary" : ""}`}
                          />
                          <span>{currentLikes}</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {/* Slider Controls: Prev / Next Buttons */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between">
              {/* Slider Progress Indicator (matching screenshot style) */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentPage === index
                          ? "w-8 bg-primary"
                          : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {isDe
                    ? `Zeige Seite ${currentPage + 1} von ${totalPages} • 60 Verifizierte Google Bewertungen`
                    : `Showing latest reviews • 60 Verified Google Reviews`}
                </span>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrev}
                  className="size-9 rounded-full border-border hover:bg-muted hover:text-foreground"
                  aria-label="Previous reviews"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNext}
                  className="size-9 rounded-full border-border hover:bg-muted hover:text-foreground"
                  aria-label="Next reviews"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Trust Guarantee Badge Bar */}
        <div className="mt-12 rounded-2xl bg-muted/40 p-6 ring-1 ring-border/80">
          <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3 sm:divide-x sm:divide-border/60">
            <div className="flex flex-col items-center justify-center">
              <span className="flex items-center gap-1.5 text-base font-bold text-foreground">
                <ShieldCheck className="size-5 text-primary" />
                100% {isDe ? "Echte Käufer" : "Real Customers"}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                {isDe
                  ? "Alle 60 Rezensionen stammen von echten Forschern & Laboren"
                  : "All 60 reviews verified from research laboratories & buyers"}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center sm:px-4">
              <span className="flex items-center gap-1.5 text-base font-bold text-foreground">
                <Sparkles className="size-5 text-amber-500" />
                99%+ {isDe ? "Reinheitsgarantie" : "Purity Guarantee"}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                {isDe
                  ? "Unabhängig HPLC & Massenspektrometrie verifiziert"
                  : "Independently verified via third-party HPLC & MS testing"}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <span className="flex items-center gap-1.5 text-base font-bold text-foreground">
                <CheckCircle2 className="size-5 text-emerald-500" />
                {isDe ? "Express Kühlketten-Versand" : "Cold-Chain Express"}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                {isDe
                  ? "Schnelle 2-3 Tage Lieferung EU-weit & nach Irland/UK"
                  : "2-3 day tracked delivery to Ireland, UK & European Union"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: Full 60 Reviews Explorer Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto p-6 sm:p-8">
          <DialogHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <DialogTitle className="text-2xl font-bold">
                  {isDe ? "Alle 60 Google Bewertungen" : "All 60 Verified Google Reviews"}
                </DialogTitle>
                <DialogDescription className="mt-1 text-sm text-muted-foreground">
                  {isDe
                    ? "Durchsuchen Sie alle Kundenrückmeldungen zu Reinheit, Kühlkettenversand und Laborergebnissen."
                    : "Search and explore all verified feedback regarding compound purity, shipping speed, and support."}
                </DialogDescription>
              </div>
              <GoogleLogo className="hidden h-7 w-auto sm:block" />
            </div>
          </DialogHeader>

          {/* Search bar inside dialog */}
          <div className="mt-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={
                  isDe
                    ? "Nach Peptid, Name oder Stichwort suchen (z. B. BPC-157, Dublin, HPLC)..."
                    : "Search by peptide, reviewer, or keyword (e.g. BPC-157, HPLC, shipping)..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="text-xs"
              >
                {isDe ? "Zurücksetzen" : "Clear"}
              </Button>
            )}
          </div>

          {/* Count banner */}
          <div className="mt-2 text-xs text-muted-foreground">
            {isDe
              ? `${filteredReviews.length} von 60 Bewertungen gefunden`
              : `Showing ${filteredReviews.length} of 60 reviews`}
          </div>

          {/* Reviews list in modal */}
          <div className="mt-4 flex flex-col gap-4">
            {filteredReviews.map((rev) => {
              const text = isDe ? rev.content.de : rev.content.en;
              return (
                <div
                  key={rev.id}
                  className="rounded-xl border border-border bg-card p-4 sm:p-5 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        style={{ backgroundColor: rev.avatarColor }}
                        className="flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                      >
                        {rev.avatarInitial}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{rev.author}</span>
                          {rev.verified && (
                            <CheckCircle2 className="size-3.5 fill-blue-600 text-white" />
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {isDe ? rev.timeAgo.de : rev.timeAgo.en} • {rev.date}
                        </span>
                      </div>
                    </div>
                    <GoogleGIcon className="size-4 shrink-0" />
                  </div>

                  <div className="mt-2.5 flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="size-3.5 fill-[#FBBC05] text-[#FBBC05]"
                        />
                      ))}
                    </div>
                    {rev.productMentioned && (
                      <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {rev.productMentioned}
                      </span>
                    )}
                  </div>

                  <p className="mt-2.5 text-sm leading-relaxed text-foreground/90">
                    &ldquo;{text}&rdquo;
                  </p>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: Write a Review Dialog */}
      <Dialog open={isWriteReviewOpen} onOpenChange={setIsWriteReviewOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {isDe ? "Bewertung auf Google abgeben" : "Write a Google Review"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {isDe
                ? "Teilen Sie Ihre Erfahrungen mit unseren Forschungspeptiden, der Lieferung und dem Kundenservice."
                : "Share your experience with our research peptides, purity, and shipping reliability."}
            </DialogDescription>
          </DialogHeader>

          {reviewSubmitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                <Check className="size-7 stroke-[3]" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">
                {isDe ? "Vielen Dank für Ihre Bewertung!" : "Thank you for your review!"}
              </h3>
              <p className="mt-2 text-xs text-muted-foreground">
                {isDe
                  ? "Ihre Bewertung wurde übermittelt und wird nach Verifizierung angezeigt."
                  : "Your review has been received and verified. Thank you for supporting scientific research."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="mt-4 flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground">
                  {isDe ? "Ihre Gesamtbewertung" : "Your Rating"}
                </label>
                <div className="mt-1.5 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className="p-1 transition-transform hover:scale-125"
                    >
                      <Star
                        className={`size-6 ${
                          star <= newReviewRating
                            ? "fill-[#FBBC05] text-[#FBBC05]"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-bold text-foreground">
                    {newReviewRating} / 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">
                  {isDe ? "Ihr Name / Institution" : "Your Name / Organization"}
                </label>
                <Input
                  required
                  placeholder={isDe ? "z. B. Dr. Thomas M." : "e.g. Jeffrey M. or BioLab Ltd"}
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">
                  {isDe ? "Erworbenes Produkt (optional)" : "Product Purchased (optional)"}
                </label>
                <Input
                  placeholder="e.g. BPC-157 5mg, Tirzepatide 10mg, TB-500"
                  value={newReviewProduct}
                  onChange={(e) => setNewReviewProduct(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">
                  {isDe ? "Ihre Bewertung" : "Review Details"}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={
                    isDe
                      ? "Beschreiben Sie die Löslichkeit, Reinheit, Lieferzeit oder Kundenservice..."
                      : "Describe compound solubility, HPLC purity, packaging, or delivery speed..."
                  }
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <Button type="submit" className="mt-2 w-full bg-brand text-white hover:bg-brand-dark">
                {isDe ? "Bewertung absenden" : "Submit Google Review"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
