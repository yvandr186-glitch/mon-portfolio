"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SectionHeader } from "./skills";
import { stats } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const processSteps = [
  {
    num: "01",
    title: "Découvrir",
    description:
      "Nous commençons par une exploration approfondie de vos objectifs, de vos utilisateurs et de vos contraintes. Je pose les questions difficiles pour m'assurer que nous résolvons le bon problème.",
  },
  {
    num: "02",
    title: "Concevoir",
    description:
      "Wireframes, maquettes et prototypes interactifs. J'itère rapidement avec vos retours jusqu'à ce que chaque pixel soit juste.",
  },
  {
    num: "03",
    title: "Développer",
    description:
      "Du code de qualité production avec React, Next.js et TypeScript. Performance, accessibilité et expérience développeur intégrées dès le premier jour.",
  },
  {
    num: "04",
    title: "Livrer",
    description:
      "Lancement, mesure, itération. Je vous aide à livrer en toute confiance et à continuer d'améliorer sur la base de données réelles.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative border-t border-border bg-background py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Ma méthode"
          title="Un processus axé sur les résultats."
          description="Chaque mission suit un processus éprouvé en 4 étapes. Transparent, collaboratif et obsédé par la livraison."
        />

        {/* Process steps */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 card-hover hover:border-pink-soft"
            >
              <span className="text-5xl font-bold text-foreground/[0.08] transition-colors group-hover:text-pink/30">
                {step.num}
              </span>
              <h3 className="mt-3 text-lg font-bold tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
              <div className="mt-4 h-px w-full bg-border transition-all duration-500 group-hover:w-12 group-hover:bg-pink" />
            </motion.div>
          ))}
        </div>

        {/* Big stats band — Carlos signature */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className="group relative bg-background p-7 transition-colors hover:bg-card sm:p-9"
            >
              <p className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
                {stat.value}
                <span className="text-pink">{stat.suffix}</span>
              </p>
              <p className="mt-3 text-sm font-semibold text-foreground">{stat.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl border border-pink-soft bg-pink-soft p-8 sm:flex-row sm:items-center sm:p-10"
        >
          <div>
            <p className="editorial-label text-pink">Prêt à commencer ?</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Créons ensemble quelque chose d'exceptionnel.
            </h3>
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-pink px-7 text-sm font-semibold text-white shadow-pink-glow transition-all hover:gap-3"
          >
            Démarrer un projet
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
