"use client";

import { Plus, Edit, Trash2, Tag as TagIcon, X } from "lucide-react";
import { tags } from "@/lib/data";
import { AdminPageHeader, AdminPrimaryButton } from "@/components/admin/admin-shell";
import { cn } from "@/lib/utils";

export default function AdminTagsPage() {
  return (
    <>
      <AdminPageHeader
        title="Tags"
        description="Gérez les étiquettes de vos articles."
        action={<AdminPrimaryButton><Plus className="h-4 w-4" /> Nouveau tag</AdminPrimaryButton>}
      />

      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-foreground">Nuage de tags</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag.id} className="group flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-pink-soft hover:text-foreground">
                <TagIcon className="h-3 w-3" />
                {tag.name}
                <span className="rounded-full bg-accent px-1.5 py-0.5 text-[9px] text-foreground">{tag.articleCount}</span>
                <button aria-label="Supprimer" className="ml-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-card/50 text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-5 py-3 text-left font-medium">Nom</th>
                <th className="hidden px-5 py-3 text-left font-medium sm:table-cell">Slug</th>
                <th className="px-5 py-3 text-left font-medium">Articles</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag, i) => (
                <tr key={tag.id} className={cn(
                  "border-b border-border transition-colors hover:bg-card/50",
                  i === tags.length - 1 && "border-b-0"
                )}>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <TagIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      {tag.name}
                    </span>
                  </td>
                  <td className="hidden px-5 py-3 text-xs text-muted-foreground sm:table-cell">{tag.slug}</td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">{tag.articleCount}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button aria-label="Modifier" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button aria-label="Supprimer" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
