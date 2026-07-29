"use client";

import { Download, Trash2, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { newsletterSubscribers } from "@/lib/data";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { cn } from "@/lib/utils";

export default function AdminNewsletterPage() {
  const stats = [
    { label: "Abonnés total", value: "3 247", change: "+124 cette semaine" },
    { label: "Taux d'ouverture", value: "62,4 %", change: "+3,2 % vs moyenne" },
    { label: "Taux de clic", value: "18,7 %", change: "+1,4 % vs moyenne" },
    { label: "Désabonnements", value: "12", change: "taux de 0,4 %" },
  ];

  return (
    <>
      <AdminPageHeader
        title="Newsletter"
        description="Gérez vos abonnés et les statistiques de vos envois."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-3xl font-semibold tracking-tight text-foreground">{stat.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-[10px] text-muted-foreground">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border">
        <div className="flex items-center justify-between border-b border-border bg-card/50 px-5 py-3">
          <h3 className="text-sm font-semibold text-foreground">Abonnés</h3>
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <Download className="h-3 w-3" />
            Exporter CSV
          </button>
        </div>
        <table className="w-full text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-5 py-3 text-left font-medium">Email</th>
              <th className="hidden px-5 py-3 text-left font-medium sm:table-cell">Abonné le</th>
              <th className="px-5 py-3 text-left font-medium">Statut</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {newsletterSubscribers.map((sub, i) => (
              <tr key={sub.id} className={cn(
                "border-b border-border transition-colors hover:bg-card/50",
                i === newsletterSubscribers.length - 1 && "border-b-0"
              )}>
                <td className="px-5 py-3 text-sm font-medium text-foreground">{sub.email}</td>
                <td className="hidden px-5 py-3 text-xs text-muted-foreground sm:table-cell">
                  {new Date(sub.subscribedAt).toLocaleDateString("fr-FR", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                <td className="px-5 py-3">
                  <span className={cn(
                    "flex items-center gap-1.5 text-xs",
                    sub.status === "active" && "text-foreground",
                    sub.status === "pending" && "text-muted-foreground",
                    sub.status === "unsubscribed" && "text-muted-foreground/60"
                  )}>
                    {sub.status === "active" && <CheckCircle2 className="h-3 w-3" />}
                    {sub.status === "pending" && <Clock className="h-3 w-3" />}
                    {sub.status === "unsubscribed" && <AlertCircle className="h-3 w-3" />}
                    {sub.status === "active" ? "actif" : sub.status === "pending" ? "en attente" : "désabonné"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
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
