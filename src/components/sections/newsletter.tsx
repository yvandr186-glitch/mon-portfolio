"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { SectionHeader } from "./skills";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const EASE = [0.16, 1, 0.3, 1] as const;

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export function Newsletter() {
  const { toast } = useToast();
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse({ email });
    if (!result.success) {
      toast({
        title: "Invalid email",
        description: result.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    // Simulated subscription — in production this calls a Server Action that
    // creates a subscriber via Prisma and sends a confirmation email via Resend.
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setDone(true);
    toast({
      title: "Abonné !",
      description: "Vérifiez votre boîte de réception pour le lien de confirmation.",
    });
    setEmail("");
  };

  return (
    <section className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-14"
        >
          {/* Decoration */}
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div
            className="aurora"
            style={{
              top: "-30%",
              right: "-10%",
              width: "40vw",
              height: "40vw",
              background: "radial-gradient(circle, var(--premium-glow) 0%, transparent 60%)",
            }}
          />

          <div className="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-pink-soft bg-pink-soft px-3 py-1 text-xs font-semibold uppercase tracking-widest text-pink">
                <Mail className="h-3 w-3" />
                Newsletter
              </div>
              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                La Lettre de Franck.
              </h2>
              <p className="mt-3 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
                Un email réfléchi toutes les deux semaines. Analyses d'architecture,
                décryptages de performance et notes sur la construction de logiciels à grande échelle.
                Pas de spam. Désabonnement à tout moment.
              </p>
            </div>

            <div>
              {done ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-background p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-foreground">C'est fait.</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Vérifiez votre boîte de réception pour confirmer votre abonnement.
                    </p>
                  </div>
                  <button
                    onClick={() => setDone(false)}
                    className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                  >
                    Abonner une autre adresse
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      inputMode="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vous@entreprise.com"
                      className="h-14 w-full rounded-full border border-border bg-background pl-5 pr-14 text-sm text-foreground placeholder:text-muted-foreground focus-premium"
                    />
                    <Mail className="absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex h-14 w-full items-center justify-center gap-2 rounded-full bg-pink text-sm font-semibold text-white shadow-pink-glow transition-all hover:gap-3 disabled:opacity-50"
                  >
                    {loading ? "Inscription..." : "S'abonner à la lettre"}
                    {!loading && (
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    )}
                  </button>
                  <p className="text-center text-[11px] text-muted-foreground">
                    Rejoignez 3 200+ ingénieurs. Jamais de spam.
                  </p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
