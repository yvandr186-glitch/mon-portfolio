"use client";

import * as React from "react";
import { projects as defaultProjects } from "@/lib/data";
import type { Project } from "@/lib/types";

const STORAGE_KEY = "portfolio_projects_v1";

function loadProjects(): Project[] {
  if (typeof window === "undefined") return defaultProjects;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultProjects;
    const parsed = JSON.parse(stored) as Project[];
    if (!Array.isArray(parsed) || parsed.length === 0) return defaultProjects;
    return parsed;
  } catch {
    return defaultProjects;
  }
}

function saveProjects(items: Project[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    // Notifier les autres composants (onglets / pages) qu'il y a eu un changement
    window.dispatchEvent(new Event("portfolio-projects-updated"));
  } catch {
    // quota dépassé — on ignore silencieusement
  }
}

/**
 * Hook partagé pour lire / écrire la liste des projets.
 * Persistance via localStorage — fonctionne sans backend.
 * En production, remplacez par des Server Actions + Prisma.
 */
export function useProjects() {
  const [items, setItems] = React.useState<Project[]>(defaultProjects);
  const [loaded, setLoaded] = React.useState(false);

  // Charger depuis localStorage au montage
  React.useEffect(() => {
    setItems(loadProjects());
    setLoaded(true);
  }, []);

  // Écouter les changements depuis d'autres composants / onglets
  React.useEffect(() => {
    const handler = () => setItems(loadProjects());
    window.addEventListener("portfolio-projects-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("portfolio-projects-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const addProject = React.useCallback((data: Omit<Project, "id">) => {
    const newProject: Project = {
      ...data,
      id: `p_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    };
    setItems((prev) => {
      const next = [newProject, ...prev];
      saveProjects(next);
      return next;
    });
    return newProject;
  }, []);

  const updateProject = React.useCallback((id: string, data: Partial<Project>) => {
    setItems((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, ...data } : p));
      saveProjects(next);
      return next;
    });
  }, []);

  const deleteProject = React.useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((p) => p.id !== id);
      saveProjects(next);
      return next;
    });
  }, []);

  const resetProjects = React.useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setItems(defaultProjects);
    window.dispatchEvent(new Event("portfolio-projects-updated"));
  }, []);

  return { items, loaded, addProject, updateProject, deleteProject, resetProjects };
}
