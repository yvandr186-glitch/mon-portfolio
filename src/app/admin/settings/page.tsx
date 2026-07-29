"use client";

import { CheckCircle2, MailOpen, Image as ImageIcon, Shield, Settings, Github, ExternalLink } from "lucide-react";
import { AdminPageHeader, AdminPrimaryButton } from "@/components/admin/admin-shell";
import { cn } from "@/lib/utils";

export default function AdminSettingsPage() {
  return (
    <>
      <AdminPageHeader
        title="Paramètres"
        description="Configurez votre portfolio, le SEO et les intégrations."
      />

      <div className="max-w-2xl space-y-6">
        <SettingsSection title="Profil">
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <SettingField label="Nom affiché" value="Dognon Franck" />
            <SettingField label="Email" value="yvandr186@gmail.com" />
            <SettingField label="Titre" value="Développeur" />
            <SettingField label="Localisation" value="Cotonou, Bénin" />
            <SettingField label="Téléphone" value="01 54 80 00 74" />
            <SettingField label="WhatsApp" value="2290154800074" />
          </div>
        </SettingsSection>

        <SettingsSection title="Logo du site">
          <div className="mt-4 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-border bg-background">
              <img src="/franck-logo.png" alt="Logo" className="h-full w-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Logo monogramme FD affiché dans la navbar et le footer</p>
              <button className="mt-2 flex h-9 items-center gap-2 rounded-full border border-border px-4 text-xs font-medium hover:bg-accent">
                <ImageIcon className="h-3.5 w-3.5" />
                Changer le logo
              </button>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection title="Référencement (SEO)">
          <div className="mt-4 space-y-4">
            <SettingField label="Titre du site" value="Dognon Franck — Développeur · Créateur · Entrepreneur" full />
            <SettingField label="Méta description" value="Portfolio de Dognon Franck — développeur, créateur et entrepreneur basé à Cotonou." full />
            <SettingField label="URL de l'image OG" value="/franck-logo.png" full />
            <SettingField label="Mots-clés" value="Dognon Franck, Développeur, Cotonou, Next.js, React, TypeScript" full />
          </div>
        </SettingsSection>

        <SettingsSection title="Réseaux sociaux">
          <div className="mt-4 space-y-4">
            <SettingField label="GitHub" value="https://github.com/dognonfranck" full icon={Github} />
            <SettingField label="Twitter" value="https://twitter.com/dognonfranck" full icon={ExternalLink} />
            <SettingField label="LinkedIn" value="https://linkedin.com/in/dognonfranck" full icon={ExternalLink} />
            <SettingField label="Dribbble" value="https://dribbble.com/dognonfranck" full icon={ExternalLink} />
          </div>
        </SettingsSection>

        <SettingsSection title="Informations de contact">
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <SettingField label="Email public" value="yvandr186@gmail.com" />
            <SettingField label="Téléphone affiché" value="01 54 80 00 74" />
            <SettingField label="WhatsApp" value="2290154800074" />
            <SettingField label="Disponibilité" value="Disponible pour des stages et projets freelance" />
          </div>
        </SettingsSection>

        <SettingsSection title="Intégrations">
          <div className="mt-4 space-y-3">
            {[
              { name: "Resend (Emails)", status: "Connecté", icon: MailOpen },
              { name: "Cloudinary (Médias)", status: "Connecté", icon: ImageIcon },
              { name: "Better Auth", status: "Connecté", icon: Shield },
              { name: "Neon PostgreSQL (Prisma)", status: "Connecté", icon: Settings },
            ].map((integration) => (
              <div key={integration.name} className="flex items-center justify-between rounded-xl border border-border bg-background p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card">
                    <integration.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{integration.name}</span>
                </div>
                <span className="flex items-center gap-1.5 text-xs text-foreground">
                  <CheckCircle2 className="h-3 w-3" />
                  {integration.status}
                </span>
              </div>
            ))}
          </div>
        </SettingsSection>

        <div className="flex justify-end">
          <AdminPrimaryButton>
            <CheckCircle2 className="h-4 w-4" />
            Enregistrer les modifications
          </AdminPrimaryButton>
        </div>
      </div>
    </>
  );
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  );
}

function SettingField({
  label, value, full, icon: Icon,
}: { label: string; value: string; full?: boolean; icon?: React.ElementType }) {
  return (
    <label className={cn("block", full && "sm:col-span-2")}>
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </span>
      <input
        defaultValue={value}
        className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm focus-premium"
      />
    </label>
  );
}
