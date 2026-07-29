"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { skills, techStack } from "@/lib/data";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Skills() {
  const categories = React.useMemo(() => {
    const map = new Map<string, typeof skills>();
    skills.forEach((s) => {
      const arr = map.get(s.category) ?? [];
      arr.push(s);
      map.set(s.category, arr);
    });
    return Array.from(map.entries());
  }, []);

  return (
    <section id="about" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <SectionHeader
          eyebrow="À propos"
          title="Un parcours en pleine construction."
          description="Jeune développeur passionné par le web, je me forme chaque jour et construis des projets concrets pour progresser. Voici un aperçu de mon parcours et de mes compétences."
        />

        {/* Bio + portrait grid */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          {/* Sticky bio */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <div className="rounded-3xl border border-border bg-card p-8">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Biographie
              </p>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-foreground">
                Je suis un jeune développeur basé à Cotonou, passionné par la création
                de produits numériques. Je me forme activement aux technologies web
                modernes comme React, Next.js et TypeScript, et je construis des projets
                concrets pour mettre en pratique ce que j'apprends.
              </p>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
                J'aime résoudre des problèmes, apprendre de nouvelles choses et partager
                mes connaissances avec la communauté. Mon objectif est de devenir un
                développeur complet, capable de construire des applications web de
                qualité, de l'interface jusqu'au serveur.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
                <div>
                  <p className="text-xs text-muted-foreground">Basé à</p>
                  <p className="mt-1 text-sm font-medium text-foreground">Cotonou, Bénin</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Apprentissage</p>
                  <p className="mt-1 text-sm font-medium text-foreground">En cours</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Focus</p>
                  <p className="mt-1 text-sm font-medium text-foreground">Web · Produit</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Disponibilité</p>
                  <p className="mt-1 text-sm font-medium text-foreground">Stages · Freelance</p>
                </div>
              </div>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
              >
                Télécharger le CV
              </a>
            </div>
          </motion.div>

          {/* Skills + experience */}
          <div className="space-y-12">
            {/* Skill bars */}
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {categories.map(([category, items], idx) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease: EASE, delay: idx * 0.05 }}
                >
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {category}
                  </p>
                  <div className="mt-4 space-y-4">
                    {items.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-foreground">{skill.name}</span>
                          <span className="text-xs text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-border">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
                            className="h-full rounded-full bg-foreground"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Experience timeline */}
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Parcours
              </p>
              <div className="mt-6 space-y-px overflow-hidden rounded-2xl border border-border">
                {[
                  { role: "Développeur Web — Apprentissage actif", company: "Auto-formation", period: "2025 — Maintenant" },
                  { role: "Développeur Frontend", company: "Projets personnels", period: "2025 — Maintenant" },
                  { role: "Étudiant en Développement Web", company: "Formation en ligne", period: "2025 — 2026" },
                  { role: "Contributeur Open Source", company: "Communauté GitHub", period: "2025 — Maintenant" },
                ].map((exp, i) => (
                  <motion.div
                    key={exp.company}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
                    className={cn(
                      "flex items-center justify-between gap-4 bg-background px-5 py-4 transition-colors hover:bg-card",
                      i !== 3 && "border-b border-border"
                    )}
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{exp.role}</p>
                      <p className="text-xs text-muted-foreground">{exp.company}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{exp.period}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tech tags */}
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Pile technologique
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: EASE, delay: i * 0.02 }}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-pink-soft bg-pink-soft px-3 py-1 text-xs font-semibold uppercase tracking-widest text-pink",
          align === "center" && "mx-auto"
        )}
      >
        <span className="pink-dot" style={{ width: 6, height: 6 }} />
        {eyebrow}
      </div>
      <h2 className="display-lg mt-5 text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
