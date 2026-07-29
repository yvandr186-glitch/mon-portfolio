"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles, MapPin, Star } from "lucide-react";
import { profile, services, stats } from "@/lib/data";
import {
  Code2, Sparkles as SparklesIcon, Rocket, Github, Twitter, Linkedin, Dribbble,
} from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const serviceIcons: Record<string, React.ElementType> = {
  Sparkles: SparklesIcon, Code2, Rocket,
};

export function Hero() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden bg-background"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid mask-radial-faded opacity-50" />
      <div className="absolute inset-0 noise" />
      {/* Pink radial spotlight — Carlos signature */}
      <div
        className="aurora"
        style={{
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70vw",
          height: "70vw",
          background:
            "radial-gradient(circle, var(--accent-pink-glow) 0%, transparent 65%)",
          opacity: 0.6,
        }}
      />

      <motion.div
        style={{ y }}
        className="relative z-10 mx-auto max-w-7xl px-4 pt-28 sm:px-6 sm:pt-32"
      >
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-wrap items-center justify-between gap-4 pb-8 sm:pb-12"
        >
          <div className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="pink-dot" />
            {profile.availability}
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              {profile.location}
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <Star className="h-3 w-3 fill-pink text-pink" style={{ fill: "var(--accent-pink)" }} />
              <Star className="h-3 w-3 fill-pink text-pink" style={{ fill: "var(--accent-pink)" }} />
              <Star className="h-3 w-3 fill-pink text-pink" style={{ fill: "var(--accent-pink)" }} />
              <Star className="h-3 w-3 fill-pink text-pink" style={{ fill: "var(--accent-pink)" }} />
              <Star className="h-3 w-3 fill-pink text-pink" style={{ fill: "var(--accent-pink)" }} />
              <span className="ml-1">5.0 · Top évalué</span>
            </span>
          </div>
        </motion.div>

        {/* Giant display name — Carlos signature */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="relative"
          >
            <h1 className="display-name text-foreground">
              <span className="block">DOGNON</span>
              <span className="block text-gradient">FRANCK</span>
            </h1>
            {/* Floating portrait overlapping the name */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{ duration: 1, ease: EASE, delay: 0.5 }}
              className="absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block"
            >
              <div className="relative h-44 w-44 overflow-hidden rounded-2xl border-2 border-pink shadow-pink-glow-lg xl:h-56 xl:w-56">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Role + tagline row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <span className="rounded-full bg-pink px-4 py-1.5 text-sm font-semibold text-white">
              {profile.title}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {profile.subtitle}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
            className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {profile.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-pink px-7 text-sm font-semibold text-white shadow-pink-glow transition-all duration-300 hover:gap-3"
            >
              Me contacter
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card/50 px-7 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-accent"
            >
              Voir mes projets
            </a>
            <div className="flex items-center gap-2">
              <SocialRound href={profile.socials.github} icon={Github} label="GitHub" />
              <SocialRound href={profile.socials.twitter} icon={Twitter} label="Twitter" />
              <SocialRound href={profile.socials.linkedin} icon={Linkedin} label="LinkedIn" />
              <SocialRound href={profile.socials.dribbble} icon={Dribbble} label="Dribbble" />
            </div>
          </motion.div>
        </div>

        {/* Asymmetric service cards — Carlos signature */}
        <div className="mt-16 grid gap-4 sm:mt-20 lg:grid-cols-12">
          {/* Featured (pink) card — larger */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.85 }}
            className="card-featured-pink relative overflow-hidden rounded-3xl border p-7 lg:col-span-5"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink text-white">
                <Code2 className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-pink-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-pink">
                À la une
              </span>
            </div>
            <h3 className="mt-5 text-2xl font-bold tracking-tight text-foreground">
              {services[0].title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {services[0].description}
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-pink-soft pt-4">
              <span className="text-xs font-medium text-pink">Le plus demandé</span>
              <ArrowUpRight className="h-4 w-4 text-pink" />
            </div>
          </motion.div>

          {/* Secondary cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.95 }}
            className="grid gap-4 lg:col-span-7 lg:grid-cols-2"
          >
            {services.slice(1).map((service) => {
              const Icon = serviceIcons[service.icon] ?? Code2;
              return (
                <div
                  key={service.id}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 card-hover hover:border-foreground/30"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {service.features.slice(0, 2).map((f) => (
                      <span
                        key={f}
                        className="rounded-full bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Big number stat card — Carlos signature */}
            <div className="relative col-span-full rounded-3xl border border-border bg-gradient-to-br from-card to-background p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="editorial-label text-pink">{stats[0].label}</p>
                  <p className="stat-number mt-2 text-foreground leading-none">
                    {stats[0].value}
                    <span className="text-pink">{stats[0].suffix}</span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stats[0].description}
                  </p>
                </div>
                <Sparkles className="h-8 w-8 text-pink" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-[10px] uppercase tracking-[0.3em]">Défiler</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function SocialRound({
  href, icon: Icon, label,
}: { href: string; icon: React.ElementType; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/50 text-muted-foreground backdrop-blur transition-all hover:border-pink-soft hover:text-pink"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}
