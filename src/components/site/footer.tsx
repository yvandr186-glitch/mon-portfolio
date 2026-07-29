"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Dribbble, ArrowUp, Mail } from "lucide-react";
import { profile } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const resourceLinks = [
  { label: "CV", href: "#" },
  { label: "Flux RSS", href: "#" },
  { label: "Flux Atom", href: "#" },
  { label: "Plan du site", href: "#" },
  { label: "Matériel utilisé", href: "#" },
];

const socialLinks = [
  { icon: Github, href: profile.socials.github, label: "GitHub" },
  { icon: Twitter, href: profile.socials.twitter, label: "Twitter" },
  { icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
  { icon: Dribbble, href: profile.socials.dribbble, label: "Dribbble" },
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
];

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative mt-auto border-t border-border bg-background">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        {/* Top: big CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="grid gap-8 border-b border-border pb-14 lg:grid-cols-[1.5fr_1fr] lg:items-end"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Disponible pour des projets sélectionnés
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
              Construisons
              <br />
              quelque chose
              <span className="text-muted-foreground"> d'exceptionnel.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex h-12 items-center justify-center rounded-full bg-pink px-6 text-sm font-semibold text-white shadow-pink-glow transition-transform hover:scale-[1.02]"
            >
              Démarrer un projet
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              {profile.email}
            </a>
          </div>
        </motion.div>

        {/* Middle: link columns */}
        <div className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-pink">
                <img
                  src={profile.logo ?? profile.avatar}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-sm font-semibold tracking-tight text-foreground">
                {profile.name}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              {profile.title} · {profile.subtitle}. Building premium digital products with engineering precision
              and design sensibility.
            </p>
            <div className="mt-5 flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground"
                >
                  <social.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Navigation" links={navLinks} />
          <FooterColumn title="Ressources" links={resourceLinks} />

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Newsletter
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Rejoignez 3 200+ ingénieurs avec La Lettre de Franck.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-3 flex gap-2"
            >
              <input
                type="email"
                placeholder="vous@email.com"
                className="h-10 flex-1 rounded-full border border-border bg-card px-4 text-xs text-foreground placeholder:text-muted-foreground focus-premium"
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-pink text-white shadow-pink-glow transition-transform hover:scale-105"
                aria-label="Subscribe"
              >
                <ArrowUp className="h-4 w-4 rotate-45" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom: meta */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. Conçu avec Next.js, Tailwind et passion.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-muted-foreground">
              Tous les systèmes opérationnels
            </p>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground" />
              </span>
              v3.2.0
            </span>
            <button
              onClick={scrollTop}
              aria-label="Retour en haut"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title, links,
}: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
