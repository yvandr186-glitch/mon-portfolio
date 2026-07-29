"use client";

import * as React from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { useSession } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

/**
 * Layout de l'espace d'administration.
 * Vérifie l'authentification Better Auth côté client.
 * Le middleware vérifie le cookie côté serveur en complément.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending, error } = useSession();

  React.useEffect(() => {
    // Si la session est chargée et qu'il n'y a pas de session (et pas d'erreur en cours)
    if (!isPending && !session) {
      const callbackUrl = window.location.pathname;
      window.location.href = `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;
    }
  }, [isPending, session]);

  // Pendant la vérification de la session ou si pas de session
  if (isPending || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-xs">
            {isPending ? "Vérification de la session…" : "Redirection vers la connexion…"}
          </p>
        </div>
      </div>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}
