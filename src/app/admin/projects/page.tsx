"use client";

import * as React from "react";
import { Plus, Edit, Trash2, ExternalLink, Github, MoreHorizontal, Star, RotateCcw } from "lucide-react";
import { AdminPageHeader, AdminPrimaryButton } from "@/components/admin/admin-shell";
import { useProjects } from "@/hooks/use-projects";
import { ProjectFormModal } from "@/components/admin/project-form-modal";
import { useToast } from "@/hooks/use-toast";
import type { Project } from "@/lib/types";
import {
  Dialog, DialogContent, DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function AdminProjectsPage() {
  const { items, loaded, addProject, updateProject, deleteProject, resetProjects } = useProjects();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Project | null>(null);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const openNew = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditing(project);
    setModalOpen(true);
  };

  const handleSubmit = (data: Omit<Project, "id">) => {
    if (editing) {
      updateProject(editing.id, data);
    } else {
      addProject(data);
    }
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    deleteProject(deleteId);
    toast({ title: "Projet supprimé", description: "Le projet a été retiré de votre portfolio." });
    setDeleteId(null);
  };

  const handleReset = () => {
    resetProjects();
    toast({ title: "Liste réinitialisée", description: "Les projets par défaut ont été restaurés." });
  };

  return (
    <>
      <AdminPageHeader
        title="Projets"
        description="Ajoutez, modifiez et supprimez les projets affichés sur votre portfolio."
        action={
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="flex h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-xs font-medium text-muted-foreground hover:text-foreground"
              title="Réinitialiser aux projets par défaut"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Réinitialiser</span>
            </button>
            <AdminPrimaryButton onClick={openNew}>
              <Plus className="h-4 w-4" /> Nouveau projet
            </AdminPrimaryButton>
          </div>
        }
      />

      {/* Compteur */}
      <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="flex h-2 w-2 rounded-full bg-pink" />
        {loaded ? items.length : "…"} projet(s) au total
      </div>

      {/* Grille des projets */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((project) => (
          <div key={project.id} className="group overflow-hidden rounded-2xl border border-border bg-card">
            <div className="relative aspect-video overflow-hidden border-b border-border">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
              />
              <span className="absolute right-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest backdrop-blur">
                {project.category}
              </span>
              {project.featured && (
                <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-pink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                  <Star className="h-2.5 w-2.5" /> À la une
                </span>
              )}
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold text-foreground">{project.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{project.excerpt}</p>
                </div>
                <button aria-label="Plus" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map(t => (
                  <span key={t} className="rounded-full bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{t}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <span className="text-[10px] text-muted-foreground">{project.year}</span>
                <div className="flex gap-1">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">
                      <Github className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="Démo" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => openEdit(project)}
                    aria-label="Modifier"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteId(project.id)}
                    aria-label="Supprimer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal formulaire */}
      <ProjectFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={handleSubmit}
        initialData={editing}
      />

      {/* Dialog de confirmation de suppression */}
      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent className="max-w-sm border-border bg-background">
          <DialogTitle className="sr-only">Confirmer la suppression</DialogTitle>
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card">
              <Trash2 className="h-6 w-6 text-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">Supprimer ce projet ?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Cette action est irréversible. Le projet sera retiré de votre portfolio.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 h-10 rounded-full border border-border bg-card text-sm font-medium hover:bg-accent"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 h-10 rounded-full bg-foreground text-sm font-medium text-background hover:opacity-90"
              >
                Supprimer
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
