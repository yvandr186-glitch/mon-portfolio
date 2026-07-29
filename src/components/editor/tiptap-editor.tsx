"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Highlighter, Link2,
  Image as ImageIcon, Code2, Quote, Table as TableIcon, ListChecks, Smile,
  AlignLeft, AlignCenter, AlignRight, Minus, Youtube, Heading1, Heading2,
  Heading3, List, ListOrdered, Undo2, Redo2, Eye, Save, Settings2, ChevronDown,
  Hash, Type, Plus, X, Globe, Lock, Calendar,
} from "lucide-react";
import {
  Dialog, DialogContent, DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function TiptapEditor({ open, onOpenChange }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [title, setTitle] = React.useState("L'architecture d'une application Next.js moderne");
  const [content, setContent] = React.useState(
    "Commencez à écrire votre chef-d'œuvre. Utilisez la barre d'outils ci-dessus, ou appuyez sur / pour les commandes.\n\nCeci est un paragraphe. Vous pouvez le formater comme vous le souhaitez — gras, italique, souligné, ou toute combinaison. Sélectionnez du texte pour voir la barre d'outils flottante.\n\nAppuyez sur / pour insérer des blocs comme des titres, du code, des citations, des images, et plus."
  );
  const [saved, setSaved] = React.useState(false);
  const [status, setStatus] = React.useState<"draft" | "published">("draft");

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const charCount = content.length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[92vh] max-h-[92vh] w-[96vw] max-w-6xl overflow-hidden border-border bg-background p-0 gap-0">
        <DialogTitle className="sr-only">Article editor</DialogTitle>
        <div className="flex h-full flex-col">
          {/* Top bar */}
          <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenChange(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                  {status === "draft" ? "Brouillon" : "Publié"}
                </span>
                <span>·</span>
                <span>{saved ? "Enregistré" : "Enregistrement..."}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                className="h-8 rounded-full border border-border bg-card px-3 text-xs font-medium focus-premium"
              >
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
              </select>
              <button className="flex h-8 items-center gap-2 rounded-full border border-border bg-card px-3 text-xs font-medium hover:bg-accent">
                <Settings2 className="h-3.5 w-3.5" />
                Paramètres
              </button>
              <button
                onClick={save}
                className="flex h-8 items-center gap-2 rounded-full bg-foreground px-4 text-xs font-medium text-background hover:opacity-90"
              >
                <Save className="h-3.5 w-3.5" />
                Enregistrer
              </button>
            </div>
          </header>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-1 border-b border-border bg-card/30 px-5 py-2">
            <ToolbarGroup>
              <ToolbarButton icon={Heading1} label="Heading 1" />
              <ToolbarButton icon={Heading2} label="Heading 2" />
              <ToolbarButton icon={Heading3} label="Heading 3" />
              <ToolbarButton icon={Type} label="Paragraph" active />
            </ToolbarGroup>
            <Divider />
            <ToolbarGroup>
              <ToolbarButton icon={Bold} label="Bold" />
              <ToolbarButton icon={Italic} label="Italic" />
              <ToolbarButton icon={UnderlineIcon} label="Underline" />
              <ToolbarButton icon={Strikethrough} label="Strikethrough" />
              <ToolbarButton icon={Highlighter} label="Highlight" />
            </ToolbarGroup>
            <Divider />
            <ToolbarGroup>
              <ToolbarButton icon={List} label="Bullet list" />
              <ToolbarButton icon={ListOrdered} label="Numbered list" />
              <ToolbarButton icon={ListChecks} label="Task list" />
            </ToolbarGroup>
            <Divider />
            <ToolbarGroup>
              <ToolbarButton icon={AlignLeft} label="Align left" active />
              <ToolbarButton icon={AlignCenter} label="Align center" />
              <ToolbarButton icon={AlignRight} label="Align right" />
            </ToolbarGroup>
            <Divider />
            <ToolbarGroup>
              <ToolbarButton icon={Link2} label="Link" />
              <ToolbarButton icon={ImageIcon} label="Image" />
              <ToolbarButton icon={Code2} label="Code block" />
              <ToolbarButton icon={Quote} label="Blockquote" />
              <ToolbarButton icon={TableIcon} label="Table" />
              <ToolbarButton icon={Minus} label="Divider" />
              <ToolbarButton icon={Youtube} label="YouTube" />
              <ToolbarButton icon={Smile} label="Emoji" />
            </ToolbarGroup>
            <Divider />
            <ToolbarGroup>
              <ToolbarButton icon={Undo2} label="Undo" />
              <ToolbarButton icon={Redo2} label="Redo" />
            </ToolbarGroup>
          </div>

          {/* Editor surface */}
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-3xl px-6 py-10 sm:px-10 sm:py-14">
              {/* Cover */}
              <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-2xl border border-border bg-card">
                { }
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&h=900&fit=crop&q=80"
                  alt=""
                  className="h-full w-full object-cover grayscale"
                />
                <button className="absolute bottom-3 right-3 rounded-full border border-border bg-background/80 px-3 py-1.5 text-[10px] font-medium backdrop-blur hover:bg-background">
                  Changer la couverture
                </button>
              </div>

              {/* Meta */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-border bg-card px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  Architecture
                </span>
                <span className="flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                  <Calendar className="h-2.5 w-2.5" />
                  8 oct. 2025
                </span>
                <span className="flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                  <Hash className="h-2.5 w-2.5" />
                  Next.js
                </span>
                <span className="flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                  <Hash className="h-2.5 w-2.5" />
                  React 19
                </span>
              </div>

              {/* Title — editable */}
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={2}
                className="w-full resize-none bg-transparent text-4xl font-semibold leading-tight tracking-tight text-foreground focus:outline-none sm:text-5xl"
                placeholder="Sans titre"
              />

              {/* Author row */}
              <div className="mt-6 flex items-center gap-3 border-y border-border py-4">
                { }
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces&q=80"
                  alt="Author"
                  className="h-10 w-10 rounded-full object-cover grayscale"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">Dognon Franck</p>
                  <p className="text-xs text-muted-foreground">Ingénieur Senior · 14 min de lecture</p>
                </div>
              </div>

              {/* Content — editable */}
              <div className="mt-8">
                <EditorContent value={content} onChange={setContent} />
              </div>

              {/* Slash menu hint */}
              <div className="mt-12 rounded-2xl border border-dashed border-border bg-card/30 p-5 text-center">
                <p className="text-xs text-muted-foreground">
                  Press{" "}
                  <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
                    /
                  </kbd>{" "}
                  pour insérer un bloc, ou{" "}
                  <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
                    ⌘K
                  </kbd>{" "}
                  pour les commandes
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <footer className="flex items-center justify-between border-t border-border bg-card/30 px-5 py-2.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>{wordCount} mots</span>
              <span>·</span>
              <span>{charCount} caractères</span>
              <span>·</span>
              <span>{readingTime} min de lecture</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 hover:bg-accent">
                <Eye className="h-3 w-3" />
                Aperçu
              </button>
              <button className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 hover:bg-accent">
                <Globe className="h-3 w-3" />
                Public
              </button>
            </div>
          </footer>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function EditorContent({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-4">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={Math.max(8, value.split("\n").length + 2)}
        className="w-full resize-none bg-transparent text-[15px] leading-[1.75] text-foreground/90 focus:outline-none"
        placeholder="Commencez à écrire..."
      />

      {/* Block insert button */}
      <button
        className="flex w-full items-center gap-2 rounded-xl border border-dashed border-border px-4 py-3 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
      >
        <Plus className="h-3.5 w-3.5" />
        Ajouter un bloc
      </button>
    </div>
  );
}

function ToolbarGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-0.5">{children}</div>;
}

function Divider() {
  return <div className="mx-1 h-5 w-px bg-border" />;
}

function ToolbarButton({
  icon: Icon, label, active,
}: { icon: React.ElementType; label: string; active?: boolean }) {
  return (
    <button
      aria-label={label}
      title={label}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
        active
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}
