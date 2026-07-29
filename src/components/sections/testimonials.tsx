"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import { SectionHeader } from "./skills";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Testimonials() {
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const paginate = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const active = testimonials[index];

  return (
    <section className="relative overflow-hidden border-y border-border bg-card py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Témoignages"
          title="La confiance des dirigeants tech."
          description="Ce que les personnes avec qui j'ai travaillé disent de notre collaboration."
          align="center"
        />

        <div className="relative mx-auto mt-14 max-w-4xl">
          {/* Quote watermark */}
          <Quote className="absolute -left-2 -top-8 h-24 w-24 text-foreground/[0.04]" />

          <div className="relative min-h-[280px] sm:min-h-[260px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0"
              >
                <div className="flex gap-1">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-foreground text-foreground" />
                  ))}
                </div>
                <blockquote className="mt-5 text-balance text-xl font-medium leading-relaxed tracking-tight text-foreground sm:text-2xl">
                  "{active.quote}"
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  { }
                  <img
                    src={active.avatar}
                    alt={active.author}
                    className="h-12 w-12 rounded-full object-cover grayscale"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{active.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {active.role} · {active.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Témoignage ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-8 bg-foreground" : "w-1.5 bg-border hover:bg-foreground/40"
                  )}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => paginate(-1)}
                aria-label="Précédent"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => paginate(1)}
                aria-label="Suivant"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
