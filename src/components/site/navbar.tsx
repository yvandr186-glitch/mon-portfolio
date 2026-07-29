"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/data";

interface NavLink {
  label: string;
  href: string;
}

const links: NavLink[] = [
  { label: "À propos", href: "#about" },
  { label: "Projets", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("");

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={cn(
            "flex items-center justify-between rounded-full border transition-all duration-500",
            scrolled
              ? "border-border bg-background px-4 py-2"
              : "border-transparent bg-transparent px-2 py-2"
          )}
        >
          {/* Logo */}
          <Link
            href="#top"
            onClick={handleNav("#top")}
            className="group flex items-center gap-2.5 pl-2"
          >
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-pink">
              <img
                src={profile.logo ?? profile.avatar}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
              <motion.span
                className="absolute inset-0 rounded-full border border-pink"
                initial={{ scale: 1, opacity: 0.5 }}
                whileHover={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </div>
            <span className="text-sm font-semibold tracking-tight text-foreground">
              {profile.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNav(link.href)}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  activeSection === link.href.slice(1)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeSection === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-pink-soft border border-pink-soft"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="hidden h-9 items-center gap-2 rounded-full border border-border bg-background/50 px-3 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex"
              aria-label="Espace admin"
            >
              <Shield className="h-3.5 w-3.5" />
              Admin
            </Link>
            <ThemeToggle />
            <Button
              asChild
              size="sm"
              className="hidden h-9 rounded-full bg-pink px-4 text-xs font-semibold text-white shadow-pink-glow hover:bg-pink sm:flex"
            >
              <a href="#contact" onClick={handleNav("#contact")}>
                Me contacter
              </a>
            </Button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 overflow-hidden rounded-2xl border border-border bg-background p-2 md:hidden"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleNav(link.href)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex gap-2 border-t border-border pt-2">
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-xl border border-border px-4 py-2.5 text-xs font-medium text-center"
                >
                  <Shield className="mr-1.5 inline h-3.5 w-3.5" />
                  Admin
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
