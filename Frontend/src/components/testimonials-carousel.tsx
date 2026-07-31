"use client";

import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EASE } from "@/lib/motion/variants";
import type { Testimonial } from "@/types";

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      plugins={[Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })]}
      className="px-1"
    >
      <CarouselContent>
        {testimonials.map((testimonial) => (
          <CarouselItem key={testimonial.id} className="sm:basis-1/2 lg:basis-1/3">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-xl bg-card p-5 ring-1 ring-foreground/10 transition-shadow duration-300 hover:shadow-xl hover:shadow-brand/10"
            >
              <Quote className="absolute right-4 top-4 size-8 text-brand/10 transition-all duration-300 group-hover:scale-110 group-hover:text-brand/20" />
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-3.5 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>
              <p className="relative text-sm leading-relaxed text-foreground">&ldquo;{testimonial.content}&rdquo;</p>
              <div className="mt-auto flex items-center gap-2.5 pt-2">
                <Avatar className="ring-2 ring-transparent transition-colors duration-300 group-hover:ring-brand/30">
                  <AvatarImage src={testimonial.avatar.src} alt={testimonial.avatar.alt} />
                  <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{testimonial.author}</span>
                  <span className="text-xs text-muted-foreground">
                    {testimonial.role}, {testimonial.organization}
                  </span>
                </div>
              </div>
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:flex" />
      <CarouselNext className="hidden lg:flex" />
    </Carousel>
  );
}
