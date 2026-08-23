"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, Calendar, ArrowRight, Tag, BookOpen, Sparkles } from "lucide-react";
import type { BlogPost } from "@/lib/data/blog-posts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BlogSearchAndFilterProps {
  posts: BlogPost[];
  locale?: string;
}

export function BlogSearchAndFilter({ posts, locale = "en" }: BlogSearchAndFilterProps) {
  const isDe = locale === "de";
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "all", label: isDe ? "Alle Artikel" : "All Articles" },
    { id: "Gewichtsverlust & Stoffwechsel", label: isDe ? "Gewichtsverlust & Stoffwechsel" : "Weight Loss & Metabolism" },
    { id: "GLP-1 Research", label: "GLP-1 Research" },
    { id: "Peptide Protocols", label: "Peptide Protocols" },
    { id: "Quality & Testing", label: isDe ? "Qualität & HPLC" : "Quality & HPLC" },
    { id: "Storage & Logistics", label: isDe ? "Kühlkette & Lagerung" : "Storage & Logistics" },
  ];

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCategory =
        activeCategory === "all" || post.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        post.author.name.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  return (
    <div>
      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                  : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={
              isDe
                ? "Artikel, HPLC, BPC-157 suchen..."
                : "Search guides, HPLC, BPC-157..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* Results Header */}
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {isDe
            ? `${filteredPosts.length} Fachartikel gefunden`
            : `Showing ${filteredPosts.length} research articles`}
        </span>
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchQuery("")}
            className="h-6 text-xs text-primary"
          >
            {isDe ? "Suche zurücksetzen" : "Clear search"}
          </Button>
        )}
      </div>

      {/* Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          {isDe
            ? "Keine Artikel passend zu Ihrer Suche gefunden."
            : "No research articles found matching your criteria."}
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-xs ring-1 ring-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/40 dark:bg-card/90"
              >
                <div>
                  {/* Thumbnail */}
                  <Link href={`/blog/${post.slug}`} className="relative block aspect-video w-full overflow-hidden bg-muted">
                    <Image
                      src={post.coverImage.src}
                      alt={post.coverImage.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3 rounded-md bg-card/90 px-2 py-0.5 text-[11px] font-bold text-primary backdrop-blur-xs">
                      {post.category}
                    </div>
                  </Link>

                  {/* Content Info */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {post.readingTimeMinutes} min
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {new Date(post.publishedAt).toLocaleDateString(
                          isDe ? "de-DE" : "en-US",
                          { month: "short", day: "numeric", year: "numeric" }
                        )}
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="mt-2.5 line-clamp-2 text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-lg">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer / Author & Read Action */}
                <div className="flex items-center justify-between border-t border-border/60 p-5 pt-3 sm:px-6">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {post.author.name.charAt(0)}
                    </div>
                    <span className="truncate text-xs font-medium text-foreground max-w-[120px]">
                      {post.author.name}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    <span>{isDe ? "Lesen" : "Read"}</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
