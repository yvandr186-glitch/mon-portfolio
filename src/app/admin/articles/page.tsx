"use client";

import * as React from "react";
import { Search, Plus, Edit, Trash2, Eye, MessageCircle, Filter } from "lucide-react";
import { articles } from "@/lib/data";
import { AdminPageHeader, AdminPrimaryButton } from "@/components/admin/admin-shell";
import { cn } from "@/lib/utils";

export default function AdminArticlesPage() {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"all" | "published" | "draft">("all");

  const filtered = articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || (statusFilter === "draft" && a.draft) || (statusFilter === "published" && !a.draft);
    return matchSearch && matchStatus;
  });

  return (
    <>
      <AdminPageHeader
        title="Articles"
        description="Gérez vos articles de blog, brouillons et publications."
        action={<AdminPrimaryButton><Plus className="h-4 w-4" /> Nouvel article</AdminPrimaryButton>}
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un article..."
            className="h-10 w-full rounded-full border border-border bg-card pl-9 pr-4 text-sm focus-premium"
          />
        </div>
        <div className="flex gap-1 rounded-full border border-border bg-card p-1">
          {(["all", "published", "draft"] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                statusFilter === s ? "bg-pink text-white" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {s === "all" ? "Tous" : s === "published" ? "Publiés" : "Brouillons"}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-card/50 text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-5 py-3 text-left font-medium">Titre</th>
              <th className="hidden px-5 py-3 text-left font-medium md:table-cell">Catégorie</th>
              <th className="hidden px-5 py-3 text-left font-medium sm:table-cell">Vues</th>
              <th className="hidden px-5 py-3 text-left font-medium lg:table-cell">Publié le</th>
              <th className="px-5 py-3 text-left font-medium">Statut</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((article, i) => (
              <tr key={article.id} className={cn(
                "border-b border-border transition-colors hover:bg-card/50",
                i === filtered.length - 1 && "border-b-0"
              )}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img src={article.cover} alt="" className="h-10 w-14 rounded-lg object-cover grayscale" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{article.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{article.excerpt}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-5 py-3 md:table-cell">
                  <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{article.category}</span>
                </td>
                <td className="hidden px-5 py-3 text-xs text-muted-foreground sm:table-cell">{article.views.toLocaleString()}</td>
                <td className="hidden px-5 py-3 text-xs text-muted-foreground lg:table-cell">
                  {new Date(article.publishedAt).toLocaleDateString("fr-FR", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                <td className="px-5 py-3">
                  <span className={cn(
                    "flex items-center gap-1.5 text-xs",
                    article.draft ? "text-muted-foreground" : "text-foreground"
                  )}>
                    <span className={cn("h-1.5 w-1.5 rounded-full", article.draft ? "bg-muted-foreground" : "bg-pink")} />
                    {article.draft ? "Brouillon" : "Publié"}
                  </span>
                </td>
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
    </>
  );
}
