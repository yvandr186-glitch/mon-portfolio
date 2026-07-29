"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Link2, Star, Check, Loader2, ImageIcon } from "lucide-react";
import type { Project, ProjectCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const EASE = [0.16, 1, 0.3, 1] as const;

const categories: ProjectCategory[] = [
  "Application Web", "Mobile", "Design System", "Open Source", "Branding",
];

interface ProjectFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<Project, "id">) => void;
  initialData?: Project | null;
}

const emptyForm: Omit<Project, "id"> = {
  title: "",
  slug: "",
  excerpt: "",
  description: "",
  category: "Application Web",
  technologies: [],
  featured: false,
  year: new Date().getFullYear(),
  thumbnail: "",
  gallery: [],
  github: "",
  demo: "",
  metrics: [],
};

export function ProjectFormModal({ open, onOpenChange, onSubmit, initialData }: ProjectFormModalProps) {
  const { toast } = useToast();
  const [form, setForm] = React.useState<Omit<Project, "id">>(emptyForm);
  const [techInput, setTechInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  // Pré-remplir le formulaire en mode édition
  React.useEffect(() => {
    if (initialData) {
      const { id: _id, ...rest } = initialData;
      setForm(rest);
    } else {
      setForm(emptyForm);
    }
    setErrors({});
    setTechInput("");
  }, [initialData, open]);

  const update = <K extends keyof Omit<Project, "id">>(key: K, value: Omit<Project, "id">[K]) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key as string]: undefined }));
  };

  const addTech = () => {
    const t = techInput.trim();
    if (!t) return;
    if (!form.technologies.includes(t)) {
      update("technologies", [...form.technologies, t]);
    }
    setTechInput("");
  };

  const removeTech = (t: string) => {
    update("technologies", form.technologies.filter((x) => x !== t));
  };

  // Upload d'image : convertit en base64 (preview).
  // En production, remplacez par un upload Cloudinary.
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      toast({ title: "Image trop lourde", description: "Maximum 3 Mo", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      update("thumbnail", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = "Le titre est requis";
    if (!form.excerpt.trim()) errs.excerpt = "La description courte est requise";
    if (!form.thumbnail.trim()) errs.thumbnail = "L'image est requise";
    if (!form.demo?.trim() && !form.github?.trim()) errs.demo = "Ajoutez au moins un lien (démo ou GitHub)";
    return errs;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    // Slug auto si vide
    const slug = form.slug.trim() || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    await new Promise((r) => setTimeout(r, 600)); // simulation API
    onSubmit({ ...form, slug });
    setLoading(false);
    toast({
      title: initialData ? "Projet mis à jour !" : "Projet ajouté !",
      description: `"${form.title}" a été ${initialData ? "modifié" : "ajouté"} avec succès.`,
    });
    onOpenChange(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-6 py-4 backdrop-blur">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  {initialData ? "Modifier le projet" : "Nouveau projet"}
                </h2>
                <p className="text-xs text-muted-foreground">
                  Renseignez les informations de votre projet
                </p>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="space-y-5 p-6">
              {/* Image / thumbnail */}
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Image du projet *
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative h-28 w-44 shrink-0 overflow-hidden rounded-xl border border-border bg-card">
                    {form.thumbnail ? (
                      <img src={form.thumbnail} alt="Aperçu" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground">
                        <ImageIcon className="h-6 w-6" />
                        <span className="mt-1 text-[10px]">Aperçu</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-card text-xs font-medium text-foreground transition-colors hover:bg-accent">
                      <Upload className="h-3.5 w-3.5" />
                      Téléverser une image
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                    <input
                      type="url"
                      value={form.thumbnail.startsWith("data:") ? "" : form.thumbnail}
                      onChange={(e) => update("thumbnail", e.target.value)}
                      placeholder="ou collez une URL d'image"
                      className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground placeholder:text-muted-foreground focus-premium"
                    />
                  </div>
                </div>
                {errors.thumbnail && <p className="mt-1 text-xs text-foreground">{errors.thumbnail}</p>}
              </div>

              {/* Titre */}
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Titre *
                </label>
                <input
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="Ex: Pringles — Site officiel"
                  className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm focus-premium"
                />
                {errors.title && <p className="mt-1 text-xs text-foreground">{errors.title}</p>}
              </div>

              {/* Description courte */}
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Description courte *
                </label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => update("excerpt", e.target.value)}
                  rows={2}
                  placeholder="Une phrase qui décrit votre projet"
                  className="w-full resize-none rounded-xl border border-border bg-background p-3 text-sm focus-premium"
                />
                {errors.excerpt && <p className="mt-1 text-xs text-foreground">{errors.excerpt}</p>}
              </div>

              {/* Description longue */}
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Description détaillée
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  rows={3}
                  placeholder="Décrivez votre projet en détail"
                  className="w-full resize-none rounded-xl border border-border bg-background p-3 text-sm focus-premium"
                />
              </div>

              {/* Catégorie + Année */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Catégorie
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => update("category", e.target.value as ProjectCategory)}
                    className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm focus-premium"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Année
                  </label>
                  <input
                    type="number"
                    value={form.year}
                    onChange={(e) => update("year", Number(e.target.value))}
                    min="2020"
                    max="2030"
                    className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm focus-premium"
                  />
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Technologies utilisées
                </label>
                <div className="flex gap-2">
                  <input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTech();
                      }
                    }}
                    placeholder="Ex: React, TypeScript, Tailwind…"
                    className="h-11 flex-1 rounded-xl border border-border bg-background px-4 text-sm focus-premium"
                  />
                  <button
                    type="button"
                    onClick={addTech}
                    className="flex h-11 items-center justify-center rounded-xl border border-border bg-card px-4 text-sm font-medium hover:bg-accent"
                  >
                    Ajouter
                  </button>
                </div>
                {form.technologies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {form.technologies.map((t) => (
                      <span
                        key={t}
                        className="flex items-center gap-1.5 rounded-full border border-pink-soft bg-pink-soft px-3 py-1 text-xs font-medium text-foreground"
                      >
                        {t}
                        <button type="button" onClick={() => removeTech(t)} className="text-pink hover:opacity-70">
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Liens */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    <Link2 className="h-3 w-3" /> Lien de démo
                  </label>
                  <input
                    value={form.demo || ""}
                    onChange={(e) => update("demo", e.target.value)}
                    placeholder="https://mon-projet.vercel.app"
                    className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm focus-premium"
                  />
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    <Link2 className="h-3 w-3" /> Lien GitHub
                  </label>
                  <input
                    value={form.github || ""}
                    onChange={(e) => update("github", e.target.value)}
                    placeholder="https://github.com/..."
                    className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm focus-premium"
                  />
                </div>
              </div>
              {errors.demo && <p className="text-xs text-foreground">{errors.demo}</p>}

              {/* Mis en avant */}
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card p-4">
                <button
                  type="button"
                  onClick={() => update("featured", !form.featured)}
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-md border transition-colors",
                    form.featured ? "bg-pink border-pink text-white" : "border-border bg-background"
                  )}
                >
                  {form.featured && <Check className="h-3.5 w-3.5" />}
                </button>
                <div className="flex-1">
                  <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <Star className="h-3.5 w-3.5 text-pink" />
                    Projet mis en avant
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Affiche ce projet avec un badge "À la une" sur le portfolio
                  </p>
                </div>
              </label>

              {/* Actions */}
              <div className="flex justify-end gap-3 border-t border-border pt-5">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="flex h-11 items-center justify-center rounded-full border border-border bg-card px-5 text-sm font-medium text-foreground hover:bg-accent"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-11 items-center justify-center gap-2 rounded-full bg-pink px-6 text-sm font-semibold text-white shadow-pink-glow transition-all hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Enregistrement…</>
                  ) : (
                    <>{initialData ? "Enregistrer les modifications" : "Ajouter le projet"}</>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
