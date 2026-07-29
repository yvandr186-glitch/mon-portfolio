"use client";

import * as React from "react";

// =========================================================
// AUTHENTIFICATION — Version preview (sans backend)
// =========================================================
// Système d'authentification léger basé sur cookies + localStorage.
// Fonctionne sans base de données ni Better Auth.
//
// Compte admin par défaut :
//   Email :    yvandr186@gmail.com
//   Password : admin12345
//
// En production, remplacez ce fichier par Better Auth
// (voir prod-config/auth.ts et le README).
// =========================================================

export interface AuthUser {
  email: string;
  name: string;
  role: "ADMIN" | "USER";
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  expiresAt: number;
}

const SESSION_COOKIE = "portfolio_session";
const SESSION_KEY = "portfolio_session_v1";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 jours

// Compte admin configuré (en production : depuis la DB)
const ADMIN_ACCOUNTS: Array<{ email: string; password: string; name: string }> = [
  { email: "yvandr186@gmail.com", password: "admin12345", name: "Dognon Franck" },
];

function generateToken(): string {
  return `tok_${Date.now()}_${Math.random().toString(36).slice(2, 16)}`;
}

function setCookie(name: string, value: string, maxAgeSeconds: number) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0`;
}

function saveSession(session: AuthSession) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  setCookie(SESSION_COOKIE, session.token, SESSION_DURATION / 1000);
  window.dispatchEvent(new Event("auth-session-updated"));
}

function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
  deleteCookie(SESSION_COOKIE);
  window.dispatchEvent(new Event("auth-session-updated"));
}

function loadSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    const session = JSON.parse(stored) as AuthSession;
    // Vérifier l'expiration
    if (Date.now() > session.expiresAt) {
      clearSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

/**
 * Hook d'authentification — à utiliser dans les composants client.
 */
export function useAuth() {
  const [session, setSession] = React.useState<AuthSession | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setSession(loadSession());
    setLoading(false);

    const handler = () => setSession(loadSession());
    window.addEventListener("auth-session-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("auth-session-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const signIn = React.useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulation d'un appel API
    await new Promise((r) => setTimeout(r, 600));

    const account = ADMIN_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );

    if (!account) {
      return { success: false, error: "Email ou mot de passe incorrect" };
    }

    const newSession: AuthSession = {
      user: { email: account.email, name: account.name, role: "ADMIN" },
      token: generateToken(),
      expiresAt: Date.now() + SESSION_DURATION,
    };
    saveSession(newSession);
    setSession(newSession);
    return { success: true };
  }, []);

  const signOut = React.useCallback(() => {
    clearSession();
    setSession(null);
  }, []);

  return {
    session,
    user: session?.user ?? null,
    isAuthenticated: !!session,
    isAdmin: session?.user.role === "ADMIN",
    loading,
    signIn,
    signOut,
  };
}

/**
 * Vérifie si l'utilisateur est authentifié (côté client).
 * À utiliser dans les layouts/pages protégées.
 */
export function useRequireAuth(redirectTo = "/login") {
  const { isAuthenticated, loading } = useAuth();
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      const callbackUrl = window.location.pathname;
      window.location.href = `${redirectTo}?callbackUrl=${encodeURIComponent(callbackUrl)}`;
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, loading, redirectTo]);

  return { isAuthenticated, loading, checked };
}
