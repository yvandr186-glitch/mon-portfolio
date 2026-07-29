"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle, Clock, Trash2, MessageCircle, Inbox } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { useComments } from "@/hooks/use-comments";
import { useLikes } from "@/hooks/use-likes";
import { cn } from "@/lib/utils";

export default function AdminCommentsPage() {
  const { allComments, pendingCount, updateStatus, deleteComment } = useComments();
  const { totalLikes } = useLikes();
  const [filter, setFilter] = React.useState<"all" | "pending" | "approved" | "spam">("all");

  const filtered = filter === "all" ? allComments : allComments.filter((c) => c.status === filter);

  const stats = [
    { label: "Total", value: allComments.length, icon: MessageCircle },
    { label: "En attente", value: pendingCount, icon: Clock },
    { label: "Approuvés", value: allComments.filter((c) => c.status === "approved").length, icon: CheckCircle2 },
    { label: "Likes (tous articles)", value: totalLikes, icon: AlertCircle },
  ];

  return (
    <>
      <AdminPageHeader
        title="Commentaires"
        description="Modérez les commentaires postés par les visiteurs sur vos articles."
      />

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background">
                <stat.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-5 flex gap-1 rounded-full border border-border bg-card p-1 w-fit">
        {(["all", "pending", "approved", "spam"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              filter === s ? "bg-pink text-white" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {s === "all" ? "Tous" : s === "pending" ? "En attente" : s === "approved" ? "Approuvés" : "Spam"}
            <span className="ml-1.5 opacity-60">
              {s === "all"
                ? allComments.length
                : allComments.filter((c) => c.status === s).length}
            </span>
          </button>
        ))}
      </div>

      {/* Comments list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 py-16 text-center">
          <Inbox className="h-10 w-10 text-muted-foreground/40" />
          <p className="mt-4 text-sm font-medium text-foreground">Aucun commentaire</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Les commentaires des visiteurs apparaîtront ici une fois postés.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((comment) => (
            <div key={comment.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                    <span className="text-sm font-bold text-foreground">
                      {comment.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{comment.author}</p>
                      <span className="text-xs text-muted-foreground">{comment.email}</span>
                      <span
                        className={cn(
                          "flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                          comment.status === "approved" && "bg-pink-soft text-pink",
                          comment.status === "pending" && "bg-accent text-foreground",
                          comment.status === "spam" && "bg-muted text-muted-foreground"
                        )}
                      >
                        {comment.status === "approved" && <CheckCircle2 className="h-2.5 w-2.5" />}
                        {comment.status === "pending" && <Clock className="h-2.5 w-2.5" />}
                        {comment.status === "spam" && <AlertCircle className="h-2.5 w-2.5" />}
                        {comment.status === "approved"
                          ? "Approuvé"
                          : comment.status === "pending"
                          ? "En attente"
                          : "Spam"}
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      Sur : {comment.articleTitle}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/90">{comment.content}</p>
                    <p className="mt-2 text-[10px] text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-1">
                  {comment.status !== "approved" && (
                    <button
                      onClick={() => updateStatus(comment.id, "approved")}
                      aria-label="Approuver"
                      title="Approuver"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-pink-soft text-pink transition-colors hover:bg-pink-soft"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                  {comment.status !== "spam" && (
                    <button
                      onClick={() => updateStatus(comment.id, "spam")}
                      aria-label="Marquer comme spam"
                      title="Marquer comme spam"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <AlertCircle className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteComment(comment.id)}
                    aria-label="Supprimer"
                    title="Supprimer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/30"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
