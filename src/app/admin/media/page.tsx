"use client";

import { Plus, Search, Trash2, CheckCircle2 } from "lucide-react";
import { AdminPageHeader, AdminPrimaryButton } from "@/components/admin/admin-shell";
import { projects, articles } from "@/lib/data";

export default function AdminMediaPage() {
  const media = [
    ...projects.map((p) => ({ src: p.thumbnail, name: p.title })),
    ...articles.map((a) => ({ src: a.cover, name: a.title })),
  ];

  return (
    <>
      <AdminPageHeader
        title="Médiathèque"
        description="Gérez vos images, importez depuis Cloudinary."
        action={<AdminPrimaryButton><Plus className="h-4 w-4" /> Importer</AdminPrimaryButton>}
      />

      <div className="mb-4 relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Rechercher un média..."
          className="h-10 w-full rounded-full border border-border bg-card pl-9 pr-4 text-sm focus-premium"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {media.map((item, i) => (
          <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-border">
            <img src={item.src} alt={item.name} className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-background/90 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="flex justify-end gap-2">
                <button aria-label="Sélectionner" className="flex h-9 w-9 items-center justify-center rounded-full bg-pink text-white">
                  <CheckCircle2 className="h-4 w-4" />
                </button>
                <button aria-label="Supprimer" className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="truncate text-[10px] font-medium text-foreground">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
