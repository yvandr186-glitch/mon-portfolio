"use client";

import { Plus, Edit, Trash2, FolderTree, Hash } from "lucide-react";
import { categories } from "@/lib/data";
import { AdminPageHeader, AdminPrimaryButton } from "@/components/admin/admin-shell";

export default function AdminCategoriesPage() {
  return (
    <>
      <AdminPageHeader
        title="Catégories"
        description="Organisez vos articles par catégories thématiques."
        action={<AdminPrimaryButton><Plus className="h-4 w-4" /> Nouvelle catégorie</AdminPrimaryButton>}
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <div key={cat.id} className="group rounded-2xl border border-border bg-card p-5 card-hover hover:border-pink-soft">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border" style={{ backgroundColor: cat.color + "20", color: cat.color }}>
                  <FolderTree className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                  <p className="text-[10px] text-muted-foreground">{cat.slug}</p>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button aria-label="Modifier" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">
                  <Edit className="h-3.5 w-3.5" />
                </button>
                <button aria-label="Supprimer" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{cat.description}</p>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <span className="text-[10px] text-muted-foreground">{cat.articleCount} article(s)</span>
              <span className="flex items-center gap-1 text-[10px] font-medium text-pink">
                <Hash className="h-2.5 w-2.5" />
                {cat.slug}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
