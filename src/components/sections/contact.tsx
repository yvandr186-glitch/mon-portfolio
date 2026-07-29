"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Mail, MapPin, Send, Github, Twitter, Linkedin, Dribbble, Loader2, CheckCircle2,
  Phone, MessageCircle,
} from "lucide-react";
import { profile } from "@/lib/data";
import { SectionHeader } from "./skills";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const EASE = [0.16, 1, 0.3, 1] as const;

const schema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Entrez un email valide"),
  subject: z.string().min(3, "Le sujet est requis"),
  message: z.string().min(10, "Le message doit faire au moins 10 caractères"),
});

type FormState = z.infer<typeof schema>;

export function Contact() {
  const { toast } = useToast();
  const [form, setForm] = React.useState<FormState>({
    name: "", email: "", subject: "", message: "",
  });
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormState, string>>>({});
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const update = (key: keyof FormState, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    // Simulated Server Action — in production: createContactMessage(form) + resend.send(...)
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    toast({
      title: "Message envoyé",
      description: "Je vous répondrai sous 48 heures.",
    });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="relative border-t border-border bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* Left: info */}
          <div>
            <SectionHeader
              eyebrow="Contact"
              title="Construisons quelque chose."
              description="Un projet en tête, une question sur mon travail, ou simplement envie de dire bonjour ? Je lis chaque message et réponds sous 48 heures."
            />

            <div className="mt-10 space-y-4">
              <ContactInfo icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
              <ContactInfo icon={MapPin} label="Localisation" value={profile.location} />
              <ContactInfo icon={Phone} label="Téléphone" value={profile.phoneDisplay} href={`tel:${profile.phone}`} />
            </div>

            {/* Call & WhatsApp buttons */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href={`tel:${profile.phone}`}
                className="group flex items-center justify-center gap-2 rounded-2xl border border-border bg-card p-4 text-sm font-medium text-foreground transition-all hover:border-foreground/30 hover:bg-accent"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background transition-transform group-hover:scale-105">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Appeler</p>
                  <p className="text-xs font-semibold text-foreground">{profile.phoneDisplay}</p>
                </div>
              </a>
              <a
                href={`https://wa.me/${profile.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 rounded-2xl border border-pink-soft bg-pink-soft p-4 text-sm font-medium text-foreground transition-all hover:shadow-pink-glow"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink text-white transition-transform group-hover:scale-105">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest text-pink">WhatsApp</p>
                  <p className="text-xs font-semibold text-foreground">Discuter</p>
                </div>
              </a>
            </div>

            <div className="mt-10">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Retrouvez-moi en ligne
              </p>
              <div className="mt-4 flex gap-2">
                <SocialIcon href={profile.socials.github} icon={Github} label="GitHub" />
                <SocialIcon href={profile.socials.twitter} icon={Twitter} label="Twitter" />
                <SocialIcon href={profile.socials.linkedin} icon={Linkedin} label="LinkedIn" />
                <SocialIcon href={profile.socials.dribbble} icon={Dribbble} label="Dribbble" />
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Actuellement
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
                </span>
                {profile.availability}
              </p>
            </div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="rounded-3xl border border-border bg-card p-6 sm:p-8"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full flex-col items-center justify-center py-12 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-foreground text-background">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
                  Message envoyé.
                </h3>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                  Merci de m'avoir contacté. Je répondrai à votre message sous 48 heures.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 inline-flex h-10 items-center justify-center rounded-full border border-border bg-background px-4 text-xs font-medium text-foreground hover:bg-accent"
                >
                  Envoyer un autre message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Nom"
                    error={errors.name}
                    input={
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Jean Dupont"
                        className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-premium"
                      />
                    }
                  />
                  <Field
                    label="Email"
                    error={errors.email}
                    input={
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="jean@entreprise.com"
                        className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-premium"
                      />
                    }
                  />
                </div>

                <Field
                  label="Sujet"
                  error={errors.subject}
                  input={
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => update("subject", e.target.value)}
                      placeholder="Demande de projet"
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-premium"
                    />
                  }
                />

                <Field
                  label="Message"
                  error={errors.message}
                  input={
                    <textarea
                      rows={6}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Parlez-moi de votre projet..."
                      className="w-full resize-none rounded-xl border border-border bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground focus-premium"
                    />
                  }
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-pink text-sm font-semibold text-white shadow-pink-glow transition-all hover:gap-3 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-muted-foreground">
                  En soumettant, vous acceptez d'être contacté au sujet de votre demande.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactInfo({
  icon: Icon, label, value, href,
}: { icon: React.ElementType; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-foreground/30">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}

function SocialIcon({
  href, icon: Icon, label,
}: { href: string; icon: React.ElementType; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}

function Field({
  label, input, error,
}: { label: string; input: React.ReactNode; error?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {input}
      {error && <span className="mt-1.5 block text-xs text-foreground">{error}</span>}
    </label>
  );
}
