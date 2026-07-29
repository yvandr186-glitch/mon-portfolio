"use client";

import * as React from "react";
import { Edit, Trash2 } from "lucide-react";
import { adminUsers } from "@/lib/data";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function AdminUsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = React.useState(adminUsers);

  const toggleRole = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: u.role === "ADMIN" ? "USER" : "ADMIN" } : u));
    toast({ title: "Rôle mis à jour", description: "Le rôle de l'utilisateur a été modifié." });
  };

  return (
    <>
      <AdminPageHeader
        title="Utilisateurs"
        description="Gérez les comptes utilisateurs et leurs rôles."
      />

      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-card/50 text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-5 py-3 text-left font-medium">Utilisateur</th>
              <th className="hidden px-5 py-3 text-left font-medium md:table-cell">Rôle</th>
              <th className="hidden px-5 py-3 text-left font-medium lg:table-cell">Inscrit le</th>
              <th className="hidden px-5 py-3 text-left font-medium sm:table-cell">Articles</th>
              <th className="px-5 py-3 text-left font-medium">Statut</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user.id} className={cn(
                "border-b border-border transition-colors hover:bg-card/50",
                i === users.length - 1 && "border-b-0"
              )}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="h-9 w-9 rounded-full object-cover grayscale" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{user.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-5 py-3 md:table-cell">
                  <button
                    onClick={() => toggleRole(user.id)}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[10px] font-bold transition-colors",
                      user.role === "ADMIN" ? "bg-pink text-white" : "border border-border text-muted-foreground hover:border-foreground/30"
                    )}
                  >
                    {user.role}
                  </button>
                </td>
                <td className="hidden px-5 py-3 text-xs text-muted-foreground lg:table-cell">
                  {new Date(user.joinedAt).toLocaleDateString("fr-FR", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                <td className="hidden px-5 py-3 text-xs text-muted-foreground sm:table-cell">{user.posts}</td>
                <td className="px-5 py-3">
                  <span className={cn(
                    "flex items-center gap-1.5 text-xs",
                    user.status === "active" ? "text-foreground" : "text-muted-foreground"
                  )}>
                    <span className={cn("h-1.5 w-1.5 rounded-full", user.status === "active" ? "bg-pink" : "bg-muted-foreground/50")} />
                    {user.status === "active" ? "actif" : "suspendu"}
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
