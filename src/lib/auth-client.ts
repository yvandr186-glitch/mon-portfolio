"use client";

import { createAuthClient } from "better-auth/react";

// Client Better Auth — avec support React (useSession, etc.)
// "better-auth/react" au lieu de "better-auth/client" pour avoir les hooks
export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
  // S'assurer que les credentials (cookies) sont envoyés avec chaque requête
  fetchOptions: {
    credentials: "include",
  },
});

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  getSession,
} = authClient;
