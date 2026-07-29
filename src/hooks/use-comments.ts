"use client";

import * as React from "react";

// =========================================================
// SYSTÈME DE COMMENTAIRES — Persistance localStorage
// =========================================================
// Les visiteurs peuvent commenter les articles du blog.
// Les commentaires sont visibles dans l'admin (/admin/comments).
// En production, remplacez par des Server Actions + Prisma.
// =========================================================

export interface VisitorComment {
  id: string;
  articleId: string;
  articleTitle: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  status: "pending" | "approved" | "spam";
}

const STORAGE_KEY = "portfolio_comments_v1";

function loadComments(): VisitorComment[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as VisitorComment[];
  } catch {
    return [];
  }
}

function saveComments(items: VisitorComment[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("portfolio-comments-updated"));
}

export function useComments(articleId?: string) {
  const [items, setItems] = React.useState<VisitorComment[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setItems(loadComments());
    setLoaded(true);
    const handler = () => setItems(loadComments());
    window.addEventListener("portfolio-comments-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("portfolio-comments-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  // Commentaires pour un article spécifique (approuvés uniquement pour le public)
  const articleComments = React.useMemo(() => {
    if (!articleId) return [];
    return items
      .filter((c) => c.articleId === articleId && c.status === "approved")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [items, articleId]);

  // Tous les commentaires (pour l'admin)
  const allComments = React.useMemo(() => {
    return [...items].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [items]);

  const addComment = React.useCallback(
    (data: Omit<VisitorComment, "id" | "createdAt" | "status">) => {
      const newComment: VisitorComment = {
        ...data,
        id: `cm_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        createdAt: new Date().toISOString(),
        status: "pending", // Les nouveaux commentaires sont en attente de modération
      };
      setItems((prev) => {
        const next = [newComment, ...prev];
        saveComments(next);
        return next;
      });
      return newComment;
    },
    []
  );

  const updateStatus = React.useCallback((id: string, status: VisitorComment["status"]) => {
    setItems((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, status } : c));
      saveComments(next);
      return next;
    });
  }, []);

  const deleteComment = React.useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((c) => c.id !== id);
      saveComments(next);
      return next;
    });
  }, []);

  const pendingCount = React.useMemo(
    () => items.filter((c) => c.status === "pending").length,
    [items]
  );

  return {
    items,
    articleComments,
    allComments,
    loaded,
    pendingCount,
    addComment,
    updateStatus,
    deleteComment,
  };
}
