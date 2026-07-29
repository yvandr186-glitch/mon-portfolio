"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2, Shield, Home, AlertCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { profile } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "@/lib/auth-client";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const { toast } = useToast();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message || "Email ou mot de passe incorrect");
        setLoading(false);
        return;
      }

      // Succès — notification
      toast({
        title: "Connexion réussie",
        description: "Redirection vers le tableau de bord...",
      });

      // Redirection en dur (window.location) pour forcer le rechargement
      // et garantir que le cookie de session est pris en compte par le middleware
      window.location.href = callbackUrl;
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Une erreur est survenue");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-grid mask-radial-faded opacity-40" />
      <div className="absolute inset-0 noise" />
      <div
        className="aurora"
        style={{
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, var(--accent-pink-glow) 0%, transparent 65%)",
          opacity: 0.5,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-3xl border border-border bg-card/80 p-8 backdrop-blur sm:p-10">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-pink">
              <img src={profile.logo} alt={profile.name} className="h-full w-full object-cover" />
            </div>
            <span className="text-base font-semibold tracking-tight text-foreground">{profile.name}</span>
          </Link>

          {/* Title */}
          <div className="mt-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-pink-soft bg-pink-soft">
              <Shield className="h-5 w-5 text-pink" />
            </div>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
              Espace d'administration
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Connectez-vous pour accéder au tableau de bord.
            </p>
          </div>

          {/* Error message */}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-5 flex items-start gap-2 rounded-xl border border-foreground/20 bg-foreground/5 p-3"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
              <p className="text-xs text-foreground">{errorMsg}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={submit} className="mt-8 space-y-4">
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                <Mail className="h-3 w-3" />
                Email
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm focus-premium"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                <Lock className="h-3 w-3" />
                Mot de passe
              </span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-12 w-full rounded-xl border border-border bg-background px-4 pr-12 text-sm focus-premium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-pink text-sm font-semibold text-white shadow-pink-glow transition-all hover:gap-3 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Connexion...
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-[11px] text-muted-foreground">
            Accès réservé aux administrateurs.{" "}
            <Link href="/" className="inline-flex items-center gap-1 text-pink hover:underline">
              <Home className="h-3 w-3" />
              Retour au site
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
