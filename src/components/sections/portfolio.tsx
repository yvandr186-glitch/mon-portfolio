"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, X, Calendar, CheckCircle2 } from "lucide-react";
import { useProjects } from "@/hooks/use-projects";
import type { Project, ProjectCategory } from "@/lib/types";
import { SectionHeader } from "./skills";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const categories: ("Tous" | ProjectCategory)[] = [
  "Tous", "Application Web", "Mobile", "Design System", "Open Source", "Branding",
];

export function Portfolio() {
  const { items: projects } = useProjects();
  const [filter, setFilter] = React.useState<"Tous" | ProjectCategory>("Tous");
  const [selected, setSelected] = React.useState<Project | null>(null);

  const filtered = React.useMemo(() => {
    if (filter === "Tous") return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter, projects]);

  return (
    <section id="work" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Projets sélectionnés"
            title="Des projets dont je suis fier."
            description="Une sélection de produits que j'ai conçus, construits ou dirigés. Des plateformes en temps réel aux design systems utilisés par des milliers de développeurs."
          />

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
                  filter === cat
                    ? "border-pink bg-pink text-white shadow-pink-glow"
                    : "border-border bg-card text-muted-foreground hover:border-pink-soft hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.button
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: EASE }}
                onClick={() => setSelected(project)}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card text-left card-hover hover:border-pink-soft hover:shadow-pink-glow",
                  project.featured && "sm:col-span-2 lg:col-span-1"
                )}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-background">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />

                  {/* Featured badge */}
                  {project.featured && (
                    <span className="absolute left-4 top-4 rounded-full bg-pink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white shadow-pink-glow">
                      À la une
                    </span>
                  )}
                  <span className="absolute right-4 top-4 rounded-full border border-border bg-background/80 px-2.5 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur">
                    {project.year}
                  </span>

                  {/* Hover arrow */}
                  <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-pink text-white opacity-0 shadow-pink-glow transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {project.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="rounded-full bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Project detail dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto border-border bg-background p-0">
          <DialogTitle className="sr-only">
            {selected?.title ?? "Project detail"}
          </DialogTitle>
          {selected && (
            <ProjectDetail project={selected} />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  return (
    <div>
      {/* Hero image */}
      <div className="relative aspect-[21/9] w-full overflow-hidden border-b border-border">
        { }
        <img
          src={project.thumbnail}
          alt={project.title}
          className="h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-border bg-background/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-foreground backdrop-blur">
              {project.category}
            </span>
            <span className="flex items-center gap-1 rounded-full border border-border bg-background/80 px-2.5 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur">
              <Calendar className="h-3 w-3" />
              {project.year}
            </span>
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {project.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {project.excerpt}
          </p>
        </div>
      </div>

      <div className="p-8">
        {/* Description */}
        <p className="text-pretty text-base leading-relaxed text-foreground">
          {project.description}
        </p>

        {/* Metrics */}
        {project.metrics && (
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="bg-background p-5">
                <p className="text-2xl font-semibold tracking-tight text-foreground">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tech stack */}
        <div className="mt-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Pile technologique
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Gallery */}
        {project.gallery.length > 0 && (
          <div className="mt-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Galerie
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {project.gallery.map((src, i) => (
                 
                <img
                  key={i}
                  src={src}
                  alt={`${project.title} ${i + 1}`}
                  className="aspect-video w-full rounded-2xl border border-border object-cover grayscale"
                />
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
            >
              <ArrowUpRight className="h-4 w-4" />
              Voir la démo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <Github className="h-4 w-4" />
              Code source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
