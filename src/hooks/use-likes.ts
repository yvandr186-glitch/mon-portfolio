"use client";

import * as React from "react";

// =========================================================
// SYSTÈME DE LIKES — Persistance localStorage
// =========================================================
// Les visiteurs peuvent aimer les articles du blog.
// Le nombre de likes est visible dans l'admin dashboard.
// Un visiteur ne peut liker qu'une fois par article (par navigateur).
// =========================================================

const STORAGE_KEY = "portfolio_likes_v1";
const LIKED_KEY = "portfolio_liked_articles_v1";

function loadLikes(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};
    return JSON.parse(stored) as Record<string, number>;
  } catch {
    return {};
  }
}

function saveLikes(likes: Record<string, number>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(likes));
  window.dispatchEvent(new Event("portfolio-likes-updated"));
}

function loadLikedArticles(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(LIKED_KEY);
    if (!stored) return new Set();
    return new Set(JSON.parse(stored) as string[]);
  } catch {
    return new Set();
  }
}

function saveLikedArticles(liked: Set<string>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LIKED_KEY, JSON.stringify(Array.from(liked)));
}

export function useLikes(articleId?: string) {
  const [likes, setLikes] = React.useState<Record<string, number>>({});
  const [liked, setLiked] = React.useState<Set<string>>(new Set());
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setLikes(loadLikes());
    setLiked(loadLikedArticles());
    setLoaded(true);
    const handler = () => {
      setLikes(loadLikes());
      setLiked(loadLikedArticles());
    };
    window.addEventListener("portfolio-likes-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("portfolio-likes-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const articleLikes = React.useMemo(() => {
    if (!articleId) return 0;
    return likes[articleId] || 0;
  }, [likes, articleId]);

  const hasLiked = React.useMemo(() => {
    if (!articleId) return false;
    return liked.has(articleId);
  }, [liked, articleId]);

  const totalLikes = React.useMemo(() => {
    return Object.values(likes).reduce((sum, n) => sum + n, 0);
  }, [likes]);

  const toggleLike = React.useCallback(
    (targetArticleId: string) => {
      const currentLiked = loadLikedArticles();
      const currentLikes = loadLikes();
      const isLiked = currentLiked.has(targetArticleId);

      if (isLiked) {
        // Unlike
        currentLiked.delete(targetArticleId);
        currentLikes[targetArticleId] = Math.max(0, (currentLikes[targetArticleId] || 0) - 1);
      } else {
        // Like
        currentLiked.add(targetArticleId);
        currentLikes[targetArticleId] = (currentLikes[targetArticleId] || 0) + 1;
      }

      saveLikedArticles(currentLiked);
      saveLikes(currentLikes);
      setLiked(currentLiked);
      setLikes(currentLikes);
    },
    []
  );

  return {
    articleLikes,
    hasLiked,
    totalLikes,
    loaded,
    toggleLike,
    likes,
  };
}
